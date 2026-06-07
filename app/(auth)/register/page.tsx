'use client';

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  IconUser, IconMail, IconLock, IconServer, IconTrophy, 
  IconCalendar, IconFlag, IconLanguage, IconArrowLeft, 
  IconArrowRight, IconCheck, IconShield, IconSword, 
  IconHeartbeat, IconTarget, IconEye, IconEyeOff 
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import bgImage from "@/public/assets/background/ao-login.webp";

// Import the reusable Image Upload Component
import ImageUpload from "@/components/customComp/ImageUpload";

interface FormData {
  characterName: string;
  email: string;
  password: string;
  confirmPassword: string;
  server: string;
  totalFame: string;
  gameStartDate: string;
  mainRole: string;
  subRole: string;
  nationality: string;
  language: string;
  selectedLocalAvatar: string;
}

const localAvatars = [
  { id: "avatar1", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Warrior", name: "Warrior" },
  { id: "avatar2", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mage", name: "Mage" },
  { id: "avatar3", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ranger", name: "Ranger" },
  { id: "avatar4", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Healer", name: "Healer" },
  { id: "avatar5", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tank", name: "Tank" },
  { id: "avatar6", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rogue", name: "Rogue" },
  { id: "avatar7", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paladin", name: "Paladin" },
  { id: "avatar8", url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Warlock", name: "Warlock" },
];

const characterStatsPreviews = [
  { id: "stats1", name: "Combat Stats", url: "https://via.placeholder.com/600x280/0f172a/22d3ee?text=COMBAT+STATS" },
  { id: "stats2", name: "Gathering", url: "https://via.placeholder.com/600x280/0f172a/22d3ee?text=GATHERING" },
  { id: "stats3", name: "Crafting", url: "https://via.placeholder.com/600x280/0f172a/22d3ee?text=CRAFTING" },
  { id: "stats4", name: "PvP Record", url: "https://via.placeholder.com/600x280/0f172a/22d3ee?text=PVP+RECORD" },
];

const roles = [
  { value: "tank", label: "Tank", icon: <IconShield size={18} /> },
  { value: "healer", label: "Healer", icon: <IconHeartbeat size={18} /> },
  { value: "dps", label: "DPS", icon: <IconSword size={18} /> },
  { value: "support", label: "Support", icon: <IconTarget size={18} /> },
  { value: "gatherer", label: "Gatherer", icon: <IconTarget size={18} /> },
  { value: "crafter", label: "Crafter", icon: <IconTarget size={18} /> },
];

const servers = ["asia", "europe", "america"];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [characterStatsUrl, setCharacterStatsUrl] = useState<string>("");

  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    characterName: "",
    email: "",
    password: "",
    confirmPassword: "",
    server: "",
    totalFame: "",
    gameStartDate: "",
    mainRole: "",
    subRole: "",
    nationality: "",
    language: "",
    selectedLocalAvatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServerSelect = (server: string) => {
    setFormData(prev => ({ ...prev, server }));
  };

  const handleLocalAvatarSelect = (url: string) => {
    setFormData(prev => ({ ...prev, selectedLocalAvatar: url }));
    setAvatarPreview(url);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      return !!(formData.characterName && formData.email && formData.password && 
                formData.server && formData.password === formData.confirmPassword);
    }
    if (step === 2) return !!formData.totalFame;
    if (step === 3) return !!(formData.mainRole && formData.nationality && formData.language);
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const registrationData = {
      ...formData,
      avatarUrl: avatarPreview,
      characterStatsUrl: characterStatsUrl,
    };
    
    console.log("Final Registration Data:", registrationData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert("Registration Successful! (Demo)");
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        {/* <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" /> */}
        <Image src={bgImage} alt="Background" fill className="object-cover brightness-50" priority />
      </div>

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          {/* Progress Steps */}
          <div className="mb-10 flex justify-center">
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    step >= s 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-border bg-muted/20 text-muted-foreground"
                  }`}>
                    {step > s ? <IconCheck size={18} /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`h-[2px] w-12 mx-1 transition-all ${
                      step > s ? "bg-primary" : "bg-border"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-xl">
            <form onSubmit={handleSubmit} className="p-8 sm:p-12">
              {/* Header */}
              <div className="mb-10 text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-4xl">🛡️</span>
                </div>
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Join Albion Game</h1>
                <p className="mt-2 text-muted-foreground">Create your legend in Albion Online</p>
              </div>

              {/* ==================== STEP 1 ==================== */}
              {step === 1 && (
                <div className="space-y-8">
                  {/* Avatar Section */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-foreground/70">Character Avatar</label>
                    <div className="flex gap-3 mb-6">
                      <button type="button" onClick={() => setFormData(p => ({...p, selectedLocalAvatar: ""}))} 
                        className={`flex-1 rounded-xl py-3 text-sm font-medium transition-all ${
                          !formData.selectedLocalAvatar 
                            ? "bg-primary text-primary-foreground" 
                            : "border border-border bg-muted/30 text-muted-foreground hover:bg-muted/50"
                        }`}>
                        Gallery
                      </button>
                      <button type="button" onClick={() => avatarInputRef.current?.click()}
                        className={`flex-1 rounded-xl py-3 text-sm font-medium transition-all ${
                          formData.selectedLocalAvatar 
                            ? "bg-primary text-primary-foreground" 
                            : "border border-border bg-muted/30 text-muted-foreground hover:bg-muted/50"
                        }`}>
                        Custom Upload
                      </button>
                    </div>

                    {!formData.selectedLocalAvatar ? (
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                        {localAvatars.map(avatar => (
                          <button key={avatar.id} type="button" onClick={() => handleLocalAvatarSelect(avatar.url)}
                            className={`group relative aspect-square overflow-hidden rounded-xl border-2 transition-all hover:scale-105 ${
                              avatarPreview === avatar.url ? "border-primary ring-2 ring-primary/50" : "border-border"
                            }`}>
                            <img src={avatar.url} alt={avatar.name} className="h-full w-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 p-1.5 text-center text-[10px] font-medium text-foreground/80">
                              {avatar.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div className="relative h-40 w-40 rounded-2xl overflow-hidden border-2 border-primary ring-2 ring-primary/50">
                          <img src={avatarPreview!} alt="Avatar" className="h-full w-full object-cover" />
                        </div>
                      </div>
                    )}

                    <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-1.5 block text-sm text-foreground/70">Character Name *</label>
                      <div className="relative">
                        <IconUser className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                        <input 
                          name="characterName" 
                          value={formData.characterName} 
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                          placeholder="Your Legend" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm text-foreground/70">Email *</label>
                      <div className="relative">
                        <IconMail className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                          placeholder="you@albion.com" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-1.5 block text-sm text-foreground/70">Password *</label>
                      <div className="relative">
                        <IconLock className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                        <input 
                          type={showPassword ? "text" : "password"} 
                          name="password" 
                          value={formData.password} 
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 pr-11 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                          placeholder="••••••••" 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)} 
                          className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm text-foreground/70">Confirm Password *</label>
                      <div className="relative">
                        <IconLock className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          name="confirmPassword" 
                          value={formData.confirmPassword} 
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 pr-11 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                          placeholder="••••••••" 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                          className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm text-foreground/70">Server *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {servers.map(srv => (
                        <button key={srv} type="button" onClick={() => handleServerSelect(srv)}
                          className={`rounded-xl border py-4 text-sm font-medium transition-all ${
                            formData.server === srv 
                              ? "border-primary bg-primary/10 text-primary" 
                              : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/50"
                          }`}>
                          {srv.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== STEP 2 ==================== */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <label className="mb-1.5 block text-sm text-foreground/70">Total Fame *</label>
                    <div className="relative">
                      <IconTrophy className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                      <input 
                        type="number" 
                        name="totalFame" 
                        value={formData.totalFame} 
                        onChange={handleChange}
                        className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                        placeholder="124890" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-foreground/70">Character Stats Preview</label>
                    
                    <div className="mb-6">
                      <ImageUpload
                        onUploadComplete={(url) => setCharacterStatsUrl(url)}
                        folder="character-stats"
                        label="Upload Your Stats Screenshot"
                      />
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">OR choose from presets:</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {characterStatsPreviews.map((stat) => (
                        <button
                          key={stat.id}
                          type="button"
                          onClick={() => setCharacterStatsUrl(stat.url)}
                          className={`overflow-hidden rounded-xl border-2 transition-all hover:scale-[1.02] ${
                            characterStatsUrl === stat.url ? "border-primary ring-2 ring-primary/50" : "border-border"
                          }`}
                        >
                          <img 
                            src={stat.url} 
                            alt={stat.name}
                            className="w-full h-32 object-cover" />
                          <div className="p-3 text-center text-sm text-foreground/80 bg-muted/30">{stat.name}</div>
                        </button>
                      ))}
                    </div>

                    {characterStatsUrl && (
                      <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border">
                        <p className="text-primary text-sm flex items-center gap-2 mb-3">
                          <IconCheck size={16} /> Stats Preview Ready
                        </p>
                        <img src={characterStatsUrl} alt="Stats Preview" className="rounded-lg border border-border w-full" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ==================== STEP 3 ==================== */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-foreground/70">Main Role *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {roles.map(role => (
                        <button key={role.value} type="button"
                          onClick={() => setFormData(p => ({...p, mainRole: role.value}))}
                          className={`flex items-center justify-center gap-3 rounded-xl border p-4 transition-all ${
                            formData.mainRole === role.value 
                              ? "border-primary bg-primary/10 text-primary" 
                              : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/50"
                          }`}>
                          {role.icon}
                          <span>{role.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="mb-1.5 block text-sm text-foreground/70">Nationality *</label>
                      <div className="relative">
                        <IconFlag className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                        <input 
                          name="nationality" 
                          value={formData.nationality} 
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                          placeholder="e.g. United States" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm text-foreground/70">Primary Language *</label>
                      <div className="relative">
                        <IconLanguage className="absolute left-4 top-3.5 text-muted-foreground" size={18} />
                        <input 
                          name="language" 
                          value={formData.language} 
                          onChange={handleChange}
                          className="w-full rounded-xl border border-border bg-muted/30 py-3 pl-11 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
                          placeholder="English" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== STEP 4 ==================== */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground text-center">Review Your Legend</h3>
                  <div className="space-y-4 text-foreground/80">
                    <div className="rounded-xl bg-muted/30 p-6 border border-border">
                      <h4 className="font-semibold text-primary mb-3">Character Info</h4>
                      <p className="text-foreground"><strong>Name:</strong> {formData.characterName}</p>
                      <p className="text-foreground"><strong>Server:</strong> {formData.server.toUpperCase()}</p>
                      {avatarPreview && <img src={avatarPreview} alt="Avatar" className="h-20 w-20 mt-3 rounded-full object-cover border border-border" />}
                    </div>

                    <div className="rounded-xl bg-muted/30 p-6 border border-border">
                      <h4 className="font-semibold text-primary mb-3">Game Progress</h4>
                      <p className="text-foreground"><strong>Total Fame:</strong> {Number(formData.totalFame).toLocaleString()}</p>
                      {characterStatsUrl && (
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground mb-2">Stats Preview:</p>
                          <img src={characterStatsUrl} alt="Stats" className="rounded-lg border border-border" />
                        </div>
                      )}
                    </div>

                    <div className="rounded-xl bg-muted/30 p-6 border border-border">
                      <h4 className="font-semibold text-primary mb-3">Role & Preferences</h4>
                      <p className="text-foreground"><strong>Main Role:</strong> {formData.mainRole}</p>
                      <p className="text-foreground"><strong>Nationality:</strong> {formData.nationality}</p>
                      <p className="text-foreground"><strong>Language:</strong> {formData.language}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-12 flex gap-4">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                    <IconArrowLeft className="mr-2" size={18} /> Back
                  </Button>
                )}
                
                {step < 4 ? (
                  <Button type="button" onClick={handleNext} disabled={!validateStep()} className="flex-1">
                    Continue <IconArrowRight className="ml-2" size={18} />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Forging Your Legend..." : "Complete Registration"}
                  </Button>
                )}
              </div>
            </form>
          </div>

          <p className="mt-6 text-center text-muted-foreground text-sm">
            Already a citizen? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}