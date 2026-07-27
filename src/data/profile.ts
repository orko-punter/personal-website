export const profile = {
  name: "Anish Raj Anand",
  tagline: "Strategy & Product",
  tags: ["Problem Solving", "Adventures", "Business"],
  bio: "My experience runs across business consulting and product management. I like to create to solve — and what I can't solve, I write about.",
  location: "London",
  avatar: "/avatar.jpg", // put an image at public/avatar.jpg, or leave as-is to use initials
};

export const socials = [
  { label: "Book a call", href: "https://calendly.com/anish_learning/discussion", icon: "calendar" },
  { label: "Email", href: "mailto:rraa11296@gmail.com", icon: "mail" },
  { label: "LBS Email", href: "mailto:aanand.mba2028@london.edu", icon: "mail" },
  { label: "Phone", href: "tel:+447417353138", icon: "phone" },
] as const;

export const followLinks = [
  { label: "Follow on LinkedIn", href: "https://www.linkedin.com/in/rraa11296/", icon: "linkedin" },
  { label: "Follow on Instagram", href: "https://www.instagram.com/utopiaisnotreal/", icon: "instagram" },
  { label: "Follow on Medium", href: "https://medium.com/@rraa11296", icon: "medium" },
] as const;
