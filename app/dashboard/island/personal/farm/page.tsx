import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconPlant, IconCarrot, IconFlame, IconUsers } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Personal Island Farm & Laborers | Albion Game',
  description: 'Maximize focus efficiency, crop yields, animal pastures, herb gardens, and laborer happiness on your personal island in Albion Online.',
};

export default function PersonalFarmPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Personal Island Farming & Laborers</h1>
          <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-semibold">
            Farming & Economy
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Complete guide to focus efficiency, crop rotation, animal breeding, and laborer journals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconCarrot className="size-5 text-amber-500" />
              Crops & Herb Gardens
            </CardTitle>
            <CardDescription>Daily planting and watering focus rules.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Takes <strong>22 hours</strong> for crops and herbs to fully grow.</p>
            <p>• Using Focus on watering guarantees seed returns (&gt;100% average seed yield).</p>
            <p>• Max spec reduces watering cost from 1,000 Focus down to ~125 Focus per plot square.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconPlant className="size-5 text-emerald-400" />
              Pastures & Animal Breeding
            </CardTitle>
            <CardDescription>Raising farm animals and mounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Raise chickens, goats, cows, and rare mounts (Direwolves, Stags, Swiftclaws).</p>
            <p>• Animals require daily feed (carrots, wheat, or raw meat for predators).</p>
            <p>• Nurturing animals with focus increases offspring yield rate.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconUsers className="size-5 text-primary" />
              House Laborers
            </CardTitle>
            <CardDescription>Journal processing and passive resource income.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Place beds, tables, and trophies to keep laborer happiness at maximum.</p>
            <p>• Give filled journals (Crafting, Gathering, Mercenary) to receive materials.</p>
            <p>• Tier 8 houses can hold up to 3 laborers with maxed 150% happiness yields.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
