import "../styles/globals.css";

export const metadata = {
  title: "KpopShowdown",
  description: "The Ultimate K-Pop Moments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 min-h-screen">{children}</body>
    </html>
  );
}
