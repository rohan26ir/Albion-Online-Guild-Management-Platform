import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconShield, IconUsers, IconCoin } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: 'Guild Island Permissions & Settings | Albion Game',
  description: 'Guild island roles, building rights, chest security, co-owner permissions, and guild tax management in Albion Online.',
};

export default function GuildOthersPage() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Guild Island Permissions & Settings</h1>
          <Badge variant="outline" className="border-slate-500/40 bg-slate-500/10 text-slate-400 font-semibold">
            Security & Roles
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Managing guild roles, bank tab permissions, crafting rights, and visitor access control.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconShield className="size-5 text-blue-400" />
              Role-Based Island Access
            </CardTitle>
            <CardDescription>Configuring access rules tied to Guild Ranks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• <strong>Guild Master:</strong> Unrestricted control over all island plots, upgrades, and demolition.</p>
            <p>• <strong>Right Hand / Officers:</strong> Can be granted builder and chest management permissions.</p>
            <p>• <strong>Members:</strong> Granted visitor and associate crafting access with custom tax rates.</p>
            <p>• <strong>Alliance Members:</strong> Can be granted visitor access for cross-guild meetings and trade.</p>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <IconCoin className="size-5 text-amber-500" />
              Guild Bank Vaults & Station Taxes
            </CardTitle>
            <CardDescription>Securing guild assets and managing nutrition fees.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>• Place Guild Chests inside the Guild Hall with granular tab-by-tab access rules.</p>
            <p>• Set crafting station user fees (Associate, Member, Public) to pay for station food supply.</p>
            <p>• Lock designated laborer houses to officers or journal managers.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
