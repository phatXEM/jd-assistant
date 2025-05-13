import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import "choices.js/public/assets/styles/choices.min.css";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JD Assistant",
  description: "Generate interview questions from job descriptions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.39.1/ace.js"
          integrity="sha512-tGc7XQXpQYGpFGmdQCEaYhGdJ8B64vyI9c8zdEO4vjYaWRCKYnLy+HkudtawJS3ttk/Pd7xrkRjK8ijcMMyauw=="
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.39.1/ext-modelist.min.js"
          integrity="sha512-GAp+4Q5VgeCXiNxD89+0KWJwPSLqXM9FgTRLhJxGjB1jjFrb6l9bYUkaTun39gcvZ89FYUXLYQEhLk8TEJztYA=="
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
