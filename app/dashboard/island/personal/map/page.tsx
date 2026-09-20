import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconMap, IconCompass, IconPlant, IconBuildingStore } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Personal Island Map & Layout | Albion Game',
  description: 'Interactive map and layout guide for personal islands in Albion Online. Plan building and farm plot placement across Tier 1 through 6 expansions.',
};

export default function PersonalMapPage() {
  const tiers = [
    { tier: "Tier 1", plots: "1 Multipurpose Plot", smallPlots: "0 Small", desc: "Starter island area near the shore." },
    { tier: "Tier 2", plots: "3 Multipurpose Plots", smallPlots: "2 Small Plots", desc: "First expansion adding southern path & small plots." },
    { tier: "Tier 3", plots: "6 Multipurpose Plots", smallPlots: "2 Small Plots", desc: "Eastern hill extension with 3 additional farming plots." },
    { tier: "Tier 4", plots: "9 Multipurpose Plots", smallPlots: "2 Small Plots", desc: "Northern expansion area for extensive agriculture." },
    { tier: "Tier 5", plots: "12 Multipurpose Plots", smallPlots: "2 Small Plots", desc: "Western terrace expansion for high-tier laborer housing." },
    { tier: "Tier 6", plots: "16 Multipurpose Plots", smallPlots: "2 Small Plots", desc: "Full island unlocked with all 16 large plots available." },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Personal Island Map & Layout</h1>
            <Badge variant="outline" className="border-sky-500/40 bg-sky-500/10 text-sky-400 font-semibold">
              Plot Zones
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Visual plot layout and progression across Tier 1 to 6 personal island expansions.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((t) => (
          <Card key={t.tier} className="border-border/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <IconMap className="size-4 text-sky-400" />
                  {t.tier}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {t.plots}
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground">
                {t.desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Large Plots:</span>
                <span className="font-semibold text-emerald-500">{t.plots}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Small Plots:</span>
                <span className="font-semibold text-sky-400">{t.smallPlots}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
