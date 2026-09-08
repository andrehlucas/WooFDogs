import type { 
  WPPost, 
  WPCategory, 
  WPAuthor, 
  WPPostConnection, 
  BlogPost, 
  BlogCategory, 
  BlogAuthor,
  BlogPostQuery 
} from "../../shared/blogTypes";

const sampleAuthors: WPAuthor['node'][] = [
  {
    id: "author_1",
    databaseId: 1,
    name: "Shay Maimoni",
    slug: "shay-maimoni",
    description: "Lead Dog Trainer at WooF Dogs with over 15 years of experience in canine behavior and obedience training. Certified in multiple training methodologies.",
    avatar: {
      url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: "author_2",
    databaseId: 2,
    name: "Sarah Mitchell",
    slug: "sarah-mitchell",
    description: "Certified Professional Dog Trainer specializing in puppy development and positive reinforcement techniques.",
    avatar: {
      url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: "author_3",
    databaseId: 3,
    name: "Marcus Johnson",
    slug: "marcus-johnson",
    description: "Behavioral specialist focusing on aggression management and rehabilitation of reactive dogs.",
    avatar: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  }
];

const sampleCategories: WPCategory['node'][] = [
  {
    id: "cat_1",
    databaseId: 1,
    name: "Puppy Training",
    slug: "puppy-training",
    description: "Tips and guides for training your new puppy",
    count: 2
  },
  {
    id: "cat_2",
    databaseId: 2,
    name: "Obedience",
    slug: "obedience",
    description: "Master basic and advanced obedience commands",
    count: 2
  },
  {
    id: "cat_3",
    databaseId: 3,
    name: "Behavior",
    slug: "behavior",
    description: "Understanding and modifying dog behavior",
    count: 2
  },
  {
    id: "cat_4",
    databaseId: 4,
    name: "Tips & Tricks",
    slug: "tips-tricks",
    description: "Quick training tips for everyday situations",
    count: 3
  },
  {
    id: "cat_5",
    databaseId: 5,
    name: "Health & Wellness",
    slug: "health-wellness",
    description: "Keeping your dog healthy and happy",
    count: 1
  }
];

const samplePosts: WPPost[] = [
  {
    id: "post_1",
    databaseId: 1,
    title: "5 Essential Commands Every Puppy Should Learn First",
    slug: "5-essential-commands-every-puppy-should-learn",
    uri: "/blog/5-essential-commands-every-puppy-should-learn",
    excerpt: "Starting your puppy's training journey? These five foundational commands will set them up for a lifetime of good behavior and strengthen your bond.",
    content: `<h2>Building a Strong Foundation</h2>
<p>When you bring a new puppy home, training might seem overwhelming. Where do you start? What's most important? After years of working with puppies and their families, I've identified the five commands that form the foundation of all future training.</p>

<h3>1. Name Recognition</h3>
<p>Before teaching any other command, your puppy needs to know their name. This is the gateway to all communication. Practice by saying their name and rewarding them when they look at you. Keep sessions short—puppies have limited attention spans!</p>

<h3>2. Sit</h3>
<p>The sit command is versatile and essential. Use it before meals, at doorways, and when greeting people. To teach it, hold a treat above your puppy's nose and slowly move it back over their head. Their bottom will naturally lower as they follow the treat.</p>

<h3>3. Come (Recall)</h3>
<p>A reliable recall could save your dog's life. Start in a low-distraction environment and gradually increase difficulty. Always make coming to you a positive experience—never call your puppy to punish them.</p>

<h3>4. Stay</h3>
<p>Teaching stay requires patience. Start with just a few seconds and gradually increase duration and distance. This command teaches impulse control and is invaluable in many situations.</p>

<h3>5. Leave It</h3>
<p>Dogs explore with their mouths, making "leave it" essential for safety. Start by holding treats in both hands, show one to your puppy, and when they lose interest, reward them with the other treat.</p>

<h2>Training Tips for Success</h2>
<ul>
<li>Keep training sessions short (5-10 minutes)</li>
<li>End on a positive note</li>
<li>Be consistent with your cues</li>
<li>Practice in different locations</li>
<li>Use high-value treats for difficult commands</li>
</ul>

<p>Remember, training is a journey, not a destination. Celebrate small victories and enjoy the process of building a wonderful relationship with your puppy!</p>`,
    date: "2024-12-15T10:00:00",
    modified: "2024-12-15T10:00:00",
    status: "publish",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=630&fit=crop",
        altText: "Golden retriever puppy sitting attentively during training session",
        mediaDetails: { width: 1200, height: 630 }
      }
    },
    author: { node: sampleAuthors[1] },
    categories: { nodes: [sampleCategories[0], sampleCategories[3]] }
  },
  {
    id: "post_2",
    databaseId: 2,
    title: "Understanding Why Dogs Pull on the Leash (And How to Stop It)",
    slug: "understanding-why-dogs-pull-on-leash",
    uri: "/blog/understanding-why-dogs-pull-on-leash",
    excerpt: "Leash pulling is one of the most common challenges dog owners face. Learn why dogs pull and discover effective techniques to enjoy peaceful walks together.",
    content: `<h2>The Science Behind Leash Pulling</h2>
<p>Dogs don't pull on the leash to be stubborn or dominant—they pull because it works! When a dog pulls and gets to sniff that interesting spot or greet another dog, they've just learned that pulling = reward. Additionally, dogs naturally walk faster than humans.</p>

<h3>The Opposition Reflex</h3>
<p>Dogs have something called an opposition reflex. When they feel pressure on their collar or harness, their instinct is to push against it. This is why pulling back on the leash often makes things worse.</p>

<h2>Effective Solutions</h2>

<h3>The Stop-and-Wait Technique</h3>
<p>When your dog pulls, simply stop moving. Wait until they return to your side or the leash loosens, then continue walking. This teaches them that pulling stops the walk while loose leash walking continues the adventure.</p>

<h3>The Direction Change</h3>
<p>When your dog pulls, turn and walk in the opposite direction. This keeps them guessing and paying attention to where you're going rather than forging ahead.</p>

<h3>Reward Position Walking</h3>
<p>Regularly reward your dog for walking beside you. Use treats, verbal praise, or even permission to sniff as rewards for maintaining a loose leash.</p>

<h2>Equipment Considerations</h2>
<p>While training is the ultimate solution, proper equipment can help:</p>
<ul>
<li><strong>Front-clip harness:</strong> Redirects pulling energy to the side</li>
<li><strong>Head halter:</strong> Provides gentle control (requires proper conditioning)</li>
<li><strong>Standard harness:</strong> Reduces strain on the neck while training</li>
</ul>

<h2>Patience Is Key</h2>
<p>Changing walking habits takes time. Your dog has likely been practicing pulling for months or years. Celebrate progress, not perfection, and remember that consistency is your most powerful tool.</p>`,
    date: "2024-12-10T14:30:00",
    modified: "2024-12-10T14:30:00",
    status: "publish",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=1200&h=630&fit=crop",
        altText: "Dog walking calmly on loose leash with owner in park",
        mediaDetails: { width: 1200, height: 630 }
      }
    },
    author: { node: sampleAuthors[0] },
    categories: { nodes: [sampleCategories[1], sampleCategories[3]] }
  },
  {
    id: "post_3",
    databaseId: 3,
    title: "Recognizing and Managing Separation Anxiety in Dogs",
    slug: "recognizing-managing-separation-anxiety-dogs",
    uri: "/blog/recognizing-managing-separation-anxiety-dogs",
    excerpt: "Is your dog destructive when left alone? They might be suffering from separation anxiety. Learn to recognize the signs and discover compassionate solutions.",
    content: `<h2>What Is Separation Anxiety?</h2>
<p>Separation anxiety is more than just missing you when you're gone. It's a panic response that can cause significant distress to your dog and damage to your home. True separation anxiety requires a systematic approach to treatment.</p>

<h3>Signs of Separation Anxiety</h3>
<ul>
<li>Destructive behavior focused on exit points (doors, windows)</li>
<li>Excessive barking, howling, or whining when alone</li>
<li>House soiling despite being housetrained</li>
<li>Escape attempts that can result in self-injury</li>
<li>Pacing, drooling, or other signs of distress</li>
<li>Symptoms that only occur when left alone</li>
</ul>

<h2>What Causes Separation Anxiety?</h2>
<p>Several factors can contribute:</p>
<ul>
<li>Change in routine or family composition</li>
<li>Moving to a new home</li>
<li>History of abandonment or shelter stays</li>
<li>Genetic predisposition in some breeds</li>
<li>Lack of early independence training</li>
</ul>

<h2>Treatment Approaches</h2>

<h3>Desensitization</h3>
<p>This involves gradually teaching your dog that departures are safe. Start with very short absences (even just stepping outside for a second) and slowly build duration. Never push your dog past their comfort threshold.</p>

<h3>Counter-Conditioning</h3>
<p>Pair departures with something wonderful, like a food puzzle or special treat. The goal is to change your dog's emotional response to being alone from panic to anticipation.</p>

<h3>Exercise and Mental Enrichment</h3>
<p>A tired dog is often a calmer dog. Ensure your dog gets adequate physical exercise and mental stimulation before you leave.</p>

<h2>When to Seek Professional Help</h2>
<p>Severe separation anxiety often requires professional intervention. A certified dog behaviorist can create a customized treatment plan, and in some cases, medication may be recommended to support behavioral modification.</p>

<p>Remember: punishment never helps anxiety—it only makes it worse. With patience and the right approach, most dogs can learn to feel comfortable when left alone.</p>`,
    date: "2024-12-05T09:00:00",
    modified: "2024-12-05T09:00:00",
    status: "publish",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=1200&h=630&fit=crop",
        altText: "Dog looking out window waiting for owner to return",
        mediaDetails: { width: 1200, height: 630 }
      }
    },
    author: { node: sampleAuthors[2] },
    categories: { nodes: [sampleCategories[2], sampleCategories[4]] }
  },
  {
    id: "post_4",
    databaseId: 4,
    title: "The Truth About Positive Reinforcement Training",
    slug: "truth-about-positive-reinforcement-training",
    uri: "/blog/truth-about-positive-reinforcement-training",
    excerpt: "Positive reinforcement isn't about being permissive or bribing your dog. Discover the science-backed approach that builds trust and lasting behavior change.",
    content: `<h2>Debunking Common Myths</h2>
<p>Positive reinforcement training is often misunderstood. Let's address some common misconceptions and explore what this approach really means.</p>

<h3>Myth 1: "It's Just Bribery"</h3>
<p>There's a crucial difference between bribery and reinforcement. Bribery shows the reward before the behavior; reinforcement delivers the reward after. Over time, we fade treats and the behavior becomes habitual. Just like you don't need to be paid every time you brush your teeth.</p>

<h3>Myth 2: "Positive Only Means Permissive"</h3>
<p>Positive reinforcement trainers absolutely set boundaries. We simply choose to teach what TO do rather than focusing on punishment. We remove rewards for unwanted behavior (negative punishment) without causing pain or fear.</p>

<h3>Myth 3: "It Doesn't Work for Aggressive Dogs"</h3>
<p>Research actually shows that punishment-based methods increase aggression in dogs. Positive reinforcement addresses the emotional root of behavior, making it especially effective for fearful or reactive dogs.</p>

<h2>The Science Behind It</h2>
<p>Positive reinforcement works because it:</p>
<ul>
<li>Builds a strong bond based on trust</li>
<li>Creates a dog who wants to learn</li>
<li>Reduces stress during training</li>
<li>Produces reliable, long-lasting results</li>
<li>Can be used by anyone in the family, including children</li>
</ul>

<h2>Practical Applications</h2>

<h3>Marker Training</h3>
<p>Using a clicker or marker word ("yes!") to precisely identify the correct behavior makes learning faster and clearer for your dog.</p>

<h3>Shaping</h3>
<p>Breaking complex behaviors into small steps and rewarding progress allows dogs to learn impressive skills without frustration.</p>

<h3>Management</h3>
<p>Prevention is part of the approach. We set dogs up for success by managing their environment while they learn.</p>

<h2>Making the Transition</h2>
<p>If you've used other methods, it's never too late to switch. Dogs are incredibly forgiving. Start with simple exercises, build your skills alongside your dog, and watch your relationship transform.</p>`,
    date: "2024-11-28T11:00:00",
    modified: "2024-11-28T11:00:00",
    status: "publish",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1200&h=630&fit=crop",
        altText: "Happy dog receiving treat during positive reinforcement training",
        mediaDetails: { width: 1200, height: 630 }
      }
    },
    author: { node: sampleAuthors[0] },
    categories: { nodes: [sampleCategories[1], sampleCategories[3]] }
  },
  {
    id: "post_5",
    databaseId: 5,
    title: "Socializing Your Puppy: A Critical Window You Can't Miss",
    slug: "socializing-your-puppy-critical-window",
    uri: "/blog/socializing-your-puppy-critical-window",
    excerpt: "The first few months of your puppy's life shape their entire future. Learn how to properly socialize your puppy during this crucial developmental period.",
    content: `<h2>The Socialization Window</h2>
<p>Puppies have a critical socialization period that typically ends around 14-16 weeks of age. During this time, they're naturally curious and accepting of new experiences. After this window closes, unfamiliar things are more likely to cause fear.</p>

<h3>Why It Matters</h3>
<p>Proper socialization during this period can prevent:</p>
<ul>
<li>Fear-based aggression</li>
<li>Anxiety around strangers or other animals</li>
<li>Phobias of common sounds or objects</li>
<li>Difficulty adapting to new environments</li>
</ul>

<h2>What to Socialize Your Puppy To</h2>

<h3>People</h3>
<p>Expose your puppy to people of different ages, genders, ethnicities, and appearances (hats, beards, uniforms, wheelchairs, etc.). Quality matters more than quantity—ensure all interactions are positive.</p>

<h3>Animals</h3>
<p>Safe interactions with friendly, vaccinated dogs are valuable. Also introduce other species they might encounter: cats, horses, chickens, etc.</p>

<h3>Environments</h3>
<p>Visit different surfaces (grass, gravel, metal grates), locations (vet clinic, pet stores, parks), and settings (urban, rural, indoor, outdoor).</p>

<h3>Sounds</h3>
<p>Gradually expose to thunder, fireworks, traffic, vacuum cleaners, and other common sounds. Start at low volumes and pair with treats.</p>

<h3>Handling</h3>
<p>Practice touching ears, paws, teeth, and tail. This makes future grooming and vet visits much easier.</p>

<h2>The Right Approach</h2>
<p>Socialization should always be:</p>
<ul>
<li><strong>Positive:</strong> Every experience should be paired with good things</li>
<li><strong>Gradual:</strong> Never force or flood your puppy</li>
<li><strong>Respectful:</strong> Watch your puppy's body language and retreat if they're overwhelmed</li>
</ul>

<h2>Balancing Health and Socialization</h2>
<p>Until fully vaccinated, avoid high-risk areas (dog parks, pet store floors). Instead:</p>
<ul>
<li>Carry your puppy to new places</li>
<li>Invite vaccinated dogs to your home</li>
<li>Use puppy socialization classes at reputable training facilities</li>
<li>Expose to sights and sounds from a safe distance</li>
</ul>

<p>This is a critical investment in your puppy's future. The effort you put in now will pay dividends for the next 10-15 years.</p>`,
    date: "2024-11-20T08:30:00",
    modified: "2024-11-20T08:30:00",
    status: "publish",
    featuredImage: {
      node: {
        sourceUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=630&fit=crop",
        altText: "Two puppies playing together during socialization session",
        mediaDetails: { width: 1200, height: 630 }
      }
    },
    author: { node: sampleAuthors[1] },
    categories: { nodes: [sampleCategories[0], sampleCategories[2]] }
  }
];

