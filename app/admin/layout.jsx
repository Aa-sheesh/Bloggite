export const metadata = {
  title: "Admin Panel – Bloggite",
  description: "Restricted admin area for managing Bloggite posts and settings.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({ children }) {
  return <>{children}</>;
}
