import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { categories } from "@/lib/data";

export function Categories() {
  return (
    <section id="products" aria-labelledby="products-title" className="scroll-mt-16 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="products-title"
          center
          eyebrow="What we stock"
          title="Shop by category"
          description="Everything you need for the week, in one friendly little shop around the corner."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <li key={cat.title}>
              <Card className="group h-full gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
                <div className="relative aspect-4/3 overflow-hidden bg-muted">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{cat.title}</h3>
                    <span className="text-xs font-semibold text-primary">{cat.count}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.text}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