export interface IBlogDataSource {
  getPosts(query?: BlogPostQuery): Promise<{ posts: BlogPost[]; hasMore: boolean }>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  getCategories(): Promise<BlogCategory[]>;
  getAuthors(): Promise<BlogAuthor[]>;
  getPostsByCategory(categorySlug: string, limit?: number): Promise<BlogPost[]>;
}

function transformWPPostToBlogPost(post: WPPost): BlogPost {
  return {
    id: post.id,
    databaseId: post.databaseId,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    modifiedDate: post.modified || post.date,
    featuredImageUrl: post.featuredImage?.node.sourceUrl,
    featuredImageAlt: post.featuredImage?.node.altText,
    authorName: post.author.node.name,
    authorSlug: post.author.node.slug,
    authorAvatar: post.author.node.avatar?.url,
    categories: post.categories.nodes.map(cat => ({
      name: cat.name,
      slug: cat.slug
    }))
  };
}

export class LocalBlogService implements IBlogDataSource {
  private posts: WPPost[] = samplePosts;
  private categories: WPCategory['node'][] = sampleCategories;
  private authors: WPAuthor['node'][] = sampleAuthors;

  async getPosts(query?: BlogPostQuery): Promise<{ posts: BlogPost[]; hasMore: boolean }> {
    let filteredPosts = [...this.posts].filter(p => p.status === 'publish');
    
    if (query?.category) {
      filteredPosts = filteredPosts.filter(post =>
        post.categories.nodes.some(cat => cat.slug === query.category)
      );
    }

    filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const limit = query?.limit || 10;
    const posts = filteredPosts.slice(0, limit).map(transformWPPostToBlogPost);

    return {
      posts,
      hasMore: filteredPosts.length > limit
    };
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = this.posts.find(p => p.slug === slug && p.status === 'publish');
    return post ? transformWPPostToBlogPost(post) : null;
  }

