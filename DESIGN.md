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
- "The game moved." - Smaller, lighter weight
- "You didn't." - Massive, bold, cyan color

## Key Copy

### Hero
- **Headline**: "The game moved. You didn't."
- **Subtext**: "Jellymove helps you finish smooth—creative plays that defenders can't predict, and AI that makes your outreach look effortless."
- **CTA**: "Let's talk"

### About Section
- **Headline**: "A jelly layup isn't about force. It's about flow."
- **Cards**: Read the defense, Adjust mid-air, Finish smooth

### Services (Three Plays)
1. **The Steal** - Finding customers in partner ecosystems
2. **The Playbook** - Testing and iterating sales plays
3. **Transition Game** - Catching customers mid-decision

### Contact
- **Headline**: "What's your move?"
- **Email**: hi@jellymove.com
- **Signoff**: "Inbox open. Excuses closed."

## Design Elements

### Animations
- **Jelly Squish**: Hover effect on cards - squash and bounce like a soft landing
- **Fade In Up**: Sections animate in on load
- **Scroll Indicator**: Bouncing arrow at bottom of hero

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

### Email Link
- Gradient text (pink → cyan)
- Hover glow effect
- Gradient reverses on hover

## Components

```
src/components/
├── Header.tsx    - Fixed nav with gradient logo
├── Hero.tsx      - Main headline, CTA, scroll indicator
├── About.tsx     - Philosophy section with 3 cards
├── Services.tsx  - The three services
├── Contact.tsx   - Email-only contact
└── Footer.tsx    - Copyright
```

## CSS Classes

### Custom Utilities (globals.css)
- `.gradient-text` - Pink/cyan/yellow gradient text
- `.text-accent` - Cyan text
- `.text-hot` - Hot pink text
- `.hover-jelly` - Squish animation on hover
- `.animate-fade-in` - Fade up animation

## Accessibility

- Solid cyan for "You didn't." (not gradient) - better contrast
- `aria-label` on navigation
- Focus rings on all interactive elements
- Scroll indicator with `aria-label`

## Design Decisions

1. **Full edge color palette** over B2B-safe blues - brand differentiation
2. **One CTA per section** - clearer conversion path
3. **Basketball metaphors throughout** - brand consistency
4. **Email-only contact** - low friction, high intent filtering
5. **Staggered cards** - breaks "template" feeling
6. **Jelly squish hover** - on-brand interaction

## Target Audience

B2B sales teams at companies using:
- Moving platforms
- Insurance portals
- Partner ecosystems

Looking for help with:
- Finding customers in others' funnels
- Creating effective sales plays
- AI-powered outreach that sounds human
