import { BikeIcon, LeafIcon, SproutIcon, TagIcon } from "lucide-react";
import { highlights } from "@/lib/data";

const icons = { leaf: LeafIcon, sprout: SproutIcon, tag: TagIcon, bike: BikeIcon };

export function Highlights() {
  return (
    <section aria-label="Why shop with us" className="relative z-10 -mt-14 px-4">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-lg shadow-black/5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
