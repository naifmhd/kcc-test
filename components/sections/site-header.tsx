"use client";

import { useState } from "react";
import { MenuIcon, PhoneIcon, ShoppingBasketIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/data";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#top" className="flex w-fit items-center gap-2.5 font-heading text-xl font-extrabold">
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl",
          inverted ? "bg-butter text-butter-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        <ShoppingBasketIcon className="size-5" aria-hidden />
      </span>
      <span>
        Fresh<span className={inverted ? "text-butter" : "text-primary"}>Basket</span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={site.phoneHref}
          className={cn(buttonVariants({ size: "lg" }), "hidden h-10 px-4 md:inline-flex")}
        >
          <PhoneIcon aria-hidden /> Call us
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={<Button variant="outline" size="icon-lg" className="md:hidden" />}
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium hover:bg-muted"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <a href={site.phoneHref} className={cn(buttonVariants({ size: "lg" }), "h-11 w-full")}>
                <PhoneIcon aria-hidden /> Call {site.phone}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
