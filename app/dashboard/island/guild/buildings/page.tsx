import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBuildingStore, IconShield } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Guild Buildings & Sizes | Albion Game',
  description: 'Building sizes, Guild Hall footprint, small plot utilities, and guild workshop placement on Guild Islands in Albion Online.',
};

export default function GuildBuildingsPage() {
  const buildings = [
    { name: "Central Guild Hall (T2 - T8)", size: "Guild Hall (Central)", fits: "Holds up to 15 Laborers, large guild vaults, and guild tables." },
    { name: "Guild House (T2 - T8)", size: "Multipurpose (Large)", fits: "Holds up to 3 Laborers per house." },
    { name: "Warrior's Forge / Hunter's Lodge", size: "Multipurpose (Large)", fits: "Full equipment crafting station for weapons and armor." },
    { name: "Mage's Tower / Toolmaker", size: "Multipurpose (Large)", fits: "Magical equipment and gathering gear crafting." },
    { name: "Smelter / Weaver / Tanner", size: "Small Plot", fits: "Auxiliary ore smelting, cloth refining, and leather tanning." },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Guild Buildings & Plot Dimensions</h1>
          <Badge variant="outline" className="border-indigo-500/40 bg-indigo-500/10 text-indigo-400 font-semibold">
            Guild Structures
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Dimensions, capacities, and plot assignments for structures on Guild Islands.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {buildings.map((b) => (
          <Card key={b.name} className="border-border/80">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <IconBuildingStore className="size-4 text-blue-400" />
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
