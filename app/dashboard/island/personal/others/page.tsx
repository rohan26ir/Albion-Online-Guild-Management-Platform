import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconFileDescription, IconShield, IconCompass } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Island Tips & Access Permissions | Albion Game',
  description: 'Personal island access rights, visitor permissions, co-owner settings, biomes, and island relocation mechanics in Albion Online.',
};

export default function PersonalOthersPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Island Permissions & Additional Settings</h1>
          <Badge variant="outline" className="border-slate-500/40 bg-slate-500/10 text-slate-400 font-semibold">
            Access & Biomes
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Managing visitor permissions, co-owners, builder rights, and city biome yields.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconShield className="size-5 text-primary" />
              Access Rights & Permissions
            </CardTitle>
            <CardDescription>Configuring who can visit, farm, and build on your island.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• <strong>Owner:</strong> Full control over island upgrading, demolition, and permission lists.</p>
            <p>• <strong>Co-Owner:</strong> Can build, harvest crops, manage laborers, and claim chests.</p>
            <p>• <strong>Builder:</strong> Allowed to place and upgrade structures without full co-owner rights.</p>
            <p>• <strong>Visitor:</strong> Can fast-travel to and view your island without touching chests or plots.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconCompass className="size-5 text-sky-400" />
              City Biomes & Moving Islands
            </CardTitle>
            <CardDescription>Regional bonuses and island relocation mechanics.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• <strong>Bridgewatch (Steppe):</strong> Production bonus for Wheat, Sheep, Birds.</p>
            <p>• <strong>Fort Sterling (Mountain):</strong> Production bonus for Turnips, Winter Herbs, Goats.</p>
            <p>• <strong>Lymhurst (Forest):</strong> Production bonus for Carrots, Arcane Agaric, Pigs.</p>
            <p>• <strong>Martlock (Highland):</strong> Production bonus for Potatoes, Cows, Horses.</p>
            <p>• <strong>Thetford (Swamp):</strong> Production bonus for Cabbage, Rare Herbs, Swamp Animals.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
