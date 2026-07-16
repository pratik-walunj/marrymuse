/** Primary navigation model, shared by the header mega-menu and mobile drawer. */

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Luxury Wedding Planning",
        href: "/services#planning",
        description: "Full-service planning, styled to perfection.",
      },
      {
        label: "Destination Weddings",
        href: "/destinations",
        description: "Breathtaking venues across India & the world.",
      },
      {
        label: "Décor & Design",
        href: "/services#decor",
        description: "Bespoke tablescapes, florals & installations.",
      },
      {
        label: "Photography & Film",
        href: "/services#media",
        description: "Cinematic storytelling of your day.",
      },
      {
        label: "Guest Hospitality",
        href: "/services#hospitality",
        description: "Seamless logistics for every guest.",
      },
      {
        label: "View all services",
        href: "/services",
        description: "Explore our full suite of 15+ services.",
      },
    ],
  },
  { label: "Packages", href: "/packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  explore: [
    { label: "About Us", href: "/about" },
    { label: "Wedding Packages", href: "/packages" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  services: [
    { label: "Wedding Planning", href: "/services#planning" },
    { label: "Destination Weddings", href: "/destinations" },
    { label: "Décor & Design", href: "/services#decor" },
    { label: "Photography & Film", href: "/services#media" },
    { label: "Honeymoon Planning", href: "/services#honeymoon" },
  ],
  destinations: [
    { label: "Udaipur", href: "/destinations" },
    { label: "Goa", href: "/destinations" },
    { label: "Jaipur", href: "/destinations" },
    { label: "Bali", href: "/destinations" },
    { label: "Dubai", href: "/destinations" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
