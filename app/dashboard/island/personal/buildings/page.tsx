import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBuildingStore, IconLayoutDashboard } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Island Buildings & Sizes | Albion Game',
  description: 'Complete directory of Albion Online building sizes, plot requirements, house dimensions, and crafting stations for Personal Islands.',
};

export default function PersonalBuildingsPage() {
  const buildings = [
    { name: "Player House (T2 - T8)", size: "Multipurpose (Large)", fits: "Holds 1 to 3 Laborers, beds, and tables based on Tier." },
    { name: "Farm Plot / Herb Garden", size: "Multipurpose (Large)", fits: "9 plantable crop/herb tiles." },
    { name: "Pasture / Kennel", size: "Multipurpose (Large)", fits: "Holds up to 4 animals or rare mounts." },
    { name: "Crafting Stations (Forge, Workshop, Hunter's Lodge)", size: "Multipurpose (Large)", fits: "Full equipment crafting station." },
    { name: "Smelter / Weaver / Tanner / Mill", size: "Small Plot", fits: "Auxiliary refining and grain processing." },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Island Buildings & Plot Sizes</h1>
          <Badge variant="outline" className="border-indigo-500/40 bg-indigo-500/10 text-indigo-400 font-semibold">
            Building Directory
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed directory of structure sizes, required plot types, and maximum capacities.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {buildings.map((b) => (
          <Card key={b.name} className="border-border/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <IconBuildingStore className="size-4 text-primary" />
                  {b.name}
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {b.size}
                </Badge>
              </div>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                {b.fits}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
