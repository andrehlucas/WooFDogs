"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { getAttributionForSubmission } from "@/lib/marketingAttribution";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingModal } from "@/contexts/BookingModalContext";

const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, "");
  const phoneNumberLength = phoneNumber.length;
  
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const dogSchema = z.object({
  name: z.string().min(1, "Dog's name is required"),
  strangerReaction: z.string().min(1, "Please select a reaction type"),
  info: z.string().min(10, "Please tell us a bit more about your dog"),
});

const bookingFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length === 10;
    }, "Please enter a valid 10-digit US phone number"),
  zipCode: z
    .string()
    .min(1, "Zip code is required")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length === 5;
    }, "Please enter a valid 5-digit zip code"),
  dogs: z.array(dogSchema).min(1, "At least one dog is required"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

function getSubmissionStatusMessage(dogNames: string[]) {
  if (dogNames.length === 0) {
    return "We're preparing information about your dog. Please wait a moment.";
  }

  if (dogNames.length === 1) {
    return `We're preparing information about ${dogNames[0]}. Please wait a moment.`;
  }

  return `We're preparing information for ${dogNames.join(", ")}. Please wait a moment.`;
}

export function BookingEvaluationModal() {
  const { isOpen, closeModal, submittedFrom } = useBookingModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recoveryPending, setRecoveryPending] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [submittedDogNames, setSubmittedDogNames] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipCode: "",
      dogs: [{ name: "", strangerReaction: "", info: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "dogs",
  });

  const hasUnsavedData = () => {
    const values = form.getValues();
    const hasContactInfo = values.firstName || values.lastName || values.email || values.phone || values.zipCode;
    const hasDogInfo = values.dogs.some(dog => dog.name || dog.strangerReaction || dog.info);
    return hasContactInfo || hasDogInfo;
  };

  const handleAttemptClose = () => {
    if (isSubmitted) {
      handleClose();
      return;
    }
    if (hasUnsavedData()) {
      setShowConfirmDialog(true);
    } else {
      handleClose();
    }
  };

  const submitLeadMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      const attribution = getAttributionForSubmission();
      
      const dogNames = data.dogs.map(d => d.name).filter(Boolean).join(", ");
      const strangerReaction = data.dogs[0]?.strangerReaction || null;
      
      const dogDetails = data.dogs
        .filter(d => d.name)
        .map(d => {
          const parts = [`Dog: ${d.name}`];
          if (d.strangerReaction) parts.push(`Stranger Reaction: ${d.strangerReaction}`);
          if (d.info) parts.push(`Info: ${d.info}`);
          return parts.join('\n');
        })
        .join("\n\n") || null;
      
      return apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          phone: data.phone,
          zipCode: data.zipCode,
          dogName: dogNames,
          strangerReaction: strangerReaction || null,
          message: dogDetails,
          source: attribution.source || 'direct',
          medium: attribution.medium || 'none',
          campaign: attribution.campaign || null,
          landingPage: attribution.landingPage || window.location.pathname,
          firstVisit: attribution.firstVisit || new Date().toISOString(),
          utmContent: attribution.utmContent || null,
          utmTerm: attribution.utmTerm || null,
          gclid: attribution.gclid || null,
          wbraid: attribution.wbraid || null,
          gbraid: attribution.gbraid || null,
          msclkid: attribution.msclkid || null,
          submittedFrom: submittedFrom || window.location.pathname,
        }),
      });
    },
    onSuccess: (result: { recoveryPending?: boolean }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
      setRecoveryPending(result.recoveryPending === true);
      setIsSubmitted(true);
      
      // Push event to dataLayer for GTM/Google Ads conversion tracking
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'form_submission',
          form_id: 'booking_evaluation_modal',
          form_name: 'Book Your Evaluation',
          page_path: window.location.pathname,
          page_url: window.location.href,
        });
      }
      
      toast({
        title: result.recoveryPending ? "Request received" : "Success!",
        description: result.recoveryPending
          ? "We received your request and our team will follow up shortly."
          : "We'll contact you in the next business day.",
      });
    },
    onError: (error: Error) => {
      setSubmittedDogNames([]);
      toast({
        title: "Error",
        description: error.message || "Failed to submit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    setSubmittedDogNames(data.dogs.map((dog) => dog.name.trim()).filter(Boolean));
    submitLeadMutation.mutate(data);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setRecoveryPending(false);
    setShowConfirmDialog(false);
    setSubmittedDogNames([]);
    form.reset();
    closeModal();
  };

  const handleCreateAccount = () => {
    window.open("https://woofdogs.portal.gingrapp.com/#/public/login", "_blank");
    handleClose();
  };

  const addDog = () => {
    append({ name: "", strangerReaction: "", info: "" });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleAttemptClose(); }}>
        <DialogContent 
          className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto p-5 sm:p-6 gap-3 sm:gap-4 mx-2"
          onInteractOutside={(e) => { e.preventDefault(); handleAttemptClose(); }}
          onEscapeKeyDown={(e) => { e.preventDefault(); handleAttemptClose(); }}
        >
          {!isSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold" data-testid="text-modal-title">
                  Book Your Evaluation
                </DialogTitle>
                <DialogDescription className="text-sm" data-testid="text-modal-description">
                  Tell us about your dog and preferred times. Our team will contact you back in the next business day.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" data-testid="form-booking-modal">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              autoComplete="given-name"
                              {...field}
                              data-testid="input-modal-first-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              autoComplete="family-name"
                              {...field}
                              data-testid="input-modal-last-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            autoComplete="email"
                            {...field}
                            data-testid="input-modal-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              inputMode="numeric"
                              placeholder="(555) 123-4567"
                              autoComplete="tel"
                              {...field}
                              onChange={(e) => {
                                const formatted = formatPhoneNumber(e.target.value);
                                field.onChange(formatted);
                              }}
                              data-testid="input-modal-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              inputMode="numeric"
                              placeholder="12345"
                              autoComplete="postal-code"
                              maxLength={5}
                              {...field}
                              data-testid="input-modal-zip-code"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold">Your Dogs</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addDog}
                        className="text-sm"
                        data-testid="button-add-dog"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Dog
                      </Button>
                    </div>

                    {fields.map((field, index) => (
                      <div 
                        key={field.id} 
                        className="border rounded-lg p-4 space-y-4 relative"
                        data-testid={`dog-entry-${index}`}
                      >
                        {fields.length > 1 && (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Dog {index + 1}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => remove(index)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                              data-testid={`button-remove-dog-${index}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}

                        <FormField
                          control={form.control}
                          name={`dogs.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dog's Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your dog's name"
                                  {...field}
                                  data-testid={`input-dog-name-${index}`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`dogs.${index}.strangerReaction`}
                          render={({ field }) => {
                            const dogName = form.watch(`dogs.${index}.name`);
                            return (
                              <FormItem>
                                <FormLabel>
                                  How does{" "}
                                  {dogName ? (
                                    <span className="text-[hsl(0,84%,60%)]">{dogName}</span>
                                  ) : (
                                    "your dog"
                                  )}{" "}
                                  react to a stranger coming to your house?
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid={`select-stranger-reaction-${index}`}>
                                      <SelectValue placeholder="Select a reaction" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="friendly-welcoming" data-testid={`option-friendly-welcoming-${index}`}>
                                      Friendly and welcoming
                                    </SelectItem>
                                    <SelectItem value="excited-jumps" data-testid={`option-excited-jumps-${index}`}>
                                      Excited and jumps on them
                                    </SelectItem>
                                    <SelectItem value="barks-calm" data-testid={`option-barks-calm-${index}`}>
                                      Barks but stays calm
                                    </SelectItem>
                                    <SelectItem value="barks-aggressively" data-testid={`option-barks-aggressively-${index}`}>
                                      Barks aggressively
                                    </SelectItem>
                                    <SelectItem value="hides-runs" data-testid={`option-hides-runs-${index}`}>
                                      Hides or runs away
                                    </SelectItem>
                                    <SelectItem value="indifferent" data-testid={`option-indifferent-${index}`}>
                                      Indifferent/ignores them
                                    </SelectItem>
                                    <SelectItem value="nervous-shy" data-testid={`option-nervous-shy-${index}`}>
                                      Nervous and/or Shy
                                    </SelectItem>
                                    <SelectItem value="growls-teeth" data-testid={`option-growls-teeth-${index}`}>
                                      Growls or shows teeth
                                    </SelectItem>
                                    <SelectItem value="protective-controlled" data-testid={`option-protective-controlled-${index}`}>
                                      Protective but controlled
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />

                        <FormField
                          control={form.control}
                          name={`dogs.${index}.info`}
                          render={({ field }) => {
                            const dogName = form.watch(`dogs.${index}.name`);
                            return (
                              <FormItem>
                                <FormLabel>
                                  Tell us about {dogName ? <span className="text-[hsl(0,84%,60%)]">{dogName}</span> : "your dog"}
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Breed, age, goals, and any concerns..."
                                    rows={3}
                                    className="resize-none"
                                    {...field}
                                    data-testid={`textarea-dog-info-${index}`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    disabled={submitLeadMutation.isPending}
                    className="w-full h-11 text-base bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]"
                    size="lg"
                    data-testid="button-modal-submit"
                  >
                    {submitLeadMutation.isPending ? "Submitting..." : "Schedule Evaluation"}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>

                  {submitLeadMutation.isPending && (
                    <p
                      className="text-sm text-muted-foreground text-center"
                      role="status"
                      aria-live="polite"
                      data-testid="text-evaluation-submission-status"
                    >
                      {getSubmissionStatusMessage(submittedDogNames)}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-muted-foreground text-center" data-testid="text-modal-privacy">
                    By submitting, you agree to be contacted about scheduling via phone, email, or text message. We never share your information.
                  </p>
                </form>
              </Form>
            </>
          ) : (
            <div className="py-6 sm:py-8 text-center" data-testid="container-success">
              <DialogHeader className="sr-only">
                <DialogTitle>Submission Successful</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center mb-4 sm:mb-6">
                <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" data-testid="icon-success" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 px-2" data-testid="text-success-title">
                We'll Be In Touch Soon!
              </h3>
              
              <p className="text-foreground text-base sm:text-lg mb-4 sm:mb-6 px-4" data-testid="text-success-message">
                {recoveryPending
                  ? "We received your request and our team will follow up shortly."
                  : "We'll contact you in the next business day."}
              </p>
              
              <div className="bg-gray border border-primary/20 rounded-lg p-4 sm:p-5 mb-5 sm:mb-6 mx-2 sm:mx-0">
                <p className="text-base sm:text-lg text-foreground font-semibold text-primary mb-2">
                  Don't want to wait? Create an account now!
                </p>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Create an account to add your dog's profile and schedule your evaluation.
                </p>
              </div>
              
              <div className="space-y-3 px-2 sm:px-0">
                <Button
                  onClick={handleCreateAccount}
                  className="w-full h-11 sm:h-12 text-base sm:text-lg bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]"
                  size="lg"
                  data-testid="button-create-account"
                >
                  Create Account
                  <ArrowRight className="ml-2 flex-shrink-0" size={18} />
                </Button>
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  className="w-full h-11 sm:h-12 text-base sm:text-lg text-muted-foreground hover:text-foreground"
                  size="sm"
                  data-testid="button-close-success"
                >
                  I'll do this later
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent data-testid="confirm-close-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have entered information that hasn't been submitted. Are you sure you want to close? Your data will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-stay">Stay</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleClose}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-discard"
            >
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
