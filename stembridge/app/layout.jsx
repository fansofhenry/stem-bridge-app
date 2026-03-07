// app/layout.jsx
// ─────────────────────────────────────────────────────────────
// Root layout — wraps every page.
// This is where you add things that appear on ALL pages:
// nav, analytics, toast notifications, etc.
// ─────────────────────────────────────────────────────────────

import "./globals.css";

export const metadata = {
  title: "StemBridge — Where Foothill Students Build Together",
  description:
    "Upload your project. Post a wanted ad. Find a project that fits your life. Cross-pollinate across CS, science, art, business, and social justice.",
  metadataBase: new URL("https://stembridge.vercel.app"),
  openGraph: {
    title: "StemBridge",
    description: "STEM collaboration platform for Foothill College students",
    url: "https://stembridge.vercel.app",
    siteName: "StemBridge",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
