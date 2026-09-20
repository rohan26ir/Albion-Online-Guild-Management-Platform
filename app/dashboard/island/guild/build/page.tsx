import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconHammer, IconBuildingStore, IconShield } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Guild Island Construction & Build | Albion Game',
  description: 'Guild Hall construction costs, stone block requirements, and shared workshop building rules for Guild Islands in Albion Online.',
};

export default function GuildBuildPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Guild Island Construction & Building</h1>
          <Badge variant="outline" className="border-orange-500/40 bg-orange-500/10 text-orange-400 font-semibold">
            Guild Construction
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Constructing the central Guild Hall, guild houses, and private crafting stations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconShield className="size-5 text-primary" />
              Guild Hall Construction
            </CardTitle>
            <CardDescription>Constructing and upgrading the central Guild Hall structure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• The Guild Hall occupies the massive central plot in the center of the island.</p>
            <p>• Requires significant quantities of <strong>Stone Blocks</strong> matching the Hall tier.</p>
            <p>• Houses up to <strong>15 Laborers</strong> in a single T8 Guild Hall along with massive guild chests.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconHammer className="size-5 text-orange-400" />
              Shared Workshop Placement
            </CardTitle>
            <CardDescription>Building guild-funded crafting stations to avoid city taxes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Place Mage Towers, Warrior Forges, and Hunter's Lodges on multipurpose plots.</p>
            <p>• Use small plots for Smelters, Weavers, and Tanners to refine raw materials.</p>
            <p>• Associate nutrition fee can be set to 0% for guild members while charging visitors.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
