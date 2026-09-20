import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconUsers, IconBook, IconShield, IconCoin } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Guild Island Laborers & Management | Albion Game',
  description: 'Guild Hall laborer setup, guild journals, furniture happiness, and large-scale silver profit optimization in Albion Online.',
};

export default function GuildFarmLaborersPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Guild Island Laborers & Management</h1>
          <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-500 font-semibold">
            Laborer Operations
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Managing large-scale laborer houses, Guild Hall journals, and silver revenue streams.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconShield className="size-5 text-blue-400" />
              Guild Hall Laborers
            </CardTitle>
            <CardDescription>Centralized laborer processing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• A Tier 8 Guild Hall can hold up to <strong>15 Laborers</strong> in one room.</p>
            <p>• Requires Tier 8 Guild Beds, Guild Tables, and General Trophies.</p>
            <p>• Great for running Tinker, Fletcher, or Mercenary journals in bulk.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconUsers className="size-5 text-emerald-400" />
              Guild House Laborers
            </CardTitle>
            <CardDescription>Building plot laborer expansion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Constructing 19 Tier 8 houses adds up to <strong>57 additional laborers</strong>.</p>
            <p>• Total island laborer capacity reaches <strong>72+ Laborers</strong> across the island.</p>
            <p>• Yields substantial passive refined material returns every 22 hours.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconBook className="size-5 text-amber-500" />
              Journal Automation
            </CardTitle>
            <CardDescription>Managing member journal distribution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Guild members deposit filled crafting/PvP journals into guild dropbox chests.</p>
            <p>• Designated island managers distribute journals and process material returns.</p>
            <p>• Profits can be split between member payouts and the Guild Bank treasury.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