  async getCategories(): Promise<BlogCategory[]> {
    return this.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      count: cat.count || 0
    }));
  }

  async getAuthors(): Promise<BlogAuthor[]> {
    return this.authors.map(author => ({
      id: author.id,
      name: author.name,
      slug: author.slug,
      description: author.description,
      avatar: author.avatar?.url
    }));
  }

  async getPostsByCategory(categorySlug: string, limit: number = 10): Promise<BlogPost[]> {
    const { posts } = await this.getPosts({ category: categorySlug, limit });
    return posts;
  }
}

import { WordPressBlogService } from "./wordPressBlogService";
import { MdxBlogService } from "./mdxBlogService";
import { startWpPublishWatcher } from "./wpPublishWatcher";
import { startSitemapDiffNotifier } from "./sitemapDiffService";

// Start polling cms.woofdogs.com for new/updated posts so IndexNow + Google
// Indexing get notified within minutes of publish. No-op if neither channel
// is configured.
startWpPublishWatcher();

// After each cold start (i.e. each deploy), diff the live sitemap against
// the previous snapshot in `.local/.sitemap-snapshot.json` and ping IndexNow
// for any non-blog URL whose `lastmod` advanced. Blog URLs are handled by
// the WP/MDX watchers above. No-op when INDEXNOW_KEY is unset.
startSitemapDiffNotifier();

