# Kodee Preview — Design Philosophy

## Design Movement
**Warm Minimalism with Craft Sensibility** — inspired by contemporary design studios and premium SaaS products. The aesthetic balances clarity with warmth, avoiding cold corporate sterility.

## Core Principles
1. **Intentional Warmth**: Use earthy, amber tones to create psychological comfort and trust (not clinical blues)
2. **Generous Whitespace**: Let content breathe; avoid cluttered layouts
3. **Craft-First Typography**: Serif headings (Instrument Serif) paired with clean sans-serif body (Sora) to signal premium quality
4. **Progressive Disclosure**: Show only what's needed at each step; reveal complexity gradually

## Color Philosophy
- **Amber (#E07A1F)**: Primary action color — energetic, optimistic, signals "go"
- **Ink (#1A1208)**: Near-black for text and headings — warm, not cold
- **Cream (#FBF8F3)**: Page background — soft, inviting, reduces eye strain
- **Warm (#F5EFE4)**: Secondary background for cards and hover states — subtle depth
- **Muted (#7A6F60)**: Secondary text — readable but not dominant

## Layout Paradigm
- **Asymmetric Hero**: Left-aligned headline with breathing room on the right
- **Centered Card Form**: White card with soft shadow, centered on page for focus
- **Full-Width Preview**: Immersive iframe display for generated mockups
- **Proof Strip**: Horizontal testimonial-style strip below form

## Signature Elements
1. **Amber Spinning Ring**: Loading indicator with smooth CSS animation
2. **Pill Badges**: Rounded 100px badges for status, industry chips, and CTAs
3. **Soft Shadows**: Subtle `0 4px 12px rgba(0,0,0,0.08)` for depth without harshness

## Interaction Philosophy
- **Immediate Feedback**: All buttons show hover state (slight lift, shadow increase)
- **Smooth Transitions**: 0.18s ease timing for all state changes
- **Loading Transparency**: Show progress with sequential step reveals (0.8s, 2.2s, 3.8s delays)
- **Error Clarity**: Red-bordered boxes with clear messaging, no dismissal required

## Animation Guidelines
- **Entrance**: Fade-in + subtle scale (1.02 → 1) over 0.3s
- **Loading Ring**: Continuous 2s rotation with opacity pulse
- **Step Reveals**: Fade-in with 0.5s duration, staggered delays
- **Button Hover**: translateY(-1px) + shadow increase

## Typography System
- **Headings**: Instrument Serif, 700 weight, italic for emphasis words
- **Body**: Sora, 400 weight, 1.6 line-height
- **UI Labels**: Sora, 500 weight, 0.95rem
- **Micro-text**: Sora, 300 weight, 0.82rem

---

**Design Token Values** (from brief):
```
--ink:          #1A1208
--cream:        #FBF8F3
--warm:         #F5EFE4
--amber:        #E07A1F
--amber-light:  #FEF3E2
--amber-dark:   #B85E0D
--muted:        #7A6F60
--border:       #E5DDD0
--white:        #FFFFFF
```
