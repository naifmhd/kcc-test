import { Logo } from "@/components/sections/site-header";
import { CurrentYear } from "@/components/sections/current-year";
import { navLinks, site } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="bg-foreground px-4 pt-14 pb-8 text-background">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm opacity-75">
              Fresh food, friendly faces, fair prices. {site.tagline} since {site.since}.
            </p>
            <ul className="mt-5 flex gap-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-9 place-items-center rounded-lg bg-background/10 text-xs font-bold transition-colors hover:bg-background/20"
                  >
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer">
            <h2 className="mb-3 font-semibold">Explore</h2>
            <ul className="space-y-1.5 text-sm opacity-75">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:underline">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-3 font-semibold">Contact</h2>
            <ul className="space-y-1.5 text-sm opacity-75">
              <li>{site.address.street}, {site.address.city}</li>
              <li><a href={site.phoneHref} className="hover:underline">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-background/15 pt-6 text-xs opacity-60">
          © <CurrentYear /> {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
