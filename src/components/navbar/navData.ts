"use client";

import {
  GlobeIcon,
  LayersIcon,
  UserPlusIcon,
  BarChart,
  PlugIcon,
  DollarSign,
  ClipboardList,
  Baby,
  Dog,
  HeartPulse,
  FileText,
} from "lucide-react";
import type { NavItemType } from "@/components/ui/navigation-menu";

export const productLinks: NavItemType[] = [
  {
    title: "About Us",
    href: "/about",
    description: "Learn how Woof Dogs began and our mission to build better relationships through training.",
    icon: GlobeIcon,
  },
  {
    title: "Our Trainers",
    href: "/about#trainers",
    description: "Meet our certified professionals dedicated to helping dogs and owners thrive together.",
    icon: LayersIcon,
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Stay inspired with dog training tips, behavior advice, and real success stories.",
    icon: UserPlusIcon,
  },
  { title: "Contact Us", href: "/#contact", icon: BarChart },
  { title: "Reviews", href: "/#testimonials", icon: PlugIcon },
  { title: "Videos", href: "https://www.youtube.com/@WooFDogsTraining", icon: DollarSign },
];

export const servicesLinks: NavItemType[] = [
  { title: "Obedience Training", href: "/obedience", description: "Focus, discipline, and real-world manners.", icon: ClipboardList },
  { title: "Puppy Training", href: "/puppy-training", description: "Potty, crate, and early obedience training.", icon: Baby },
  { title: "Evaluation: Start Here", href: "/evaluation", description: "Comprehensive behavior evaluation.", icon: ClipboardList },
  { title: "Service Animal Training", href: "/service-animal-training", description: "Prepare dogs for assistance roles.", icon: Dog },
  { title: "Owner Guides", href: "#", description: "Free training guides and resources for dog owners.", icon: FileText },
  { title: "Therapy Dog Training", href: "/therapy-dog", description: "Emotional support and therapy work.", icon: Baby },
  { title: "Aggression Management", href: "/aggression-management", description: "Address aggressive behaviors.", icon: HeartPulse },
];
