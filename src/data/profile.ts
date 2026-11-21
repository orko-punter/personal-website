export const profile = {
  name: "Anish Raj Anand",
  tagline: "Strategy & Product",
  credential: "MBA 2028 @ LBS",
  tags: ["Problem Solving", "Adventures", "Business"],
  bio: "I find my excitement in this world through solving problems — be it strategy for my clients, building a new product for my team, or dancing to cure the staleness of the day!",
  location: "London",
  avatar: "/avatar.jpg", // put an image at public/avatar.jpg, or leave as-is to use initials
};

export const socials = [
  { label: "Book a call", href: "https://calendly.com/anish_learning/discussion", icon: "calendar" },
  { label: "Email", href: "mailto:rraa11296@gmail.com", icon: "mail" },
  { label: "LBS Email", href: "mailto:aanand.mba2028@london.edu", icon: "mail" },
  { label: "Phone", href: "tel:+447417353138", icon: "phone" },
] as const;

export const support = {
  label: "Support my work",
  href: "https://buy.stripe.com/6oUfZiccYgj75yP7tmds400",
} as const;

export const followLinks = [
  { label: "Follow on LinkedIn", href: "https://www.linkedin.com/in/rraa11296/", icon: "linkedin" },
  { label: "Follow on Instagram", href: "https://www.instagram.com/utopiaisnotreal/", icon: "instagram" },
  { label: "Follow on Medium", href: "https://medium.com/@rraa11296", icon: "medium" },
] as const;

// Big numbers on the home page (count up when scrolled into view). Words inside *asterisks* are set in italic serif.
export const stats = [
  { value: 31, prefix: "₹", suffix: " Cr", label: "a year saved in middle-mile costs at *Shadowfax*" },
  { value: 100000, prefix: "", suffix: "+", label: "hours of manual work automated at *Goldman Sachs*" },
] as const;

// Pastel tint + ink pairs, used for cards across the site.
export const palette = [
  { tint: "#ffdcc8", ink: "#e0531f" },
  { tint: "#d7e5ff", ink: "#2f6fde" },
  { tint: "#cdeecd", ink: "#0e8a4b" },
  { tint: "#ffd3df", ink: "#c4245c" },
  { tint: "#e4d9ff", ink: "#7b52d6" },
  { tint: "#ffeba8", ink: "#b38209" },
  { tint: "#c8f0ec", ink: "#0f97a5" },
  { tint: "#efdcc9", ink: "#9a6a43" },
] as const;
