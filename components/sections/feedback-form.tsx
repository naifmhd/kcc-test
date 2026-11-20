"use client";

import { useState, useTransition } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, StarIcon } from "lucide-react";
import { toast } from "sonner";
import { submitFeedback } from "@/app/actions/feedback";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  feedbackCategories,
  feedbackSchema,
  MESSAGE_MAX,
  type FeedbackInput,
  type FeedbackValues,
} from "@/lib/schemas/feedback";

const defaultValues: FeedbackInput = {
  name: "",
  email: "",
  phone: "",
  rating: 0,
  category: undefined as unknown as FeedbackInput["category"],
  message: "",
  consent: false,
  website: "",
};

const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];

function StarRating({
  value,
  onChange,
  onBlur,
  invalid,
}: {
  value: number;
  onChange: (v: number) => void;
  onBlur: () => void;
  invalid: boolean;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex items-center gap-3" data-invalid={invalid || undefined}>
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className="cursor-pointer rounded-md p-0.5 has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
            onMouseEnter={() => setHover(n)}
          >
            <input
              type="radio"
              name="rating"
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              onBlur={onBlur}
              className="sr-only"
            />
            <StarIcon
              aria-hidden
              className={cn(
                "size-8 transition-transform hover:scale-110",
                n <= shown ? "fill-butter text-butter" : "fill-transparent text-input",
              )}
            />
            <span className="sr-only">
              {n} star{n > 1 ? "s" : ""}, {ratingLabels[n - 1]}
            </span>
          </label>
        ))}
      </div>
      <span className="text-sm text-muted-foreground" aria-hidden>
        {shown ? ratingLabels[shown - 1] : "Tap to rate"}
      </span>
    </div>
  );
}

export function FeedbackForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FeedbackInput, unknown, FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues,
    mode: "onTouched",
  });

  const messageLength = useWatch({ control: form.control, name: "message" })?.length ?? 0;

  function onSubmit(values: FeedbackValues) {
    startTransition(async () => {
      const result = await submitFeedback(values);

      if (result.ok) {
        toast.success("Thanks for your feedback!", {
          description: "We read every message and usually reply within 2 days.",
        });
        form.reset(defaultValues);
        return;
      }

      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        if (messages?.[0]) {
          form.setError(field as keyof FeedbackInput, { message: messages[0] });
        }
      }
      toast.error("Couldn't send your feedback", { description: result.message });
    });
  }

  return (
    <Card className="py-0 shadow-xl shadow-black/5">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate aria-label="Feedback form">
          <FieldGroup className="gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fb-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="fb-name"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={fieldState.error ? "fb-name-error" : undefined}
                      className="h-10"
                    />
                    <FieldError id="fb-name-error" errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fb-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="fb-email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={fieldState.error ? "fb-email-error" : undefined}
                      className="h-10"
                    />
                    <FieldError id="fb-email-error" errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fb-phone">
                      Phone <span className="font-normal text-muted-foreground">(optional)</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="fb-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 000-0000"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={fieldState.error ? "fb-phone-error" : undefined}
                      className="h-10"
                    />
                    <FieldError id="fb-phone-error" errors={[fieldState.error]} />
                  </Field>
                )}
              />
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fb-category">Category</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value ?? null}
                      onValueChange={(v) => {
                        field.onChange(v);
                        field.onBlur();
                      }}
                      items={feedbackCategories.map((c) => ({ value: c, label: c }))}
                    >
                      <SelectTrigger
                        id="fb-category"
                        aria-invalid={fieldState.invalid}
                        aria-describedby={fieldState.error ? "fb-category-error" : undefined}
                        className="h-10 w-full"
                      >
                        <SelectValue placeholder="Choose a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {feedbackCategories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError id="fb-category-error" errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>

            <Controller
              name="rating"
              control={form.control}
              render={({ field, fieldState }) => (
                <FieldSet data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLegend variant="label">Your rating</FieldLegend>
                  <StarRating
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    invalid={fieldState.invalid}
                  />
                  <FieldError errors={[fieldState.error]} />
                </FieldSet>
              )}
            />

            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="fb-message">Message</FieldLabel>
                  <Textarea
                    {...field}
                    id="fb-message"
                    rows={5}
                    maxLength={MESSAGE_MAX}
                    placeholder="Tell us about your experience…"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={`fb-message-count${fieldState.error ? " fb-message-error" : ""}`}
                    className="min-h-32"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <FieldError id="fb-message-error" errors={[fieldState.error]} />
                    <FieldDescription id="fb-message-count" className="ml-auto shrink-0 tabular-nums">
                      {messageLength} / {MESSAGE_MAX}
                    </FieldDescription>
                  </div>
                </Field>
              )}
            />

            <Controller
              name="consent"
              control={form.control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id="fb-consent"
                    name={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor="fb-consent" className="font-normal text-muted-foreground">
                    I agree to be contacted about my feedback
                  </FieldLabel>
                </Field>
              )}
            />

            {/* Honeypot: hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="fb-website">Website</label>
              <input id="fb-website" tabIndex={-1} autoComplete="off" {...form.register("website")} />
            </div>

            <Button type="submit" size="lg" disabled={isPending} className="h-11 w-full text-base">
              {isPending ? (
                <>
                  <Loader2Icon className="animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                "Send feedback"
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
