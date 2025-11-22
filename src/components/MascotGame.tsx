"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface MascotGameProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Ball {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    active: boolean;
    inHoop: boolean;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}

const GRAVITY = 0.5;
const FRICTION = 0.99;
const BOUNCE = 0.7;

const MascotGame = ({ isOpen, onClose }: MascotGameProps) => {
    // Game State
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(5); // Start with 5 lives
    const [gameOver, setGameOver] = useState(false);
    const [gameStage, setGameStage] = useState(0); // 0: Normal, 1: Prospecting, 2: Qualified, 3: Closed Won
    const [notification, setNotification] = useState<{ text: string, color: string } | null>(null);

    // Physics State (Refs for performance)
    const ballsRef = useRef<Ball[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const hoopRef = useRef({ x: 50, direction: 1, speed: 0.5 }); // x is percentage
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Drag State
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
    const [trajectoryPoints, setTrajectoryPoints] = useState<{ x: number, y: number }[]>([]);

    // React State for rendering (synced from refs occasionally or for UI)
    const [uiBalls, setUiBalls] = useState<Ball[]>([]);
    const [uiHoopX, setUiHoopX] = useState(50);
    const [uiParticles, setUiParticles] = useState<Particle[]>([]);

    // Load High Score
    useEffect(() => {
        const saved = localStorage.getItem("jellyHighScore");
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Save High Score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("jellyHighScore", score.toString());
        }
    }, [score, highScore]);

    // Progression Logic
    useEffect(() => {
        let newStage = 0;
        if (score >= 20) newStage = 3;
        else if (score >= 10) newStage = 2;
        else if (score >= 5) newStage = 1;

        if (newStage > gameStage) {
            setGameStage(newStage);
            // Show Notification
            let text = "";
            let color = "#ffffff";
            if (newStage === 1) { text = "PROSPECTING MODE: SLOW MO"; color = "#00f5ff"; }
            if (newStage === 2) { text = "QUALIFIED LEAD: BIG HOOP"; color = "#ffbe0b"; }
            if (newStage === 3) { text = "CLOSED WON: FIREBALL!"; color = "#ff006e"; }

            setNotification({ text, color });
            setTimeout(() => setNotification(null), 3000);
        }
    }, [score, gameStage]);

    const resetGame = () => {
        setScore(0);
        setLives(5);
        setGameOver(false);
        setGameStage(0);
        ballsRef.current = [];
        particlesRef.current = [];
        hoopRef.current = { x: 50, direction: 1, speed: 0.5 };
        setUiBalls([]);
        setUiParticles([]);
    };

    const spawnParticles = (x: number, y: number, count: number, color: string) => {
        for (let i = 0; i < count; i++) {
            particlesRef.current.push({
                id: Math.random(),
                x,
                y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                color
            });
        }
    };

    const gameLoop = useCallback((time: number) => {
        if (!containerRef.current || gameOver) return;

        lastTimeRef.current = time;

        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Update Hoop
        let hoop = hoopRef.current;

        // Difficulty & Progression Modifiers
        let speedMultiplier = 1;
        if (gameStage === 1) speedMultiplier = 0.5; // Slow down for Prospecting

        // Base speed progression
        const targetSpeed = (0.5 + (score * 0.08)) * speedMultiplier;
        hoop.speed = hoop.speed * 0.99 + targetSpeed * 0.01;

        hoop.x += hoop.direction * hoop.speed;
        if (hoop.x > 90 || hoop.x < 10) {
            hoop.direction *= -1;
        }
        setUiHoopX(hoop.x);

        // Hoop Dimensions
        const hoopY = height * 0.2;
        let hoopW = width * 0.25;
        if (gameStage >= 2) hoopW *= 1.2; // Bigger hoop for Qualified

        const hoopLeft = (hoop.x / 100) * width - hoopW / 2;
        const hoopRight = (hoop.x / 100) * width + hoopW / 2;
        const hoopCenter = (hoopLeft + hoopRight) / 2;
        const netBottom = hoopY + hoopW * 0.8; // Approx net height

        // Update Balls
        ballsRef.current.forEach(ball => {
            if (!ball.active) return;

            ball.vy += GRAVITY;

            // Fireball Effect (Stage 3)
            if (gameStage >= 3 && Math.random() > 0.5) {
                particlesRef.current.push({
                    id: Math.random(),
                    x: ball.x,
                    y: ball.y,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 0.5,
                    color: "#ff4d00"
                });
            }

            if (ball.inHoop) {
                // Net Physics: Funnel towards center, dampen X movement
                const distToCenter = hoopCenter - ball.x;
                ball.vx += distToCenter * 0.1; // Stronger pull to center
                ball.vx *= 0.6; // Heavy friction to stop bouncing
                ball.vy *= 0.9; // Slight drag falling down

                // Check if exited net bottom
                if (ball.y > netBottom) {
                    ball.active = false;
                    const points = gameStage >= 3 ? 2 : 1; // Double points for Closed Won
                    setScore(s => s + points);
                    setLives(l => Math.min(5, l + 1));
                    spawnParticles(ball.x, ball.y, 20, "#00f5ff"); // Confetti
                }
            } else {
                // Normal Physics
                ball.vx *= FRICTION;
                ball.vy *= FRICTION;

                // Wall collisions
                if (ball.x < ball.radius) {
                    ball.x = ball.radius;
                    ball.vx *= -BOUNCE;
                } else if (ball.x > width - ball.radius) {
                    ball.x = width - ball.radius;
                    ball.vx *= -BOUNCE;
                }

                // Floor collision (Miss)
                if (ball.y > height - ball.radius) {
                    ball.active = false;
                    setLives(l => {
                        const newLives = Math.max(0, l - 1);
                        // Check for Game Over: No lives left AND no other balls active
                        const activeBalls = ballsRef.current.filter(b => b.active && b.id !== ball.id).length;
                        if (newLives <= 0 && activeBalls === 0) {
                            setGameOver(true);
                        }
                        return newLives;
                    });
                    spawnParticles(ball.x, height - 10, 10, "#ff006e"); // Splat
                }

                // Hoop Collision Check
                // Check if ball is crossing the rim plane
                if (Math.abs(ball.y - hoopY) < 15 && ball.vy > 0) {
                    // Check horizontal
                    if (ball.x > hoopLeft + 5 && ball.x < hoopRight - 5) {
                        // ENTER HOOP
                        ball.inHoop = true;
                        // Kill some velocity to make it "catch"
                        ball.vy *= 0.5;
                    } else if (Math.abs(ball.x - hoopLeft) < 15 || Math.abs(ball.x - hoopRight) < 15) {
                        // Rim bounce
                        ball.vy *= -BOUNCE;
                        // Push away from center to prevent "landing on top"
                        const pushDir = ball.x < hoopCenter ? -1 : 1;
                        ball.vx = pushDir * Math.max(Math.abs(ball.vx), 3); // Ensure minimum push
                        // Force y slightly up to avoid sticking
                        ball.y = hoopY - 16;
                    }
                }
            }

            ball.x += ball.vx;
            ball.y += ball.vy;
        });

        // Cleanup inactive balls
        ballsRef.current = ballsRef.current.filter(b => b.active);
        setUiBalls([...ballsRef.current]);

        // Update Particles
        particlesRef.current.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += GRAVITY * 0.5;
            p.life -= 0.02;
        });
        particlesRef.current = particlesRef.current.filter(p => p.life > 0);
        setUiParticles([...particlesRef.current]);

        requestRef.current = requestAnimationFrame(gameLoop);
    }, [score, lives, gameOver, gameStage]);

    useEffect(() => {
        if (isOpen && !gameOver) {
            requestRef.current = requestAnimationFrame(gameLoop);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isOpen, gameOver, gameLoop]);

    // Calculate Trajectory
    useEffect(() => {
        if (!isDragging || !containerRef.current) {
            setTrajectoryPoints([]);
            return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const startX = rect.width / 2;
        const startY = rect.height - 50;

        const dx = dragStart.x - dragCurrent.x;
        const dy = dragStart.y - dragCurrent.y;
        const power = 0.18;

        let vx = dx * power;
        let vy = dy * power;
        let x = startX;
        let y = startY;

        const points = [];
        // Simulate 30 frames
        for (let i = 0; i < 30; i++) {
            vy += GRAVITY;
            vx *= FRICTION;
            vy *= FRICTION;
            x += vx;
            y += vy;
            points.push({ x, y });
        }
        setTrajectoryPoints(points);

    }, [isDragging, dragStart, dragCurrent]);

    // Input Handlers
    const handleStart = (x: number, y: number) => {
        if (gameOver || lives <= 0) return;
        setIsDragging(true);
        setDragStart({ x, y });
        setDragCurrent({ x, y });
    };

    const handleMove = (x: number, y: number) => {
        if (!isDragging) return;
        setDragCurrent({ x, y });
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const dx = dragStart.x - dragCurrent.x;
        const dy = dragStart.y - dragCurrent.y;
        const power = 0.18;

        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const startX = rect.width / 2;
            const startY = rect.height - 50;

            ballsRef.current.push({
                id: Date.now(),
                x: startX,
                y: startY,
                vx: dx * power,
                vy: dy * power,
                radius: 15,
                active: true,
                inHoop: false
            });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 md:p-4 touch-none select-none"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative h-full md:h-[85vh] w-full max-w-lg overflow-hidden bg-[#050110] shadow-2xl md:rounded-3xl border-x-0 md:border-4 border-[#ff006e] shadow-[0_0_50px_rgba(255,0,110,0.3)]"
                        onClick={(e) => e.stopPropagation()}
                        ref={containerRef}
                        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                        onMouseUp={handleEnd}
                        onMouseLeave={() => setIsDragging(false)}
                        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                        onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                        onTouchEnd={handleEnd}
                    >
                        {/* Court Lines (Neon) */}
                        <div className="absolute inset-0 pointer-events-none opacity-30">
                            {/* Key */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] border-x-2 border-t-2 border-[#00f5ff] shadow-[0_0_10px_#00f5ff]" />
                            {/* Free Throw Circle */}
                            <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 w-[40%] h-[20%] border-2 border-[#00f5ff] rounded-full translate-y-1/2 shadow-[0_0_10px_#00f5ff]" />
                            {/* 3 Point Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[60%] border-x-2 border-t-2 border-[#ff006e] rounded-t-full shadow-[0_0_10px_#ff006e]" />
                        </div>

                        {/* UI Layer */}
                        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-30 pointer-events-none">
                            <div>
                                <div className="text-sm text-[#00f5ff] font-bold tracking-widest">SCORE</div>
                                <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_#00f5ff]">{score}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-[#ffbe0b] font-bold tracking-widest">BEST</div>
                                <div className="text-3xl font-bold text-white drop-shadow-[0_0_10px_#ffbe0b]">{highScore}</div>
                            </div>
                        </div>

                        {/* Notification Popup */}
                        <AnimatePresence>
                            {notification && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute top-24 left-0 w-full text-center z-50 pointer-events-none"
                                >
                                    <div
                                        className="inline-block px-6 py-2 rounded-full bg-black/80 backdrop-blur border-2 shadow-[0_0_30px_currentColor]"
                                        style={{ borderColor: notification.color, color: notification.color, boxShadow: `0 0 30px ${notification.color}` }}
                                    >
                                        <span className="text-xl font-black tracking-widest uppercase">{notification.text}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Lives */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-6 h-6 rounded-full transition-all duration-300 ${i < lives
                                        ? 'bg-[#ff006e] shadow-[0_0_10px_#ff006e] scale-100'
                                        : 'bg-gray-800 scale-75 opacity-50'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-20 md:top-4 z-40 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 active:scale-90"
                        >
                            ✕
                        </button>

                        {/* Game Over Screen */}
                        {gameOver && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
                                <h2 className="text-6xl font-black text-white mb-2 tracking-tighter italic">GAME OVER</h2>
                                <p className="text-[#00f5ff] text-2xl mb-8 font-bold">Score: {score}</p>
                                <button
                                    onClick={resetGame}
                                    className="px-10 py-4 bg-[#ff006e] rounded-full text-white font-black text-xl hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_#ff006e] border-2 border-white/20"
                                >
                                    PLAY AGAIN
                                </button>
                            </div>
                        )}

                        {/* Hoop */}
                        <div
                            className="absolute top-[20%] -translate-x-1/2 aspect-square z-10 pointer-events-none transition-all duration-500"
                            style={{
                                left: `${uiHoopX}%`,
                                width: gameStage >= 2 ? '30%' : '25%' // Bigger hoop at Stage 2
                            }}
                        >
                            {/* Backboard */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[80%] bg-white/10 border-2 border-[#00f5ff] rounded-lg backdrop-blur-sm shadow-[0_0_15px_#00f5ff] z-10">
                                {/* Target Box */}
                                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[40%] h-[30%] border-2 border-white/80 shadow-[0_0_10px_white]" />
                            </div>

                            {/* Rim (Front) */}
                            <div className="absolute top-[70%] left-1/2 -translate-x-1/2 w-full h-4 bg-[#ff4d00] rounded-full shadow-[0_0_10px_#ff4d00] z-30" />

                            {/* Net */}
                            <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-[80%] h-[80%] border-x-2 border-b-2 border-white/30 skew-x-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMTBMMTAgME0wIDBMMTAgMTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] opacity-50 z-25" />
                        </div>

                        {/* Balls */}
                        {uiBalls.map(ball => (
                            <div
                                key={ball.id}
                                className={`absolute w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#ff006e] to-[#700030] shadow-[0_0_15px_#ff006e] pointer-events-none border border-white/20 transition-transform duration-300 ${ball.inHoop ? 'z-20' : 'z-40'}`}
                                style={{
                                    left: ball.x - ball.radius,
                                    top: ball.y - ball.radius,
                                    transform: ball.inHoop ? 'scale(0.85)' : 'scale(1)'
                                }}
                            />
                        ))}

                        {/* Particles */}
                        {uiParticles.map(p => (
                            <div
                                key={p.id}
                                className="absolute w-2 h-2 rounded-full pointer-events-none z-40"
                                style={{
                                    left: p.x,
                                    top: p.y,
                                    backgroundColor: p.color,
                                    opacity: p.life,
                                    transform: `scale(${p.life})`,
                                    boxShadow: `0 0 10px ${p.color}`
                                }}
                            />
                        ))}

                        {/* Trajectory Line */}
                        {isDragging && !gameOver && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                                {/* Dotted Path */}
                                {trajectoryPoints.map((p, i) => (
                                    <circle
                                        key={i}
                                        cx={p.x}
                                        cy={p.y}
                                        r={3 - (i * 0.05)} // Tapering size
                                        fill="white"
                                        opacity={1 - (i * 0.03)} // Fading opacity
                                    />
                                ))}

                                {/* Drag Line (Subtle) */}
                                <line
                                    x1={dragStart.x - (containerRef.current?.getBoundingClientRect().left || 0)}
                                    y1={dragStart.y - (containerRef.current?.getBoundingClientRect().top || 0)}
                                    x2={dragCurrent.x - (containerRef.current?.getBoundingClientRect().left || 0)}
                                    y2={dragCurrent.y - (containerRef.current?.getBoundingClientRect().top || 0)}
                                    stroke="#00f5ff"
                                    strokeWidth="1"
                                    strokeDasharray="5,5"
                                    opacity="0.3"
                                />
                            </svg>
                        )}

                        {/* Instructions */}
                        {!isDragging && uiBalls.length === 0 && score === 0 && !gameOver && (
                            <div className="absolute bottom-20 w-full text-center pointer-events-none">
                                <p className="text-[#00f5ff] font-bold animate-pulse tracking-widest uppercase text-sm">Drag to aim</p>
                                <p className="text-white/50 text-xs mt-1">Score adds life</p>
                            </div>
                        )}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MascotGame;
