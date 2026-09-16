'use client';

import { useState } from 'react';
import {
  IconFileDescription,
  IconUserCheck,
  IconUserX,
  IconClock,
  IconTrash,
  IconEdit,
  IconPlus,
  IconLink,
  IconSearch,
  IconFilter,
  IconShield,
  IconBrandDiscord,
  IconCheck,
  IconX,
  IconEye,
} from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface Application {
  id: string;
  characterName: string;
  discordTag: string;
  role: 'Tank' | 'Healer' | 'DPS' | 'Support';
  avgIp: number;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes: string;
  killFame: string;
}

const initialApplications: Application[] = [
  {
    id: 'APP-101',
    characterName: 'BloodThirster',
    discordTag: 'bloodthirster#1234',
    role: 'Tank',
    avgIp: 1420,
    submittedAt: '2026-09-15 18:30',
    status: 'Pending',
    notes: 'Experienced shotcaller, plays heavy mace and grailseeker.',
    killFame: '45M',
  },
  {
    id: 'APP-102',
    characterName: 'HolyHeals',
    discordTag: 'holyheals#9876',
    role: 'Healer',
    avgIp: 1380,
    submittedAt: '2026-09-15 14:15',
    status: 'Pending',
    notes: 'Main fallen staff & holy touch, active during EU prime time.',
    killFame: '18M',
  },
  {
    id: 'APP-103',
    characterName: 'FrostBite',
    discordTag: 'frostbite#4521',
    role: 'DPS',
    avgIp: 1480,
    submittedAt: '2026-09-14 21:00',
    status: 'Pending',
    notes: 'Permafrost & glacial staff spec 120, ZvZ ready.',
    killFame: '82M',
  },
  {
    id: 'APP-104',
    characterName: 'ShadowDagger',
    discordTag: 'shadow#1122',
    role: 'DPS',
    avgIp: 1350,
    submittedAt: '2026-09-13 11:45',
    status: 'Approved',
    notes: 'Approved by Warmaster, invited to guild Discord.',
    killFame: '28M',
  },
  {
    id: 'APP-105',
    characterName: 'LootGoblin',
    discordTag: 'goblin#7744',
    role: 'Support',
    avgIp: 1150,
    submittedAt: '2026-09-12 09:20',
    status: 'Rejected',
    notes: 'Did not meet minimum IP requirement (1300 required).',
    killFame: '2M',
  },
];

