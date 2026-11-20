import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { offers } from "@/lib/data";

export function Offers() {
  return (
    <section id="offers" aria-labelledby="offers-title" className="scroll-mt-16 bg-muted px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="offers-title"
          eyebrow="Weekly offers"
          title="This week's fresh deals"
          description="Prices valid Monday to Sunday while stocks last."
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <li key={offer.title}>
              <Card className="h-full gap-0 overflow-hidden py-0">
                <div className="relative aspect-16/10 bg-background">
                  <Image
                    src={offer.image}
                    alt={offer.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <Badge className="absolute top-3 left-3 h-6 bg-peach px-2.5 font-bold text-peach-foreground uppercase">
                    {offer.badge}
                  </Badge>
                </div>
                <CardContent className="flex items-end justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-semibold">{offer.title}</h3>
                    <p className="mt-1 font-heading text-2xl font-bold text-primary">
                      {offer.price}
                      <s className="ml-2 font-sans text-sm font-medium text-muted-foreground">
                        <span className="sr-only">was </span>
                        {offer.was}
                      </s>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