class CombinedBlogService implements IBlogDataSource {
  private mdx = new MdxBlogService();
  private wp = new WordPressBlogService();

  async getPosts(query?: BlogPostQuery): Promise<{ posts: BlogPost[]; hasMore: boolean }> {
    const [mdxResult, wpResult] = await Promise.all([
      this.mdx.getPosts({ ...query, limit: 100 }),
      this.wp.getPosts({ ...query, limit: 100 }).catch(() => ({ posts: [], hasMore: false })),
    ]);

    const slugSet = new Set(mdxResult.posts.map(p => p.slug));
    const wpFiltered = wpResult.posts.filter(p => !slugSet.has(p.slug));
    const merged = [...mdxResult.posts, ...wpFiltered];
    merged.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const limit = query?.limit || 10;
    return {
      posts: merged.slice(0, limit),
      hasMore: merged.length > limit,
    };
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const mdxPost = await this.mdx.getPostBySlug(slug);
    if (mdxPost) return mdxPost;
    return this.wp.getPostBySlug(slug).catch(() => null);
  }

  async getCategories(): Promise<BlogCategory[]> {
    const [mdxCats, wpCats] = await Promise.all([
      this.mdx.getCategories(),
      this.wp.getCategories().catch(() => []),
    ]);
    const slugSet = new Set<string>();
    const result: BlogCategory[] = [];
    for (const cat of [...mdxCats, ...wpCats]) {
      if (!slugSet.has(cat.slug)) {
        slugSet.add(cat.slug);
        result.push(cat);
      }
    }
    return result;
  }

  async getAuthors(): Promise<BlogAuthor[]> {
    const [mdxAuthors, wpAuthors] = await Promise.all([
      this.mdx.getAuthors(),
      this.wp.getAuthors().catch(() => []),
    ]);
    const slugSet = new Set<string>();
    const result: BlogAuthor[] = [];
    for (const author of [...mdxAuthors, ...wpAuthors]) {
      if (!slugSet.has(author.slug)) {
        slugSet.add(author.slug);
        result.push(author);
      }
    }
    return result;
  }

  async getPostsByCategory(categorySlug: string, limit: number = 10): Promise<BlogPost[]> {
    const { posts } = await this.getPosts({ category: categorySlug, limit });
    return posts;
  }
}

export const blogService: IBlogDataSource = new CombinedBlogService();