export default function DashboardApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Application Form State
  const [newChar, setNewChar] = useState('');
  const [newDiscord, setNewDiscord] = useState('');
  const [newRole, setNewRole] = useState<'Tank' | 'Healer' | 'DPS' | 'Support'>('DPS');
  const [newIp, setNewIp] = useState('1350');
  const [newNotes, setNewNotes] = useState('');

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
    }
  };

  const handleSaveNotes = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, notes: editNotes } : app))
    );
    setEditingId(null);
  };

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChar) return;

    const newEntry: Application = {
      id: `APP-${Date.now().toString().slice(-3)}`,
      characterName: newChar,
      discordTag: newDiscord || 'Not provided',
      role: newRole,
      avgIp: parseInt(newIp, 10) || 1300,
      submittedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'Pending',
      notes: newNotes || 'Manual applicant entry',
      killFame: '0M',
    };

    setApplications([newEntry, ...applications]);
    setShowCreateModal(false);
    setNewChar('');
    setNewDiscord('');
    setNewNotes('');
  };

  const filteredApps = applications.filter((app) => {
    const matchesFilter = filter === 'All' || app.status === filter;
    const matchesSearch =
      app.characterName.toLowerCase().includes(search.toLowerCase()) ||
      app.discordTag.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = applications.filter((a) => a.status === 'Pending').length;
  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const rejectedCount = applications.filter((a) => a.status === 'Rejected').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <IconFileDescription className="size-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Guild Recruitment Applications
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Review incoming applicants, accept or reject candidates, and generate shareable recruitment form links.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/applications/public-url">
            <Button variant="outline" className="gap-2 text-xs">
              <IconLink className="size-4 text-primary" /> Generate Public Form URL
            </Button>
          </Link>
          <Button onClick={() => setShowCreateModal(true)} className="gap-2 text-xs">
            <IconPlus className="size-4" /> Add Application
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card
          onClick={() => setFilter('All')}
          className={`cursor-pointer transition-all border-border bg-card ${
            filter === 'All' ? 'ring-1 ring-primary' : ''
          }`}
        >
          <CardHeader className="pb-1">
            <CardTitle className="text-xs uppercase text-muted-foreground">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{applications.length}</div>
          </CardContent>
        </Card>

        <Card
          onClick={() => setFilter('Pending')}
          className={`cursor-pointer transition-all border-border bg-card ${
            filter === 'Pending' ? 'ring-1 ring-amber-500' : ''
          }`}
        >
          <CardHeader className="pb-1">
            <CardTitle className="text-xs uppercase text-amber-500 flex items-center justify-between">
              Pending Reviews
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card
          onClick={() => setFilter('Approved')}
          className={`cursor-pointer transition-all border-border bg-card ${
            filter === 'Approved' ? 'ring-1 ring-emerald-500' : ''
          }`}
        >
          <CardHeader className="pb-1">
            <CardTitle className="text-xs uppercase text-emerald-500">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{approvedCount}</div>
          </CardContent>
        </Card>

        <Card
          onClick={() => setFilter('Rejected')}
          className={`cursor-pointer transition-all border-border bg-card ${
            filter === 'Rejected' ? 'ring-1 ring-destructive' : ''
          }`}
        >
          <CardHeader className="pb-1">
            <CardTitle className="text-xs uppercase text-destructive">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{rejectedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by character, discord, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((status) => (
            <Button
              key={status}
              size="sm"
              variant={filter === status ? 'default' : 'outline'}
              onClick={() => setFilter(status)}
              className="text-xs"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Character</th>
                <th className="px-4 py-3">Discord</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Avg IP</th>
                <th className="px-4 py-3">Kill Fame</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-accent/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <IconShield className="size-4 text-primary shrink-0" />
                        <span>{app.characterName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-1">
                        <IconBrandDiscord className="size-3.5 text-indigo-400 shrink-0" />
                        <span>{app.discordTag}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <span className="px-2 py-0.5 rounded bg-muted font-medium text-foreground">
                        {app.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-bold tabular-nums text-foreground">
                      {app.avgIp} IP
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-emerald-500 tabular-nums">
                      {app.killFame}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{app.submittedAt}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold uppercase ${
                          app.status === 'Approved'
                            ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                            : app.status === 'Rejected'
                            ? 'bg-destructive/15 text-destructive border border-destructive/30'
                            : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {app.status === 'Pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(app.id, 'Approved')}
                              className="h-7 px-2 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                              title="Accept Application"
                            >
                              <IconCheck className="size-3.5" /> Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(app.id, 'Rejected')}
                              className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                              title="Reject Application"
                            >
                              <IconX className="size-3.5" /> Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedApp(app)}
                          className="h-7 px-2 text-xs"
                          title="View Details"
                        >
                          <IconEye className="size-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(app.id);
                            setEditNotes(app.notes);
                          }}
                          className="h-7 px-2 text-xs"
                          title="Edit Notes"
                        >
                          <IconEdit className="size-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(app.id)}
                          className="h-7 px-2 text-destructive hover:bg-destructive/10"
                          title="Delete Application"
                        >
                          <IconTrash className="size-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Details / Notes Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-lg w-full border-border bg-card shadow-lg">
            <CardHeader className="border-b border-border pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <IconShield className="size-5 text-primary" />
                  Application: {selectedApp.characterName}
                </CardTitle>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-bold text-foreground">{selectedApp.status}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Discord:</span>
                  <p className="font-mono text-foreground">{selectedApp.discordTag}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Role:</span>
                  <p className="font-semibold text-foreground">{selectedApp.role}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Avg IP:</span>
                  <p className="font-bold text-foreground">{selectedApp.avgIp} IP</p>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground block mb-1">Applicant Notes & Comments:</span>
                <p className="p-3 bg-muted/40 rounded border border-border text-foreground leading-relaxed">
                  {selectedApp.notes}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                {selectedApp.status === 'Pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => {
                        handleStatusChange(selectedApp.id, 'Approved');
                        setSelectedApp(null);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-xs gap-1"
                    >
                      <IconCheck className="size-3.5" /> Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        handleStatusChange(selectedApp.id, 'Rejected');
                        setSelectedApp(null);
                      }}
                      className="text-xs gap-1"
                    >
                      <IconX className="size-3.5" /> Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline" onClick={() => setSelectedApp(null)} className="text-xs">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Notes Dialog */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-border bg-card shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Update Application Notes</CardTitle>
              <CardDescription>Edit officer feedback and review comments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={4}
                className="w-full bg-background border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="text-xs">
                  Cancel
                </Button>
                <Button size="sm" onClick={() => handleSaveNotes(editingId)} className="text-xs">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Manual Create Application Dialog */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-border bg-card shadow-lg">
            <CardHeader className="pb-2 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">New Join Application</CardTitle>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleCreateApplication} className="space-y-3 text-xs">
                <div>
                  <label className="text-xs font-semibold block mb-1">Character Name</label>
                  <Input
                    required
                    value={newChar}
                    onChange={(e) => setNewChar(e.target.value)}
                    placeholder="e.g. IronFist"
                    className="bg-background text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Discord Tag</label>
                  <Input
                    value={newDiscord}
                    onChange={(e) => setNewDiscord(e.target.value)}
                    placeholder="e.g. ironfist#1234"
                    className="bg-background text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold block mb-1">Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
                      className="w-full h-9 bg-background border border-border rounded px-2 text-xs"
                    >
                      <option value="DPS">DPS</option>
                      <option value="Tank">Tank</option>
                      <option value="Healer">Healer</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1">Average IP</label>
                    <Input
                      type="number"
                      value={newIp}
                      onChange={(e) => setNewIp(e.target.value)}
                      placeholder="1350"
                      className="bg-background text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold block mb-1">Notes</label>
                  <textarea
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    rows={3}
                    placeholder="Interview details, weapon specs..."
                    className="w-full bg-background border border-border rounded p-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-border">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="text-xs">
                    Submit Application
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
