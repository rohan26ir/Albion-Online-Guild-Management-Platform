import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconMap, IconShield, IconBuildingStore } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Guild Island Map & Layout | Albion Game',
  description: 'Guild Island zoning maps, central Guild Hall placement, and building plot layouts across Tier 1 through 6 upgrades in Albion Online.',
};

export default function GuildMapPage() {
  const tiers = [
    { tier: "Tier 1", plots: "4 Building Plots", hall: "Central Guild Hall", desc: "Initial headquarters area surrounding the Guild Hall." },
    { tier: "Tier 2", plots: "7 Building Plots", hall: "+2 Small Plots", desc: "Southern courtyard expansion with small refining plots." },
    { tier: "Tier 3", plots: "10 Building Plots", hall: "Expanded Wings", desc: "Eastern terrace expansion for member houses." },
    { tier: "Tier 4", plots: "13 Building Plots", hall: "Expanded Wings", desc: "Northern sector expansion for large crafting operations." },
    { tier: "Tier 5", plots: "16 Building Plots", hall: "Expanded Wings", desc: "Western district for dedicated guild laborer houses." },
    { tier: "Tier 6", plots: "19 Building Plots", hall: "Maxed Headquarters", desc: "Complete Guild Island layout with 19 Large + 2 Small + Guild Hall." },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Guild Island Map & Layout</h1>
          <Badge variant="outline" className="border-blue-500/40 bg-blue-500/10 text-blue-400 font-semibold">
            Guild Plots
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Visual layout and expansion progression for Guild Islands in Albion Online.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
          <Card key={t.tier} className="border-border/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <IconMap className="size-4 text-blue-400" />
                  {t.tier}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {t.plots}
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                {t.desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Building Plots:</span>
                <span className="font-semibold text-emerald-500">{t.plots}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Features:</span>
                <span className="font-semibold text-blue-400">{t.hall}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
