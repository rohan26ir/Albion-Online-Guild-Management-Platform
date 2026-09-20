import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBuildingStore, IconCheck, IconShield, IconMapPin } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'How to Obtain Guild Island | Albion Game',
  description: 'Guild creation requirements, island purchase costs, and choosing the optimal home city for your Guild Island in Albion Online.',
};

export default function GuildObtainPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">How to Obtain a Guild Island</h1>
          <Badge variant="outline" className="border-purple-500/40 bg-purple-500/10 text-purple-400 font-semibold">
            Guild Purchase
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Founding requirements, purchase silver, and city selection for your Guild headquarters.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconCheck className="size-5 text-emerald-400" />
              Founding Requirements
            </CardTitle>
            <CardDescription>Requirements to establish a Guild Island.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• <strong>Guild Leader / Permissions:</strong> You must have guild management rights to buy an island.</p>
            <p>• <strong>Purchase Cost:</strong> 5,000,000 Silver for Tier 1 Guild Island creation.</p>
            <p>• <strong>No Personal Premium Requirement:</strong> Unlike personal islands, buying a guild island does not require active personal premium status.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconMapPin className="size-5 text-primary" />
              Strategic City Selection
            </CardTitle>
            <CardDescription>Choosing the best Royal City for your guild base.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Choose the city closest to your guild's primary Outlands (Black Zone) portal lock.</p>
            <p>• Consider local market volume for supplying crafting stations and food.</p>
            <p>• Visit the Island Merchant in that city and select "Buy Guild Island".</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
