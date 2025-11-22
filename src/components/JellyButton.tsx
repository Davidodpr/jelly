"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface JellyButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    href?: string;
}

const JellyButton = ({ children, onClick, className = "", href }: JellyButtonProps) => {
    const baseClasses = "inline-block cursor-pointer select-none";

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`${baseClasses} ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <motion.div
                className="relative z-10"
                whileHover={{
                    y: -2,
                    transition: { type: "spring", stiffness: 300, damping: 10 }
                }}
            >
                {children}
            </motion.div>
        </Component>
    );
};

export default JellyButton;
