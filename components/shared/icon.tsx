import {
  Sparkles,
  Plane,
  MapPin,
  Flower2,
  Camera,
  Video,
  Music,
  Brush,
  Mail,
  UtensilsCrossed,
  Users,
  Hotel,
  Car,
  Heart,
  Building2,
  Gem,
  MessageCircle,
  ClipboardList,
  Wallet,
  Palette,
  PartyPopper,
  ShieldCheck,
  BadgeIndianRupee,
  Clock,
  Award,
  HandHeart,
  Crown,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Plane,
  MapPin,
  Flower2,
  Camera,
  Video,
  Music,
  Brush,
  Mail,
  UtensilsCrossed,
  Users,
  Hotel,
  Car,
  Heart,
  Building2,
  Gem,
  MessageCircle,
  ClipboardList,
  Wallet,
  Palette,
  PartyPopper,
  ShieldCheck,
  BadgeIndianRupee,
  Clock,
  Award,
  HandHeart,
  Crown,
};

/** Resolve a Lucide icon by string name (from Keystatic content). */
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const LucideComp = iconMap[name] ?? Sparkles;
  return <LucideComp className={className} aria-hidden="true" />;
}
