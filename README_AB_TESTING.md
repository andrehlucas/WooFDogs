# Hero Section A/B Testing

I've created two distinct hero section variations for your WooF Dogs training website that you can use for A/B testing.

## The Variants

### **Variant A: Bento Grid Layout** 
Located in: `src/components/HeroVariantA.tsx`

This is the design from your original file - a sophisticated bento grid layout featuring:
- **Modern bento grid** with 5 training services displayed in asymmetric cards
- **Smooth animations** including float, pulse, tilt, drift, and glow effects
- **Aurora background** with subtle grid pattern overlay
- **Dark/Light mode** toggle button
- **Hover effects** with spotlight interaction on cards
- **Professional feel** with minimalist, high-end aesthetic

**Best for:** Users who prefer to see all options at once, visual learners

---

### **Variant B: Interactive Carousel**
Located in: `src/components/HeroVariantB.tsx`

A completely different approach with interactive elements:
- **Hero-style layout** with large headline and gradient accent text
- **Interactive rotating showcase** - features auto-rotate every 4 seconds
- **Call-to-action buttons** (Get Started / Learn More)
- **Feature selector cards** at the bottom that control the main display
- **Progress indicators** showing active feature
- **Gradient backgrounds** with soft blue/purple color scheme
- **Bouncing icon animations** in the active feature display

**Best for:** Users who prefer guided discovery, mobile users, those seeking immediate action

---

## How to Test

### Quick Preview Page
Visit `/hero-test` to see both variants side-by-side with a toggle button:
- Navigate to: `http://localhost:5000/hero-test`
- Click "Variant A" or "Variant B" to switch between designs
- Test both on mobile and desktop
- Try dark/light modes on both

### Integration into Your Main Site

To use one of these variants in your actual landing page:

**Option 1: Replace the current landing page**
```tsx
// In src/pages/Index.tsx
import HeroVariantA from "@/components/HeroVariantA";
// or
import HeroVariantB from "@/components/HeroVariantB";

const Index = () => {
  return <HeroVariantA />;  // or <HeroVariantB />
};
```

**Option 2: A/B test with a random assignment**
```tsx
// In src/pages/Index.tsx
import { useState, useEffect } from "react";
import HeroVariantA from "@/components/HeroVariantA";
import HeroVariantB from "@/components/HeroVariantB";

const Index = () => {
  const [variant, setVariant] = useState<"A" | "B">("A");
  
  useEffect(() => {
    // Randomly assign variant on first visit
    const assigned = Math.random() < 0.5 ? "A" : "B";
    setVariant(assigned);
    
    // Track which variant was shown (integrate with your analytics)
    console.log(`User assigned to Variant ${assigned}`);
  }, []);

  return variant === "A" ? <HeroVariantA /> : <HeroVariantB />;
};
```

## Key Differences

| Feature | Variant A | Variant B |
|---------|-----------|-----------|
| Layout | Bento Grid | Split Hero + Carousel |
| Interaction | Hover effects | Click/Auto-rotate |
| CTAs | None | 2 prominent buttons |
| Information Display | All visible | One at a time |
| Animation Style | Subtle & elegant | Dynamic & playful |
| Color Scheme | Neutral grays | Blue/Purple gradients |
| Best Device | Desktop | Mobile-friendly |

## Testing Metrics to Track

1. **Engagement**
   - Time spent on page
   - Scroll depth
   - Feature card interactions

2. **Conversion**
   - Click-through rate on CTAs (Variant B has buttons)
   - Form submissions
   - Navigation to service pages

3. **User Preference**
   - Bounce rate
   - Pages per session
   - Return visitor rate

## Customization

Both variants use the same training service data, so updates to content will automatically reflect in both:

```tsx
const features = [
  {
    title: "Obedience Training",
    blurb: "Your description here...",
    meta: "Focus",
    icon: Aperture,
  },
  // ... more features
];
```

To customize:
- **Colors**: Edit the Tailwind classes and CSS custom properties
- **Animations**: Modify the `@keyframes` in each component's useEffect
- **Timing**: Adjust animation durations and carousel rotation speed
- **Content**: Update the features array

## Dark Mode

Both variants include full dark mode support that syncs with your site's theme toggle.

---

**Need help?** Both components are fully self-contained and include all necessary test IDs for automated testing.
