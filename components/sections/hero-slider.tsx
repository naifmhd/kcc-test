"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { slides } from "@/lib/data";

export function HeroSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // Created once; pauses on hover/focus so people can read the slide.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }),
  );

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    // Respect users who prefer reduced motion: no auto-advance.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay.stop();
    }
    return () => {
      api.off("select", onSelect);
    };
  }, [api, autoplay]);

  return (
    <section aria-label="Featured" className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[autoplay]}
        className="group"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, i) => (
            <CarouselItem
              key={slide.title}
              className="relative h-[min(78svh,640px)] min-h-[460px] pl-0"
              aria-label={`Slide ${i + 1} of ${slides.length}`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
                {...(i === 0
                  ? { loading: "eager" as const, fetchPriority: "high" as const }
                  : {})}
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#1e3226]/75 via-[#1e3226]/45 to-[#1e3226]/5" />
              <div className="relative mx-auto flex h-full max-w-6xl items-center px-4 pb-16">
                <div className="max-w-xl text-white">
                  <Badge className="mb-4 h-7 bg-butter px-3 text-xs font-semibold text-butter-foreground">
                    {slide.badge}
                  </Badge>
                  {i === 0 ? (
                    <h1 className="text-4xl leading-tight font-extrabold text-balance sm:text-6xl">
                      {slide.title}
                    </h1>
                  ) : (
                    <p className="font-heading text-4xl leading-tight font-extrabold text-balance sm:text-6xl">
                      {slide.title}
                    </p>
                  )}
                  <p className="mt-4 max-w-md text-lg text-white/90">{slide.text}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={slide.cta.href}
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "h-11 bg-peach px-5 text-peach-foreground hover:bg-peach/90",
                      )}
                    >
                      {slide.cta.label}
                    </a>
                    {slide.secondary && (
                      <a
                        href={slide.secondary.href}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "lg" }),
                          "h-11 border-white/70 bg-transparent px-5 text-white hover:bg-white/15 hover:text-white",
                        )}
                      >
                        {slide.secondary.label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 hidden size-11 border-0 bg-white/85 text-foreground hover:bg-white sm:inline-flex" />
        <CarouselNext className="right-4 hidden size-11 border-0 bg-white/85 text-foreground hover:bg-white sm:inline-flex" />

        <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-24">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={current === i}
              className={cn(
                "h-2.5 rounded-full transition-all",
                current === i ? "w-8 bg-butter" : "w-2.5 bg-white/60 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
