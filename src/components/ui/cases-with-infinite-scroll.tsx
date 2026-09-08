import { useEffect, useMemo, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import servicesData from "@/data/services.json";
import type { StaticImageData } from 'next/image';
import puppyTraining from '@/assets/puppy-training.jpg';
import advancedTraining from '@/assets/advanced-training.jpg';
import familyDog from '@/assets/family-dog.jpg';
import behaviorTraining from '@/assets/behavior-training.jpg';
import teamTraining from '@/assets/team-training.jpg';

type Service = {
  id: string;
  title: string;
  summary?: string;
  badge?: string;
  href?: string;
  image?: string | StaticImageData;
};

// Map service IDs to imported images
const imageMap: Record<string, StaticImageData> = {
  'puppy-foundations': puppyTraining,
  'basic-obedience': advancedTraining,
  'advanced-obedience': advancedTraining,
  'expert-obedience': behaviorTraining,
  'offleash-basic': familyDog,
  'offleash-advanced': advancedTraining,
  'aggression-management': behaviorTraining,
  'leash-reactivity': behaviorTraining,
  'separation-anxiety': puppyTraining,
  'service-animal': teamTraining,
  'therapy-dog': familyDog,
  'board-and-train': teamTraining,
};

function Case() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const services: Service[] = useMemo(
    () => (Array.isArray(servicesData?.services) ? servicesData.services.map(svc => ({
      ...svc,
      image: imageMap[svc.id] || puppyTraining
    })) : []),
    []
  );

  useEffect(() => {
    if (!api || services.length === 0) return;

    const timer = setTimeout(() => {
      const lastIndex = api.scrollSnapList().length - 1;
      const isLast = api.selectedScrollSnap() === lastIndex;

      if (isLast) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent((c) => c + 1);
      }
    }, 3600);

    return () => clearTimeout(timer);
  }, [api, current, services.length]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Proven training programs for real behavior change
          </h2>

          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {services.map((svc) => (
                <CarouselItem
                  key={svc.id}
                  className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                  style={{ minWidth: '320px' }}
                  data-testid={`carousel-item-${svc.id}`}
                >
                  <Card className="h-full overflow-hidden">
                    {svc.image ? (
                      <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
                        <img
                          src={typeof svc.image === 'string' ? svc.image : svc.image.src}
                          alt={svc.title}
                          className="w-full h-full object-cover"
                          data-testid={`img-${svc.id}`}
                        />
                      </div>
                    ) : (
                      <div style={{ aspectRatio: '3/2' }} className="bg-muted" />
                    )}
                    <CardHeader className="p-4">
                      <CardTitle className="text-base font-semibold tracking-tight" data-testid={`title-${svc.id}`}>
                        {svc.title}
                      </CardTitle>
                      {svc.badge ? (
                        <span className="mt-1 inline-flex w-fit rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground" data-testid={`badge-${svc.id}`}>
                          {svc.badge}
                        </span>
                      ) : null}
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {svc.summary ? (
                        <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`summary-${svc.id}`}>
                          {svc.summary}
                        </p>
                      ) : null}

                      {svc.href ? (
                        <a
                          href={svc.href}
                          className="mt-3 inline-flex text-sm underline underline-offset-4"
                          data-testid={`link-${svc.id}`}
                        >
                          See program
                        </a>
                      ) : null}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Case };
