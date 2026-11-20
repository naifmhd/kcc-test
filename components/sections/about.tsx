import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { about, site } from "@/lib/data";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div className="relative">
          <div className="relative aspect-5/4 overflow-hidden rounded-3xl bg-muted">
            <Image
              src={about.image}
              alt={about.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-3 rounded-2xl bg-peach px-5 py-4 font-heading text-peach-foreground shadow-lg sm:-right-4">
            <strong className="block text-3xl leading-none">12+</strong>
            <span className="text-sm">years serving the neighbourhood</span>
          </div>
        </div>
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="Our story"
            title="A small shop with a big love for fresh food"
          />
          <p className="mt-4 text-muted-foreground">
            {site.name} started in {site.since} as a single fruit stand on the corner. Today we&apos;re a
            family-run grocery that still hand-picks every crate and knows most customers by name.
          </p>
          <p className="mt-3 text-muted-foreground">
            We work directly with local farms and bakers, so the food on our shelves is fresher,
            tastier and kinder to the planet.
          </p>
          <dl className="mt-8 flex flex-wrap gap-8">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-3xl font-bold text-primary">{stat.value}</dd>
                <dd className="text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
