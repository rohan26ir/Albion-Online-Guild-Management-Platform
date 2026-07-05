'use client';

import { IconPlus, IconShieldCheck, IconSword, IconBuildingCastle, IconCrown, IconUsers } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

import bgCity from '@/public/assets/background/citywall.webp'

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  variant: 'default' | 'outline';
  badgeVariant: 'default' | 'secondary';
  ctaText: string;
  featured?: boolean;
  icon?: React.ReactNode;
  features?: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: 'Adventurer',
    description: 'Perfect for solo players and small groups starting their Albion journey!',
    price: 4.99,
    originalPrice: 9.99,
    discount: 50,
    variant: 'outline',
    badgeVariant: 'secondary',
    ctaText: 'Start Your Adventure',
    icon: <IconSword className="size-5" />,
    features: ['Basic Guild Tools', 'Event Tracking', 'Member Management', 'Discord Integration'],
  },
  {
    id: 2,
    name: 'Guild Master',
    description: 'Ultimate control for leading your guild to conquer the Outlands!',
    price: 12.99,
    originalPrice: 24.99,
    discount: 48,
    variant: 'default',
    badgeVariant: 'default',
    ctaText: 'Lead Your Guild',
    featured: true,
    icon: <IconCrown className="size-5" />,
    features: ['Advanced Analytics', 'ZvZ Coordination', 'Territory Management', 'Alliance Chat', 'Priority Support'],
  },
  {
    id: 3,
    name: 'Alliance',
    description: 'Complete solution for large alliances dominating the black zone!',
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    variant: 'outline',
    badgeVariant: 'secondary',
    ctaText: 'Build Your Empire',
    icon: <IconBuildingCastle className="size-5" />,
    features: ['Multi-Guild Management', 'API Access', 'Custom Reports', 'Dedicated Support', 'Hideout Management'],
  },
];

export function Pricing() {
  return (
    <section className="relative w-full bg-secondary py-10">
      <div id="pricing" className="max-w-7xl w-[95%] mx-auto space-y-5 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-5"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1 font-mono flex items-center gap-2">
              <IconSword className="size-3" />
              <span>Guild Pricing</span>
            </div>
          </div>
          <h2 className="mt-5 text-center text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
            Choose Your Path to Glory
          </h2>
          <p className="text-muted-foreground mt-5 text-center text-sm md:text-base">
            From solo adventurers to massive alliances, we have the perfect tools to lead your guild to victory in the world of Albion.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className={cn(
              'z--10 pointer-events-none absolute inset-0 size-full',
              'bg-[linear-gradient(to_right,--theme(--color-foreground/.2)_1px,transparent_1px),linear-gradient(to_bottom,--theme(--color-foreground/.2)_1px,transparent_1px)]',
              'bg-[size:32px_32px]',
              '[mask-image:radial-gradient(ellipse_at_center,var(--background)_10%,transparent)]',
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-5xl space-y-2"
          >
            <div className="grid md:grid-cols-3 bg-background relative border p-4">
              <IconPlus className="absolute -top-3 -left-3 size-5.5" />
              <IconPlus className="absolute -top-3 -right-3 size-5.5" />
              <IconPlus className="absolute -bottom-3 -left-3 size-5.5" />
              <IconPlus className="absolute -right-3 -bottom-3 size-5.5" />

              {/* Map through pricing plans */}
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={cn(
                    "w-full px-4 pt-5 pb-4 transition-all duration-300",
                    plan.featured && "relative rounded-lg border shadow-lg scale-105 bg-linear-to-b from-primary/5 to-transparent"
                  )}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {plan.icon}
                        <h3 className="leading-none font-semibold">{plan.name}</h3>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <span className="text-muted-foreground text-sm line-through">
                          ${plan.originalPrice}
                        </span>
                        <Badge variant={plan.badgeVariant}>
                          {plan.discount}% off
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="text-muted-foreground flex items-end gap-0.5 text-xl">
                      <span>$</span>
                      <span className="text-foreground -mb-0.5 text-4xl font-extrabold tracking-tighter md:text-5xl">
                        {plan.price}
                      </span>
                      <span>/month</span>
                    </div>
                    
                    {/* Features list */}
                    {plan.features && (
                      <div className="space-y-1.5 pt-2">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <IconShieldCheck className="size-3 text-primary" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      variant={plan.variant === 'outline' ? 'outline' : 'default'} 
                      asChild
                    >
                      <a href="#">{plan.ctaText}</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-muted-foreground flex items-center justify-center gap-x-2 text-sm pt-4">
              <IconUsers className="size-4" />
              <span>Trusted by 10,000+ guilds • No hidden fees • Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}