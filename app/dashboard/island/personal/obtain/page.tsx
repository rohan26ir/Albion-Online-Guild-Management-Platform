import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconBuildingStore, IconCheck, IconCoin, IconMapPin } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'How to Obtain Personal Island | Albion Game',
  description: 'Requirements, 30-day Premium rules, and step-by-step merchant guide to purchasing your first personal island in Albion Online.',
};

export default function PersonalObtainPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">How to Obtain a Personal Island</h1>
          <Badge variant="outline" className="border-purple-500/40 bg-purple-500/10 text-purple-400 font-semibold">
            Island Merchant
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Requirements, costs, and city merchant locations to buy your first player island.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconCheck className="size-5 text-emerald-400" />
              Purchase Requirements
            </CardTitle>
            <CardDescription>Eligibility criteria to buy a Personal Island.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• <strong>30 Days of Premium:</strong> Must be activated on your character at least once (bought with Silver, Gold, or real currency).</p>
            <p>• <strong>Silver Cost:</strong> 20,000 Silver for your first island (or 1,000,000 Silver standard for additional islands).</p>
            <p>• <strong>Permanent Access:</strong> Once purchased, the island remains accessible even after Premium expires.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconMapPin className="size-5 text-primary" />
              Where to Buy
            </CardTitle>
            <CardDescription>Locating the Island Merchant NPC in major Royal Cities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Visit any Royal City: <strong>Bridgewatch, Fort Sterling, Lymhurst, Martlock, Thetford, or Caerleon</strong>.</p>
            <p>• Look for the anchor icon on your mini-map (Island Merchant NPC).</p>
            <p>• Speak to the merchant, click "Buy Personal Island", and confirm purchase.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
