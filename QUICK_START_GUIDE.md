# Quick Start Guide - Hero Section A/B Testing

## 🎉 What I Created

Two completely different hero section designs for your WooF Dogs training website, ready for A/B testing!

## 🔗 Access the Test Page

**URL:** `http://localhost:5000/hero-test`

Click the toggle buttons at the top to switch between:
- **Variant A (Bento Grid)** - Your original sophisticated design
- **Variant B (Interactive)** - New engaging carousel layout

---

## 📊 The Two Variants

### Variant A: Bento Grid Layout
**File:** `src/components/HeroVariantA.tsx`

✨ **Features:**
- Sophisticated bento grid with asymmetric card layout
- All 5 services visible at once
- Elegant animations (float, pulse, tilt, drift, glow)
- Aurora gradient background with grid pattern
- Minimalist hover effects with spotlight
- Dark/light mode toggle

🎯 **Best for:** Desktop users, visual learners, users who want to scan all options quickly

---

### Variant B: Interactive Carousel  
**File:** `src/components/HeroVariantB.tsx`

✨ **Features:**
- Large hero headline with gradient accent
- Auto-rotating feature showcase (4-second intervals)
- Two prominent CTA buttons (Get Started / Learn More)
- Interactive feature selector cards
- Progress indicator dots
- Blue/purple gradient color scheme
- Bouncing icon animations

🎯 **Best for:** Mobile users, action-oriented visitors, guided discovery

---

## 🚀 How to Use in Production

### Option 1: Choose One Variant

Edit `src/pages/Index.tsx`:

```tsx
import HeroVariantA from "@/components/HeroVariantA";  // or HeroVariantB

const Index = () => {
  return <HeroVariantA />;
};

export default Index;
```

### Option 2: Simple A/B Test (50/50 Split)

Edit `src/pages/Index.tsx`:

```tsx
import { useState, useEffect } from "react";
import HeroVariantA from "@/components/HeroVariantA";
import HeroVariantB from "@/components/HeroVariantB";

const Index = () => {
  const [variant, setVariant] = useState<"A" | "B">("A");
  
  useEffect(() => {
    // Randomly assign variant
    const assigned = Math.random() < 0.5 ? "A" : "B";
    setVariant(assigned);
    
    // Track assignment (add your analytics here)
    console.log(`User shown Variant ${assigned}`);
  }, []);

  return variant === "A" ? <HeroVariantA /> : <HeroVariantB />;
};

export default Index;
```

### Option 3: Advanced A/B Test (with persistence)

```tsx
import { useState, useEffect } from "react";
import HeroVariantA from "@/components/HeroVariantA";
import HeroVariantB from "@/components/HeroVariantB";

const Index = () => {
  const [variant, setVariant] = useState<"A" | "B">("A");
  
  useEffect(() => {
    // Check if user was previously assigned
    let assigned = localStorage.getItem("hero_variant") as "A" | "B" | null;
    
    if (!assigned) {
      // New user - assign randomly
      assigned = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem("hero_variant", assigned);
      
      // Track new assignment
      // YOUR ANALYTICS: trackEvent("hero_variant_assigned", { variant: assigned });
    }
    
    setVariant(assigned);
  }, []);

  return variant === "A" ? <HeroVariantA /> : <HeroVariantB />;
};

export default Index;
```

---

## 📈 Metrics to Track

### Engagement Metrics
- Time on page
- Scroll depth  
- Feature card interactions (clicks)
- Dark mode toggle usage

### Conversion Metrics
- CTA clicks (Variant B has "Get Started" and "Learn More" buttons)
- Form submissions
- Navigation to service detail pages
- Bounce rate

### User Behavior
- Mobile vs Desktop performance
- Return visitor rates
- Pages per session

---

## 🎨 Customization

Both variants share the same training services data:

```tsx
const features = [
  {
    title: "Obedience Training",
    blurb: "Your description...",
    meta: "Focus",
    icon: Aperture,
  },
  // ... more services
];
```

**To customize:**
- Update service titles, descriptions, or icons in either component
- Adjust colors in Tailwind classes
- Modify animation durations in the `@keyframes` sections
- Change carousel timing (Variant B: currently 4 seconds)

---

## ⚡ Key Differences at a Glance

| Aspect | Variant A | Variant B |
|--------|-----------|-----------|
| **Layout** | Bento Grid | Hero + Carousel |
| **Display** | All at once | One at a time |
| **Interaction** | Hover | Click/Auto-rotate |
| **CTAs** | None | 2 buttons |
| **Colors** | Neutral grays | Blue/purple gradients |
| **Animation** | Subtle | Dynamic |
| **Best Device** | Desktop | Mobile-first |

---

## 🌓 Dark Mode

Both variants include complete dark mode support that syncs automatically with your site's theme toggle!

---

## 📝 Files Created

```
src/
├── components/
│   ├── HeroVariantA.tsx       # Bento grid version
│   └── HeroVariantB.tsx       # Interactive carousel version
├── pages/
│   └── HeroABTest.tsx         # Test page with toggle
└── App.tsx                    # Updated with /hero-test route
```

---

## ✅ Ready to Test!

1. Visit: `http://localhost:5000/hero-test`
2. Toggle between variants
3. Test on mobile and desktop
4. Try dark mode on both
5. Choose your favorite or run a proper A/B test!

For detailed information, see `README_AB_TESTING.md`
