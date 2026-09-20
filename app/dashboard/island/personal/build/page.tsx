import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconHammer, IconBuildingStore, IconInfoCircle } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Personal Island Construction & Build | Albion Game',
  description: 'Construction guide, stone block material costs, and house upgrading rules for Personal Islands in Albion Online.',
};

export default function PersonalBuildPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Personal Island Construction & Building</h1>
          <Badge variant="outline" className="border-orange-500/40 bg-orange-500/10 text-orange-400 font-semibold">
            Build Mode
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          How to construct houses, crafting stations, and manage building tiers on your personal island.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconHammer className="size-5 text-orange-400" />
              How to Enter Build Mode
            </CardTitle>
            <CardDescription>Step-by-step construction instructions on your island.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>1. Stand on any open multipurpose or small plot on your personal island.</p>
            <p>2. Press <strong>H</strong> (default hotkey) or click your avatar icon and choose <strong>Build</strong>.</p>
            <p>3. Select the building type: Houses, Crafting Stations, Farming Plots, or Pastures.</p>
            <p>4. Place the structure outline onto the plot and confirm.</p>
            <p>5. Feed the required <strong>Stone Blocks</strong>, <strong>Planks</strong>, and Silver to finish construction.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconBuildingStore className="size-5 text-primary" />
              Upgrading Existing Buildings
            </CardTitle>
            <CardDescription>Upgrade requirements to match higher tier gear and laborers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Buildings must be upgraded sequentially from <strong>Tier 2 → Tier 8</strong>.</p>
            <p>• Upgrading a house increases its maximum capacity for laborers, beds, and tables.</p>
            <p>• Always use Stone Blocks of matching tier (e.g. T6 Travertine Blocks for Tier 6 House).</p>
            <p>• Demolishing a building returns 90% of the raw materials used if durability is at 100%.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
