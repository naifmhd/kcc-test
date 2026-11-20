import { SiteHeader } from "@/components/sections/site-header";
import { HeroSlider } from "@/components/sections/hero-slider";
import { Highlights } from "@/components/sections/highlights";
import { Categories } from "@/components/sections/categories";
import { Offers } from "@/components/sections/offers";
import { About } from "@/components/sections/about";
import { VisitUs } from "@/components/sections/visit-us";
import { Feedback } from "@/components/sections/feedback";
import { SiteFooter } from "@/components/sections/site-footer";
import { hours, site } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
  },
  openingHoursSpecification: hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.schema,
    opens: h.opens,
    closes: h.closes,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="top">
        <HeroSlider />
        <Highlights />
        <Categories />
        <Offers />
        <About />
        <VisitUs />
        <Feedback />
      </main>
      <SiteFooter />
    </>
  );
}
