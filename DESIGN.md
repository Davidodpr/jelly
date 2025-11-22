# Jellymove Design Documentation

## Brand Concept

**Jellymove** = Basketball term for a "jelly layup" - a smooth, creative, unpredictable finish that's hard to defend. The name represents:
- Smooth, acrobatic finishes
- Creative plays that defenders can't predict
- Flair and style over brute force
- Scoring in the paint

## Tone & Voice

**Edgy but friendly** - inspired by Porkbun.com
- Self-aware, irreverent humor
- Confident without arrogance
- Direct and punchy
- Basketball vernacular throughout
- Warm and conversational (not corporate)

## Color Palette

### Primary Colors
- **Hot Pink**: `#ff006e` - Primary accent, CTAs
- **Neon Cyan**: `#00f5ff` - Secondary accent, hovers
- **Electric Yellow**: `#ffbe0b` - Tertiary accent

### Background
- **Deep Purple-Black**: `#0d0221` - Main background

### Text
- **White**: `#ffffff` - Primary text
- **Gray-200**: Secondary text
- **Gray-300**: Muted text

## Typography

- Headlines: Extra bold, high contrast sizes
- "The game moved." - Smaller, lighter weight, tracking-widest uppercase
- "You didn't." - Massive (6xl-8xl), bold, cyan with glow effect

## Key Copy

### Hero
- **Badges**: "Sales plays, AI-powered" | "Outreach that actually sounds like you"
- **Headline**: "The game moved. You didn't."
- **Subtext**: "Creative plays that intercept customers mid-move. Nothing but net."
- **CTA**: "Let's talk"
- **Micro-copy chips**: "Finish smooth", "Can't predict, can't defend", "Score in the paint", "All flair, no fluff"

### Header
- **Nav**: About, Services, Contact
- **CTA Button**: "Make your move"

### About Section
- **Headline**: "A jelly layup isn't about force. It's about flow."
- **Cards**: Read the defense, Adjust mid-air, Finish smooth

### Services (Three Plays)
1. **The Steal** - Finding customers in partner ecosystems
2. **The Playbook** - Testing and iterating sales plays
3. **Transition Game** - Catching customers mid-decision

### Humble Brag (Case Studies)
Two cases with warm, Porkbun-style copy:

**Case 1: Moving Portal**
- Title: "Wait, We're Profitable Now?"
- Setup: "5M EUR in revenue sounds nice until you're losing 150K/month..."
- Results: 750K EUR/month, profitable in under 12 months, no new funding
- Quote: "In less than a year, we went from surviving to dominating."

**Case 2: Solar Panels**
- Title: "Your Best Leads Were Already in the CRM"
- Setup: "Chasing new customers is expensive..."
- Results: CAC down 30%, revenue up 40% in 6 months
- Quote: "We were looking everywhere except where the money already was."

### Contact
- **Headline**: "What's your move?"
- **Email**: hi@jellymove.com
- **Signoff**: "Inbox open. Excuses closed."

### Footer
- **Philosophy**: "Automation handles busy. You handle brilliant."
- **Faith statement**: "And remember: Faith first. Everything else follows."
- **Copyright**: "© 2025 Jellymove. Built different."

## Metadata

- **Title**: "Jellymove | Intercepting Revenue Mid-Move"
- **Description**: "B2B sales plays that intercept customers mid-move. Creative strategies and AI-powered outreach that actually sounds like you."
- **OG/Twitter tags**: Configured for social sharing
- **Favicon**: /favicon.ico
- **Apple Touch Icon**: /apple-touch-icon.png

## Design Elements

### Animations
- **Jelly Squish**: Hover effect on cards - squash and bounce like a soft landing
- **Scroll Reveal**: Sections animate in when scrolling into view (Intersection Observer)
- **Framer Motion**: Hero animations with staggered delays
- **Scroll Indicator**: Bouncing arrow at bottom of hero
- **Background Blobs**: Animated gradient circles in hero

### Cards
- Staggered layout (different vertical positions)
- Slight rotation on cards 2 and 3
- Gradient bar at top (pink → cyan → yellow)
- Glassmorphism with backdrop blur

### Buttons/CTAs
- Solid hot pink background
- White text
- Hover: Changes to cyan with dark text
- Subtle scale on hover
- Glow shadow effect

### Email Link
- Gradient text (pink → cyan)
- Hover glow effect
- Gradient reverses on hover

### Mascot
- Fixed position bottom-left corner
- Cute jelly character with basketball
- Tooltip: "Psst... Play me!"
- Clickable - opens MascotGame
- Hover: scale-110, rotate-3

## Components

```
src/components/
├── Header.tsx       - Fixed nav with mobile hamburger menu
├── Hero.tsx         - Framer Motion animations, JellyButton
├── About.tsx        - Philosophy section with 3 staggered cards
├── Services.tsx     - The three services with ScrollReveal
├── Highlights.tsx   - Case studies (Humble Brag section)
├── Contact.tsx      - Email-only contact with ScrollReveal
├── Footer.tsx       - Glassmorphism footer with faith statement
├── ScrollReveal.tsx - Intersection Observer scroll animations
├── JellyButton.tsx  - Animated CTA button
└── MascotGame.tsx   - Interactive game component
```

## CSS Classes

### Custom Utilities (globals.css)
- `.gradient-text` - Pink/cyan/yellow gradient text
- `.text-accent` - Cyan text
- `.text-hot` - Hot pink text
- `.hover-jelly` - Squish animation on hover
- `.animate-fade-in` - Fade up animation
- `.animate-fade-in-delay-1/2/3` - Staggered delays

### Base Styles
- `scroll-behavior: smooth` on html
- `scroll-margin-top: 5rem` on sections (for fixed header)
- `overflow-x: hidden` to prevent horizontal scroll

## Accessibility

- Solid cyan for "You didn't." (not gradient) - better contrast
- `aria-label` on navigation and interactive elements
- Strong cyan focus rings (`focus:ring-2 focus:ring-[#00f5ff]`)
- `prefers-reduced-motion` support in ScrollReveal
- Mobile hamburger menu with proper focus states
- Scroll indicator with `aria-label`

## Design Decisions

1. **Full edge color palette** over B2B-safe blues - brand differentiation
2. **One CTA per section** - clearer conversion path
3. **Basketball metaphors throughout** - brand consistency
4. **Email-only contact** - low friction, high intent filtering
5. **Staggered cards** - breaks "template" feeling
6. **Jelly squish hover** - on-brand interaction
7. **Warm copy tone** - Porkbun-inspired, not corporate
8. **Explicit faith statement** - authentic to founder values
9. **Scroll-triggered animations** - modern, engaging experience
10. **Mascot character** - adds personality and delight

## Target Audience

B2B sales teams at companies using:
- Moving platforms
- Insurance portals
- Partner ecosystems
- Solar/energy companies

Looking for help with:
- Finding customers in others' funnels
- Creating effective sales plays
- AI-powered outreach that sounds human
- Turning existing CRM contacts into revenue
