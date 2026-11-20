import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";
import { hours, site } from "@/lib/data";

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPinIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

export function VisitUs() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;

  return (
    <section id="visit" aria-labelledby="visit-title" className="scroll-mt-16 bg-muted px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="visit-title"
          center
          eyebrow="Visit us"
          title="Come say hello"
          description="We're right around the corner, with free parking out front."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card className="py-0">
            <CardContent className="flex flex-col gap-6 p-7">
              <InfoRow icon={MapPinIcon} title="Address">
                <address className="not-italic">
                  {site.address.street}, {site.address.city}
                </address>
              </InfoRow>
              <InfoRow icon={PhoneIcon} title="Phone">
                <a href={site.phoneHref} className="hover:text-primary">{site.phone}</a>
              </InfoRow>
              <InfoRow icon={MailIcon} title="Email">
                <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
              </InfoRow>
              <InfoRow icon={ClockIcon} title="Opening hours">
                <table className="mt-1 w-full">
                  <tbody>
                    {hours.map((h) => (
                      <tr key={h.days}>
                        <th scope="row" className="py-0.5 text-left font-normal">{h.days}</th>
                        <td className="py-0.5 text-right font-medium text-foreground">{h.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </InfoRow>
            </CardContent>
          </Card>
          <div className="min-h-80 overflow-hidden rounded-2xl border bg-card">
            <iframe
              title={`Map showing ${site.name}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-80 w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
