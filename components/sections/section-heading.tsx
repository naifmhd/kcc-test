import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, center, id }: Props) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
