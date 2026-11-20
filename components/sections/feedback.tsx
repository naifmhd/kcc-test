import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { FeedbackForm } from "@/components/sections/feedback-form";
import { feedbackImage } from "@/lib/data";

export function Feedback() {
  return (
    <section id="feedback" aria-labelledby="feedback-title" className="scroll-mt-16 px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            id="feedback-title"
            eyebrow="Feedback"
            title="We'd love to hear from you"
            description="Loved something? Missing a product? Tell us. We read every message and reply within 2 days."
          />
          <div className="relative mt-8 hidden aspect-4/5 overflow-hidden rounded-3xl bg-muted lg:block">
            <Image
              src={feedbackImage.image}
              alt={feedbackImage.alt}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>
        <FeedbackForm />
      </div>
    </section>
  );
}
