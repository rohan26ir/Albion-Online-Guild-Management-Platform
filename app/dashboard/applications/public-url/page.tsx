'use client';

import { useState } from 'react';
import {
  IconLink,
  IconCopy,
  IconCheck,
  IconShare,
  IconExternalLink,
  IconBrandDiscord,
  IconShield,
  IconSettings,
  IconEye,
} from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PublicUrlGeneratorPage() {
  const [guildSlug, setGuildSlug] = useState('my-guild');
  const [copied, setCopied] = useState(false);
  const [minIp, setMinIp] = useState('1300');
  const [requireDiscord, setRequireDiscord] = useState(true);
  const [requireScreenshot, setRequireScreenshot] = useState(true);
  const [discordWebhook, setDiscordWebhook] = useState('');
  const [webhookSaved, setWebhookSaved] = useState(false);

  const publicUrl = `https://albiongame.netlify.app/apply?guild=${encodeURIComponent(guildSlug)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <IconLink className="size-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Public Application URL Generator
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Generate and configure a public recruitment application link to share on Discord, Reddit, and guild forums.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/applications">
            <Button variant="outline" className="text-xs">
              View All Applications
            </Button>
          </Link>
        </div>
      </div>

      {/* Generated Link Banner */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <IconShare className="size-4 text-primary" />
            Your Shareable Application URL
          </CardTitle>
          <CardDescription>
            Share this URL with recruits. Submissions will automatically appear in your review queue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Input
              readOnly
              value={publicUrl}
              className="bg-muted/40 font-mono text-xs text-foreground border-border select-all"
            />
            <Button onClick={handleCopy} className="w-full sm:w-auto shrink-0 gap-2 text-xs">
              {copied ? (
                <>
                  <IconCheck className="size-4 text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <IconCopy className="size-4" /> Copy Link
                </>
              )}
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto shrink-0 gap-2 text-xs">
              <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                <IconEye className="size-4" /> Preview Form
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Custom Slug:</span>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-mono">/apply?guild=</span>
              <Input
                value={guildSlug}
                onChange={(e) => setGuildSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="h-7 w-44 font-mono text-xs bg-background"
                placeholder="guild-name"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Form Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Requirements */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconSettings className="size-4 text-primary" />
              Recruitment Requirements
            </CardTitle>
            <CardDescription>Configure the questions recruits must answer when applying.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Minimum Item Power (IP) Benchmark
              </label>
              <Input
                type="number"
                value={minIp}
                onChange={(e) => setMinIp(e.target.value)}
                placeholder="1300"
                className="bg-background text-xs"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Applicants below this IP will be warned or asked for secondary spec.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-border">
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="font-medium text-foreground">Require Discord Handle & Microphone</span>
                <input
                  type="checkbox"
                  checked={requireDiscord}
                  onChange={(e) => setRequireDiscord(e.target.checked)}
                  className="size-4 rounded border-border"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <span className="font-medium text-foreground">Require Character Stats Screenshot</span>
                <input
                  type="checkbox"
                  checked={requireScreenshot}
                  onChange={(e) => setRequireScreenshot(e.target.checked)}
                  className="size-4 rounded border-border"
                />
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Discord Webhook Integration */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IconBrandDiscord className="size-4 text-indigo-400" />
              Discord Notification Webhook
            </CardTitle>
            <CardDescription>
              Receive instant alerts in your officer Discord channel when a player submits an application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveWebhook} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Discord Webhook URL
                </label>
                <Input
                  type="url"
                  value={discordWebhook}
                  onChange={(e) => setDiscordWebhook(e.target.value)}
                  placeholder="https://discord.com/api/webhooks/..."
                  className="bg-background font-mono text-xs"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  In Discord: Channel Settings &gt; Integrations &gt; Webhooks &gt; New Webhook.
                </p>
              </div>

              <Button type="submit" size="sm" className="text-xs">
                {webhookSaved ? 'Webhook Saved!' : 'Save Webhook'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
