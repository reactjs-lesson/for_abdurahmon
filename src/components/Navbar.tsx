"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/texts", label: "Texte" },
  { href: "/games", label: "Spiele" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/texts" className="text-sm font-bold tracking-wide text-slate-900 sm:text-base">
          Deutsch Arena
        </Link>
        <div className="flex items-center gap-2">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-indigo-100 text-indigo-800"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
