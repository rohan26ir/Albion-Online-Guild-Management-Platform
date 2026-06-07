"use client";

import { FAQ } from "@/components/pagesComp/Faqs";
import { Hero } from "@/components/pagesComp/Hero";
import { Pricing } from "@/components/pagesComp/Pricing";
import TeamShowcase from "@/components/pagesComp/TeamShowcase";
import { Testimonials } from "@/components/pagesComp/Testimonials";

export default function HomePage() {
  const categories = {
    "guild-management": "Guild Management",
    "gameplay": "Gameplay & PvP", 
    "economy": "Economy & Trading",
    "tools": "Platform Tools"
  };

  const faqData = {
    "guild-management": [
      {
        question: "How do I create and manage my guild on your platform?",
        answer: "Creating a guild is simple! Click on 'Create Guild' in your dashboard, set your guild name, tag, and description. You can then invite members, assign roles, track activities, and manage your guild's progress all from one central hub."
      },
      {
        question: "Can I track my guild's ZvZ performance?",
        answer: "Yes! Our platform provides detailed analytics for ZvZ battles including kill/death ratios, territory control stats, player performance metrics, and battle replays. You can also schedule and organize ZvZ events with your alliance."
      },
      {
        question: "How does member management work?",
        answer: "You can assign different permission levels (Recruit, Member, Veteran, Officer, Guild Master), track member activity and contribution, manage attendance for events, and get automatic inactivity alerts for members who haven't logged in recently."
      },
      {
        question: "What's the difference between free and premium guild features?",
        answer: "Free features include basic member management, event scheduling, and Discord integration. Premium features include advanced analytics, ZvZ coordination tools, API access, territory management, and priority support starting at $4.99/month."
      },
      {
        question: "Can I manage multiple guilds under one alliance?",
        answer: "Absolutely! Our Alliance plan allows you to manage up to 10 guilds under one umbrella, coordinate cross-guild activities, share resources, and maintain alliance-wide communication channels."
      }
    ],
    "gameplay": [
      {
        question: "How can I improve my guild's ZvZ performance?",
        answer: "Our platform provides composition analysis, shot-caller tools, real-time battle tracking, and post-battle analytics. You can review positioning, ability usage, and coordination to identify areas for improvement. Many top guilds have seen 30-40% win rate improvements using our tools."
      },
      {
        question: "What's the best way to organize fame farms?",
        answer: "Use our event scheduler to plan fame farms, set role requirements, track participant sign-ups, and automatically calculate fame per hour. Our system also provides optimal group composition suggestions based on your members' builds."
      },
      {
        question: "How do I scout and track enemy movements?",
        answer: "Our platform includes territory tracking, scout report management, and real-time map overlays. Scouts can submit reports that automatically update your guild's knowledge of enemy positions, gather camps, and resource nodes."
      },
      {
        question: "Can I track crystal arena rankings?",
        answer: "Yes! We provide crystal arena leaderboards, team performance metrics, individual player stats, and match history. You can analyze win rates by composition and identify your team's strengths and weaknesses."
      },
      {
        question: "What tools exist for shot-callers?",
        answer: "Shot-callers get access to live battle maps, target marking systems, voice command integration, and pre-set strategies. You can draw on maps, assign priority targets, and coordinate splitting with multiple parties in real-time."
      }
    ],
    "economy": [
      {
        question: "How can I track my guild's silver and resources?",
        answer: "Our economic dashboard provides real-time tracking of guild bank, resource stockpiles, crafting profits, and market trends. Set budgets for re-gearing, territory bidding, and hideout maintenance."
      },
      {
        question: "What's the best way to manage guild taxes?",
        answer: "You can set automated tax rates for different activities (gathering, PvE, PvP), track member contributions, and generate tax reports. The system also identifies top contributors and rewards them automatically."
      },
      {
        question: "Can I optimize my hideout's profitability?",
        answer: "Yes! Our hideout management tools track crafting efficiency, refining profits, energy costs, and maintenance schedules. You'll get alerts when hideouts need repair and suggestions for most profitable crafting stations."
      },
      {
        question: "How do I prevent economic griefing?",
        answer: "Set withdrawal limits, require multiple approvals for large transactions, and enable audit logs. Our fraud detection system alerts officers to suspicious activity and automatically flags unusual patterns."
      },
      {
        question: "What market tools are available for traders?",
        answer: "Access real-time market data across all cities, price trend analysis, profit calculators, and trade route optimizers. Set buy/sell alerts and get notifications when profitable opportunities arise."
      }
    ],
    "tools": [
      {
        question: "Does your platform integrate with Discord?",
        answer: "Yes! Our Discord bot provides real-time notifications for events, member activity, territory status, and economic updates. Sync roles, track voice channel attendance, and automatically update member lists."
      },
      {
        question: "Is there a mobile app available?",
        answer: "We offer a progressive web app (PWA) that works on both desktop and mobile devices. Native iOS and Android apps are currently in development and will be released in Q2 2025."
      },
      {
        question: "How does the API work for custom integrations?",
        answer: "Our REST API provides access to guild data, member statistics, economic information, and event logs. Available for Alliance tier subscribers, with documentation and example implementations provided."
      },
      {
        question: "Can I export my guild's data?",
        answer: "Yes! You can export member lists, activity logs, economic reports, and battle statistics in CSV, JSON, or PDF formats. Automated exports can be scheduled daily, weekly, or monthly."
      },
      {
        question: "What support options are available?",
        answer: "All tiers include email support with 48-hour response. Guild Master tier adds priority email support (24-hour). Alliance tier includes dedicated Discord support channel and monthly strategy consultation calls."
      }
    ]
  };

  return (
    <div className="flex flex-col items-start ">
      {/* hero */}
      <Hero
        tagline="Albion Game guild hub"
        title={<>Build. Lead. Grow.</>}
        description="Manage members, track events, and keep your guild organized from one elegant dashboard."
        ctaText="Play Free Now"
        ctaUrl="https://albiononline.com/ref/7N3K5UTRZ7"
      />

      {/* team Showcase */}
      <TeamShowcase />

      {/* FAQ */}
      <FAQ 
        title="Frequently Asked Questions"
        subtitle="Everything you need to know"
        categories={categories}
        faqData={faqData}
      />

      {/* Pricing */}
      <Pricing />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}