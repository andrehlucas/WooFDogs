export interface CityPageData {
  slug: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  heroTagline: string;
  introText: string;
  localDescription: string;
  nearbyAreas: string[];
  testimonials: {
    quote: string;
    author: string;
    dog: string;
    source: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  napStatement: string;
}

export const CITY_PAGES: CityPageData[] = [
  {
    slug: "dog-training-boca-raton",
    cityName: "Boca Raton",
    metaTitle: "Dog Training in Boca Raton, FL",
    metaDescription: "Expert dog training in Boca Raton for obedience, aggression & puppy problems. 30+ years experience, in-home & facility sessions. Free phone consultation.",
    heroTagline: "Trusted by Boca Raton families for over a decade",
    introText: "Boca Raton dog owners dealing with leash pulling, aggression, reactivity, or puppy challenges trust WooF Dogs for real, lasting results. We serve East Boca, West Boca, Boca Falls, Boca Bridges, and surrounding communities with certified in-home sessions and immersive board-and-train programs at our Loxahatchee facility, just 30 minutes away. Lead trainer Shay Maimoni brings 30+ years of experience — including military K9 and police dog training — to every case. Book your free consultation today.",
    localDescription: "From the bustling sidewalks of Palmetto Park Road to the dog-friendly trails at Patch Reef Park and Sugar Sand Park, Boca Raton offers plenty of environments where a well-trained dog can truly shine. Our programs prepare your dog to be calm, confident, and well-mannered in every setting — from outdoor dining at Royal Palm Place to walks along the Intracoastal.",
    nearbyAreas: ["Deerfield Beach", "Delray Beach", "Coconut Creek", "Parkland", "Highland Beach"],
    testimonials: [
      {
        quote: "We live in East Boca and our Golden was a handful on walks near the Intracoastal. After just 6 sessions with WooF Dogs, she heels perfectly and ignores distractions. Neighbors keep asking what changed!",
        author: "Rachel S.",
        dog: "Sunny, Golden Retriever",
        source: "Google Review"
      },
      {
        quote: "Our rescue had severe anxiety living in our Boca condo. Shay's patience and expertise gave our dog confidence we didn't think was possible. Truly life-changing for our whole family.",
        author: "David & Maria L.",
        dog: "Coco, Mixed Breed",
        source: "Google Review"
      },
      {
        quote: "We needed service animal training for our son's support dog. The professionalism, knowledge, and genuine care from the WooF Dogs team exceeded every expectation.",
        author: "Jennifer K.",
        dog: "Scout, Labrador",
        source: "Google Review"
      }
    ],
    faqs: [
      {
        question: "Do you offer in-home dog training in Boca Raton?",
        answer: "Yes! We provide in-home training throughout Boca Raton, including East Boca, West Boca, Boca Falls, Boca Bridges, and all surrounding neighborhoods. In-home training lets us address real-world behaviors in the environment where they happen most."
      },
      {
        question: "How much does dog training cost in Boca Raton?",
        answer: "Our programs vary depending on goals, training modality, and the number of sessions. Every journey begins with a professional evaluation where we assess your dog and recommend a plan. Contact us for a free phone consultation to discuss pricing."
      },
      {
        question: "Do you train aggressive or reactive dogs in Boca Raton?",
        answer: "Yes, aggression and reactivity management is one of our specialties. Our lead trainer Shay Maimoni has over 30 years of experience working with reactive and aggressive dogs, including former military and police K9 experience. We use safe, balanced methods to address the root causes — not just the symptoms."
      },
      {
        question: "How long does it take to train a dog in Boca Raton?",
        answer: "Training timelines depend on your dog's age, temperament, and your goals. Most families see significant progress within 4–8 weeks of consistent training. Puppies may need a longer foundation period, while behavioral issues like aggression may require a more intensive approach such as our board-and-train bootcamp."
      },
      {
        question: "What types of dog training do you offer in Boca Raton?",
        answer: "We offer obedience training (basic through expert off-leash), puppy training, service animal training, therapy dog preparation, aggression management, and board-and-train programs. We customize every plan to your dog's needs and your lifestyle."
      },
      {
        question: "Can you train my puppy in Boca Raton?",
        answer: "Absolutely! We start puppy training as early as 8 weeks old. Our age-appropriate curriculum covers potty training, bite inhibition, socialization, crate training, and foundational obedience. Early training sets your puppy up for lifelong success."
      },
      {
        question: "What areas near Boca Raton do you serve?",
        answer: "In addition to all of Boca Raton, we serve Deerfield Beach, Delray Beach, Coconut Creek, Parkland, Highland Beach, and the greater South Palm Beach County area."
      },
      {
        question: "Do you offer board-and-train programs for Boca Raton dogs?",
        answer: "Yes! Our board-and-train (bootcamp) program takes place at our facility in Loxahatchee. Your dog stays with our professional trainers for an immersive training experience, then we transfer all skills back to you with owner coaching sessions."
      }
    ],
    napStatement: "WooF Dogs is located at 4200 Global Trail, Loxahatchee, FL 33470. We proudly serve Boca Raton and all of Palm Beach County. Call us at (561) 594-4111 or email office@woofdogs.com."
  },
  {
    slug: "dog-training-wellington",
    cityName: "Wellington",
    metaTitle: "Dog Training in Wellington, FL",
    metaDescription: "Professional dog training in Wellington, FL for obedience, aggression & puppies. Certified trainers, in-home & facility options. Free phone consultation.",
    heroTagline: "Wellington's trusted dog training professionals",
    introText: "Wellington dog owners dealing with leash reactivity, aggression, off-leash challenges, or puppy behavior trust WooF Dogs to deliver proven results. Whether your dog struggles around horses, in neighborhood parks, or on your acreage, our certified trainers provide customized in-home sessions and intensive board-and-train programs at our nearby Loxahatchee facility. Lead trainer Shay Maimoni's 30+ years of experience — including military K9 and police work — builds the reliable, well-mannered dog Wellington life demands. Book your free consultation today.",
    localDescription: "Wellington's large lots, horse trails, and family-friendly parks like Village Park and Tiger Shark Cove create both opportunities and challenges for dog owners. We help your dog navigate these environments with confidence — whether it's staying calm around horses, greeting joggers politely, or mastering off-leash reliability in your backyard.",
    nearbyAreas: ["Royal Palm Beach", "Loxahatchee", "Greenacres", "Lake Worth", "Palm Beach Gardens"],
    testimonials: [
      {
        quote: "Living on acreage in Wellington, we needed our dog to be reliable off-leash around horses and wildlife. WooF Dogs got us there safely and systematically. Couldn't be happier.",
        author: "Tom & Linda R.",
        dog: "Duke, Belgian Malinois",
        source: "Google Review"
      },
      {
        quote: "Our two-year-old Lab was a complete tornado. After the bootcamp program, he came back a gentleman. The transition sessions made sure we could maintain everything at home.",
        author: "Christine M.",
        dog: "Bentley, Labrador Retriever",
        source: "Google Review"
      },
      {
        quote: "Shay understood our Shepherd's reactivity immediately. His military background gives him a calm authority that dogs respond to. Our walks through the neighborhood are finally enjoyable.",
        author: "Mark P.",
        dog: "Zeus, German Shepherd",
        source: "Google Review"
      }
    ],
    faqs: [
      {
        question: "Do you offer in-home dog training in Wellington?",
        answer: "Yes! We provide in-home private training sessions throughout Wellington, including The Isles, Olympia, Palm Beach Polo, Versailles, and all surrounding neighborhoods. In-home training lets us address real behaviors in the exact environment where they occur — no commute required."
      },
      {
        question: "How much does dog training cost in Wellington?",
        answer: "Pricing depends on the program type and your goals. We start every client with a professional evaluation to assess your dog and recommend the best approach. Call us for a free phone consultation to discuss options and get a clear picture of investment."
      },
      {
        question: "Do you train aggressive or reactive dogs in Wellington?",
        answer: "Absolutely. Aggression and reactivity management is a core specialty. Our lead trainer Shay Maimoni has 30+ years of experience — including military K9 and police training — and uses safe, structured methods to identify the root cause of aggression and build genuine confidence in your dog."
      },
      {
        question: "How long does dog training take in Wellington?",
        answer: "Most Wellington families see meaningful improvement within 4–8 weeks of consistent training. Dogs with more complex behavioral issues — reactivity, aggression, severe anxiety — often benefit from our intensive board-and-train bootcamp, which accelerates progress significantly."
      },
      {
        question: "Can you help with a dog that's reactive to horses in Wellington?",
        answer: "Absolutely. Given Wellington's equestrian community, this is a common request. We use controlled desensitization and structured obedience to teach your dog to remain calm and focused around horses and other large animals."
      },
      {
        question: "Is your training facility close to Wellington?",
        answer: "Our main facility is at 4200 Global Trail in Loxahatchee, just a short drive from most Wellington neighborhoods. Many Wellington clients also choose our convenient in-home training option so their dog learns in the environment where it matters most."
      },
      {
        question: "What dog training services do you offer in Wellington?",
        answer: "We offer obedience training (all levels), puppy training, service animal training, therapy dog preparation, aggression management, and immersive board-and-train bootcamp programs. Every plan is customized to your dog and your lifestyle."
      },
      {
        question: "Do you train large breed dogs in Wellington?",
        answer: "Yes, we work with all breeds and sizes. Our lead trainer has extensive experience with large and working breeds, including German Shepherds, Belgian Malinois, Rottweilers, and more — common in Wellington's active, outdoors-oriented community."
      }
    ],
    napStatement: "WooF Dogs is located at 4200 Global Trail, Loxahatchee, FL 33470 — just minutes from Wellington. We serve all of Wellington and surrounding Palm Beach County. Call (561) 594-4111 or email office@woofdogs.com."
  },
  {
    slug: "dog-training-loxahatchee",
    cityName: "Loxahatchee",
    metaTitle: "Dog Training in Loxahatchee, FL",
    metaDescription: "Expert dog training in Loxahatchee at our local facility. Obedience, aggression, board & train, puppies. 30+ years experience. Free phone consultation.",
    heroTagline: "Your local Loxahatchee dog training experts",
    introText: "WooF Dogs is based right here in Loxahatchee at 4200 Global Trail — your true local dog training resource. Whether your dog needs obedience work, aggression management, off-leash reliability on large properties, or an intensive board-and-train experience, our certified team is ready. Dogs here face unique challenges: wildlife distractions, expansive spaces, and rural stimuli that demand reliable, proofed training. Lead trainer Shay Maimoni brings 30+ years of expertise including military K9 work. Book a free phone consultation today.",
    localDescription: "Loxahatchee's countryside setting means dogs need to be reliable around wildlife, livestock, and wide-open spaces. Whether you live off Seminole Pratt Whitney Road, near the Acreage, or in the Loxahatchee Groves area, our training programs are designed for the unique challenges of rural and semi-rural dog ownership — from recall reliability on large properties to calm behavior around other animals.",
    nearbyAreas: ["Wellington", "Royal Palm Beach", "The Acreage", "Palm Beach Gardens", "West Palm Beach"],
    testimonials: [
      {
        quote: "Having WooF Dogs right here in Loxahatchee is a blessing. My two rescues went through the bootcamp and came back like different dogs. The follow-up sessions at home sealed the deal.",
        author: "Karen W.",
        dog: "Buddy & Sadie, Mixed Breeds",
        source: "Google Review"
      },
      {
        quote: "We needed our Husky to be reliable off-leash on our 5-acre property. Shay's team made it happen step by step. The training was thorough, and the results are rock-solid.",
        author: "Jason D.",
        dog: "Koda, Siberian Husky",
        source: "Google Review"
      },
      {
        quote: "The puppy training program gave our family a head start. By 5 months old, our pup was already responding to commands better than our neighbor's adult dog. Highly recommend!",
        author: "Amy & Rob T.",
        dog: "Maple, Australian Shepherd",
        source: "Google Review"
      }
    ],
    faqs: [
      {
        question: "Do you offer in-home dog training in Loxahatchee?",
        answer: "Yes! In addition to our facility-based programs right here in Loxahatchee, we offer in-home private training sessions throughout the area — including The Acreage, Loxahatchee Groves, and all surrounding neighborhoods. In-home training is ideal for addressing behaviors in the real-world environment where they happen."
      },
      {
        question: "How much does dog training cost in Loxahatchee?",
        answer: "Program pricing varies based on your goals and the training format. We always start with a professional evaluation so we can recommend the best plan and give you an accurate investment picture. Call (561) 594-4111 for a free phone consultation."
      },
      {
        question: "Do you train aggressive or reactive dogs in Loxahatchee?",
        answer: "Yes, aggression and reactivity management is a core specialty. Our lead trainer Shay Maimoni has 30+ years of experience, including military K9 work, and uses safe, structured methods to help dogs overcome aggression, reactivity, fear, and behavioral challenges — even in challenging rural environments."
      },
      {
        question: "How long does dog training take in Loxahatchee?",
        answer: "Most families see meaningful improvement within 4–8 weeks of consistent training. For dogs with off-leash goals, complex behaviors, or aggression issues, our intensive board-and-train bootcamp right here at our Loxahatchee facility can accelerate results significantly."
      },
      {
        question: "Where is WooF Dogs located in Loxahatchee?",
        answer: "We are located at 4200 Global Trail, Loxahatchee, FL 33470. Our facility features spacious training grounds ideal for all levels of obedience work, from basic foundations to advanced off-leash training in a real rural environment."
      },
      {
        question: "Do you offer board-and-train at your Loxahatchee facility?",
        answer: "Yes! Our board-and-train program is run right here at our Loxahatchee facility. Dogs stay with our professional trainers for an immersive experience, followed by review and owner transfer sessions to ensure lasting results at home."
      },
      {
        question: "Can you train my dog to be reliable off-leash on a large property?",
        answer: "Absolutely. Many of our Loxahatchee clients have acreage and need off-leash reliability. We build this skill progressively — from controlled environments to full off-leash freedom with distraction proofing around wildlife, livestock, and other real-world triggers."
      },
      {
        question: "What types of training do you offer in Loxahatchee?",
        answer: "We offer the full range: obedience training (basic to expert off-leash), puppy training, service animal training, therapy dog preparation, aggression management, and our intensive board-and-train bootcamp programs — all customized to your dog's needs."
      }
    ],
    napStatement: "WooF Dogs is proudly based at 4200 Global Trail, Loxahatchee, FL 33470. We are your local training experts serving Loxahatchee and all of Palm Beach County. Call (561) 594-4111 or email office@woofdogs.com."
  },
  {
    slug: "dog-training-west-palm-beach",
    cityName: "West Palm Beach",
    metaTitle: "Dog Training in West Palm Beach, FL",
    metaDescription: "Dog training in West Palm Beach for obedience, aggression & puppy issues. In-home sessions, 30+ years experience. Free phone consultation available.",
    heroTagline: "West Palm Beach's choice for professional dog training",
    introText: "West Palm Beach dog owners dealing with leash pulling, barking, reactivity, or aggressive behavior rely on WooF Dogs for structured, lasting results. We serve all West Palm Beach neighborhoods — downtown, Northwood, Flamingo Park, Palm Beach Lakes, SoSo, and beyond — with certified in-home sessions and board-and-train programs at our Loxahatchee facility. Lead trainer Shay Maimoni brings 30+ years of expertise, including military K9 and police dog training, to every case. Book your free phone consultation today.",
    localDescription: "From the bustling downtown Clematis Street scene to the relaxed waterfront paths along Flagler Drive, West Palm Beach demands a dog that's calm, social, and responsive. Our training programs prepare your dog for real-world situations — busy sidewalks, outdoor restaurants, dog parks, and encounters with other dogs and people throughout the city.",
    nearbyAreas: ["Palm Beach Gardens", "Lake Worth", "Riviera Beach", "Royal Palm Beach", "Greenacres"],
    testimonials: [
      {
        quote: "We adopted a rescue in West Palm Beach who was terrified of everything — people, other dogs, loud noises. After 3 months with WooF Dogs, she walks confidently through downtown. The transformation is incredible.",
        author: "Nicole & James F.",
        dog: "Rosie, Pit Bull Mix",
        source: "Google Review"
      },
      {
        quote: "Living in a downtown WPB condo with a high-energy Aussie was chaos. WooF Dogs taught us how to channel his energy and gave us practical tools that actually work in an urban environment.",
        author: "Carlos M.",
        dog: "Blue, Australian Shepherd",
        source: "Google Review"
      },
      {
        quote: "The service dog training program was incredibly thorough. My PTSD service dog is now certified and performs flawlessly in public. I can't thank WooF Dogs enough for giving me my independence back.",
        author: "Veteran Brian H.",
        dog: "Shadow, German Shepherd",
        source: "Google Review"
      }
    ],
    faqs: [
      {
        question: "Do you offer in-home dog training in West Palm Beach?",
        answer: "Yes! We provide in-home training throughout West Palm Beach, including downtown, Northwood, SoSo, Flamingo Park, Palm Beach Lakes, and all surrounding neighborhoods. In-home training is ideal for addressing behaviors in the environment where they occur — with no travel required on your dog's part."
      },
      {
        question: "How much does dog training cost in West Palm Beach?",
        answer: "Pricing varies based on the program and your specific goals. Every client starts with a professional behavioral evaluation to assess your dog and determine the best approach. Contact us at (561) 594-4111 for a free phone consultation to discuss your needs and pricing options."
      },
      {
        question: "Do you train aggressive or reactive dogs in West Palm Beach?",
        answer: "Yes, aggression and reactivity management is one of our core specialties. Lead trainer Shay Maimoni has over 30 years of experience — including military K9 and police dog work — and uses safe, structured methods to address the root causes of aggression, not just manage symptoms."
      },
      {
        question: "How long does dog training take in West Palm Beach?",
        answer: "Most families see meaningful improvement within 4–8 weeks of consistent training. Dogs with more complex issues — aggression, severe reactivity, deep-rooted fears — often benefit from our intensive board-and-train bootcamp, which compresses months of progress into weeks at our Loxahatchee facility."
      },
      {
        question: "Can you help with apartment or condo dog training in West Palm Beach?",
        answer: "Absolutely. Many of our West Palm Beach clients live in condos and apartments. We specialize in teaching calm behavior in elevators, hallways, shared spaces, and on-leash manners for busy urban environments."
      },
      {
        question: "Can you train my puppy in West Palm Beach?",
        answer: "Yes! We begin puppy training as early as 8 weeks old. Our puppy program covers potty training, crate training, socialization, bite inhibition, and foundational obedience — all tailored to your puppy's age and development stage."
      },
      {
        question: "What areas near West Palm Beach do you serve?",
        answer: "In addition to West Palm Beach, we serve Palm Beach Gardens, Lake Worth, Riviera Beach, Royal Palm Beach, Greenacres, and all of Palm Beach County."
      },
      {
        question: "What dog training services are available in West Palm Beach?",
        answer: "We offer obedience training (basic to expert off-leash), puppy training, service animal training, therapy dog preparation, aggression management, and board-and-train bootcamp programs at our Loxahatchee facility."
      }
    ],
    napStatement: "WooF Dogs serves all of West Palm Beach from our facility at 4200 Global Trail, Loxahatchee, FL 33470. Call (561) 594-4111 or email office@woofdogs.com to get started."
  },
  {
    slug: "dog-training-delray-beach",
    cityName: "Delray Beach",
    metaTitle: "Dog Training in Delray Beach, FL",
    metaDescription: "Expert dog training in Delray Beach for obedience, aggression & puppy issues. 30+ years experience, in-home sessions. Free phone consultation available.",
    heroTagline: "Delray Beach families trust WooF Dogs",
    introText: "Delray Beach dog owners struggling with leash pulling, barking, reactivity, or puppy chaos trust WooF Dogs for lasting results. We serve all of Delray Beach — from the Atlantic Avenue corridor and Pineapple Grove to Tropic Isle and surrounding neighborhoods — with certified in-home sessions and intensive board-and-train programs at our nearby Loxahatchee facility. Lead trainer Shay Maimoni brings 30+ years of experience, including military K9 work, to every case. Book a free phone consultation to get started.",
    localDescription: "Whether you're enjoying brunch on Atlantic Avenue with your dog at your feet, visiting the Morikami Japanese Gardens, or walking the paths at Wakodahatchee Wetlands, Delray Beach living calls for a dog that's social, composed, and responsive. Our programs address the specific challenges of Delray life — from greeting other dogs on busy sidewalks to staying calm at outdoor dining spots.",
    nearbyAreas: ["Boca Raton", "Boynton Beach", "Lake Worth", "Highland Beach", "Lantana"],
    testimonials: [
      {
        quote: "Our Frenchie was impossible on Atlantic Ave — barking at every dog and person. After training with WooF Dogs, she sits quietly at outdoor cafés while we eat. Complete 180!",
        author: "Sarah & Matt B.",
        dog: "Lola, French Bulldog",
        source: "Google Review"
      },
      {
        quote: "We rescued a dog with fear aggression and were losing hope. WooF Dogs not only fixed the aggression but gave our dog genuine confidence. Professional, patient, and effective.",
        author: "Angela D.",
        dog: "Axel, Rottweiler Mix",
        source: "Google Review"
      },
      {
        quote: "The puppy training was excellent. Our Goldendoodle learned faster than we expected, and the trainers gave us homework that was easy to follow. We've recommended WooF Dogs to all our Delray friends.",
        author: "Lauren T.",
        dog: "Cooper, Goldendoodle",
        source: "Google Review"
      }
    ],
    faqs: [
      {
        question: "Do you offer in-home dog training in Delray Beach?",
        answer: "Yes! We provide in-home private training sessions throughout Delray Beach — including the Atlantic Avenue corridor, Pineapple Grove, Tropic Isle, High Point, and all surrounding neighborhoods. In-home training addresses real behaviors in the exact environment where they occur, giving you faster, more lasting results."
      },
      {
        question: "How much does dog training cost in Delray Beach?",
        answer: "Pricing depends on the program and your specific goals. We start with a professional evaluation to assess your dog and recommend the ideal plan. Call (561) 594-4111 for a free phone consultation — no obligation, just honest advice."
      },
      {
        question: "Do you train aggressive or reactive dogs in Delray Beach?",
        answer: "Yes, we specialize in aggression and reactivity management. Our lead trainer Shay Maimoni has 30+ years of experience — including military K9 and police training — and uses safe, balanced, structured methods to identify the root cause of aggression and build genuine, lasting behavior change."
      },
      {
        question: "How long does dog training take in Delray Beach?",
        answer: "Most families see meaningful improvement within 4–8 weeks of consistent training. Timelines vary based on your dog's age, temperament, and specific issues. Dogs with more complex behaviors often benefit from our intensive board-and-train bootcamp, which compresses months of progress into weeks."
      },
      {
        question: "Can you help with my dog's behavior at Delray Dog Beach?",
        answer: "Absolutely! Off-leash reliability and socialization around other dogs are key components of our advanced obedience programs. We can specifically work on recall, impulse control, and calm greetings in high-stimulation environments like dog parks and beaches."
      },
      {
        question: "Do you offer board-and-train in or near Delray Beach?",
        answer: "Yes! Our board-and-train (bootcamp) program runs at our facility in Loxahatchee, about 40 minutes from Delray Beach. Your dog stays with our professional trainers for an immersive training experience, then we transfer all skills back to you with owner coaching sessions."
      },
      {
        question: "What areas near Delray Beach do you serve?",
        answer: "Besides Delray Beach, we serve Boca Raton, Boynton Beach, Lake Worth, Highland Beach, Lantana, and the entire Palm Beach County area."
      },
      {
        question: "What types of dog training do you offer in Delray Beach?",
        answer: "We offer obedience training at all levels, puppy training, service animal training, therapy dog preparation, aggression management, and intensive board-and-train bootcamp programs. Every plan is tailored to your dog's temperament, history, and your specific goals."
      }
    ],
    napStatement: "WooF Dogs serves all of Delray Beach from our facility at 4200 Global Trail, Loxahatchee, FL 33470. Call (561) 594-4111 or email office@woofdogs.com."
  }
];

export function getCityPageData(slug: string): CityPageData | undefined {
  return CITY_PAGES.find(city => city.slug === slug);
}
