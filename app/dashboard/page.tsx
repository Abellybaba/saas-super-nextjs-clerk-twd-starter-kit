// filepath: /Users/abelokoh/Documents/GitHub/vlink/app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Edit,
  Eye,
  Facebook,
  Github,
  Globe,
  GripVertical,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Mail,
  MessageSquare,
  Mic,
  MousePointer,
  Palette,
  Pin,
  Plus,
  BookOpen,
  Send,
  Smartphone,
  Focus,
  CircleFadingPlus,
  Trash2,
  TrendingUp,
  Twitch,
  Twitter,
  Upload,
  User,
  Users,
  Youtube,
  Music,
  Rss,
  Briefcase,
  ClipboardList,
  Video,
  Clapperboard,
  Podcast,
  Radio,
  FileText,
  Paintbrush,
  Notebook,
  Apple,
  Download,
  FlaskConical,
} from "lucide-react";
import NeobrutalismTemplate from "@/components/templates/NeobrutalismTemplate";
import GlassmorphismTemplate from "@/components/templates/GlassmorphismTemplate";
import Vcard7Template from "@/components/templates/Vcard7Template";

// Types
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks: number;
  isActive: boolean;
  icon?: string;
  featured?: boolean;
}

export interface UserProfile {
  id: string;
  displayName: string;
  bio: string;
  avatar: string;
  username: string;
  verified: boolean;
  theme: string;
  template: string;
  links: LinkItem[];
  views: number;
}

export interface Theme {
  id: string;
  name: string;
  gradient: string;
  bg: string;
}

// Constants
export const iconMap: { [key: string]: React.ComponentType<any> } = {
  globe: Globe,
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  github: Github,
  mail: Mail,
  calendar: Calendar,
  facebook: Facebook,
  linkedin: Linkedin,
  tiktok: CircleFadingPlus,
  pinterest: Pin,
  snapchat: Focus,
  reddit: BookOpen,
  twitch: Twitch,
  discord: MessageSquare,
  clubhouse: Mic,
  telegram: Send,
  whatsapp: MessageSquare,
  link: LinkIcon,
  spotify: Music,
  applemusic: Music,
  soundcloud: Music,
  deezer: Music,
  pandora: Music,
  audiomack: Music,
  medium: BookOpen,
  substack: BookOpen,
  wordpress: Rss,
  blogger: Rss,
  tumblr: Rss,
  "contact-form": ClipboardList,
  calendly: Calendar,
  "google-forms": ClipboardList,
  typeform: ClipboardList,
  jotform: ClipboardList,
  hubspot: Briefcase,
  vimeo: Video,
  reels: Clapperboard,
  podcast: Podcast,
  livestream: Radio,
  resume: FileText,
  behance: Paintbrush,
  dribbble: Paintbrush,
  notion: Notebook,
  appstore: Apple,
  playstore: Smartphone,
  apk: Download,
  testflight: FlaskConical,
};

const socialPlatforms = [
  {
    name: "Instagram",
    icon: "instagram",
    placeholder: "instagram_username",
    urlPrefix: "https://instagram.com/",
  },
  {
    name: "Twitter (X)",
    icon: "twitter",
    placeholder: "twitter_handle",
    urlPrefix: "https://twitter.com/",
  },
  {
    name: "TikTok",
    icon: "tiktok",
    placeholder: "@tiktok_handle",
    urlPrefix: "https://tiktok.com/",
  },
  {
    name: "YouTube",
    icon: "youtube",
    placeholder: "youtube_channel_url",
    urlPrefix: "",
  },
  {
    name: "Facebook",
    icon: "facebook",
    placeholder: "facebook_profile_url",
    urlPrefix: "",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    placeholder: "linkedin_profile_url",
    urlPrefix: "",
  },
  {
    name: "Pinterest",
    icon: "pinterest",
    placeholder: "pinterest_username",
    urlPrefix: "https://pinterest.com/",
  },
  {
    name: "Snapchat",
    icon: "snapchat",
    placeholder: "snapchat_username",
    urlPrefix: "https://snapchat.com/add/",
  },
  {
    name: "Reddit",
    icon: "reddit",
    placeholder: "u/reddit_username",
    urlPrefix: "https://reddit.com/",
  },
  {
    name: "Twitch",
    icon: "twitch",
    placeholder: "twitch_channel",
    urlPrefix: "https://twitch.tv/",
  },
  {
    name: "Discord",
    icon: "discord",
    placeholder: "discord_invite_link",
    urlPrefix: "",
  },
  {
    name: "Telegram",
    icon: "telegram",
    placeholder: "telegram_handle",
    urlPrefix: "https://t.me/",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    placeholder: "whatsapp_number_link (e.g., wa.me/1...)",
    urlPrefix: "https://",
  },
];

const musicPlatforms = [
  {
    name: "Spotify",
    icon: "spotify",
    placeholder: "artist/album/track URL",
    urlPrefix: "https://open.spotify.com/",
  },
  {
    name: "Apple Music",
    icon: "applemusic",
    placeholder: "artist/album/playlist URL",
    urlPrefix: "https://music.apple.com/",
  },
  {
    name: "SoundCloud",
    icon: "soundcloud",
    placeholder: "username",
    urlPrefix: "https://soundcloud.com/",
  },
  {
    name: "Deezer",
    icon: "deezer",
    placeholder: "artist/album/track URL",
    urlPrefix: "https://www.deezer.com/",
  },
  {
    name: "Pandora",
    icon: "pandora",
    placeholder: "artist/station URL",
    urlPrefix: "https://www.pandora.com/",
  },
  {
    name: "Audiomack",
    icon: "audiomack",
    placeholder: "artist/song/album URL",
    urlPrefix: "https://audiomack.com/",
  },
];

const blogPlatforms = [
  {
    name: "Personal Website",
    icon: "globe",
    placeholder: "yourwebsite.com",
    urlPrefix: "https://",
  },
  {
    name: "Medium",
    icon: "medium",
    placeholder: "@username or publication",
    urlPrefix: "https://medium.com/",
  },
  {
    name: "Substack",
    icon: "substack",
    placeholder: "username.substack.com",
    urlPrefix: "https://",
  },
  {
    name: "WordPress",
    icon: "wordpress",
    placeholder: "yourblog.wordpress.com",
    urlPrefix: "https://",
  },
  {
    name: "Blogger",
    icon: "blogger",
    placeholder: "yourblog.blogspot.com",
    urlPrefix: "https://",
  },
  {
    name: "Tumblr",
    icon: "tumblr",
    placeholder: "username.tumblr.com",
    urlPrefix: "https://",
  },
];

const videoPlatforms = [
  {
    name: "YouTube",
    icon: "youtube",
    placeholder: "channel_url or video_url",
    urlPrefix: "https://youtube.com/",
  },
  {
    name: "Vimeo",
    icon: "vimeo",
    placeholder: "vimeo.com/username",
    urlPrefix: "https://",
  },
  {
    name: "TikTok",
    icon: "tiktok",
    placeholder: "@username",
    urlPrefix: "https://tiktok.com/",
  },
  {
    name: "Reels/Shorts",
    icon: "reels",
    placeholder: "instagram.com/reel/...",
    urlPrefix: "https://",
  },
  {
    name: "Podcast",
    icon: "podcast",
    placeholder: "podcast_url (Apple, Spotify)",
    urlPrefix: "https://",
  },
  {
    name: "Live Stream",
    icon: "livestream",
    placeholder: "twitch.tv/ or youtube.com/live/..",
    urlPrefix: "https://",
  },
];

const professionalPlatforms = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    placeholder: "linkedin.com/in/username",
    urlPrefix: "https://",
  },
  {
    name: "Resume/CV",
    icon: "resume",
    placeholder: "Link to your PDF",
    urlPrefix: "https://",
  },
  {
    name: "Behance",
    icon: "behance",
    placeholder: "behance.net/username",
    urlPrefix: "https://",
  },
  {
    name: "Dribbble",
    icon: "dribbble",
    placeholder: "dribbble.com/username",
    urlPrefix: "https://",
  },
  {
    name: "GitHub",
    icon: "github",
    placeholder: "github.com/username",
    urlPrefix: "https://",
  },
  {
    name: "Notion",
    icon: "notion",
    placeholder: "your-page.notion.site",
    urlPrefix: "https://",
  },
];

const appPlatforms = [
  {
    name: "App Store",
    icon: "appstore",
    placeholder: "apps.apple.com/...",
    urlPrefix: "https://",
  },
  {
    name: "Google Play",
    icon: "playstore",
    placeholder: "play.google.com/store/...",
    urlPrefix: "https://",
  },
  {
    name: "APK Download",
    icon: "apk",
    placeholder: "Link to your .apk file",
    urlPrefix: "https://",
  },
  {
    name: "TestFlight",
    icon: "testflight",
    placeholder: "testflight.apple.com/join/...",
    urlPrefix: "https://",
  },
];

const contactPlatforms = [
  {
    name: "Email",
    icon: "mail",
    placeholder: "your@email.com",
    urlPrefix: "mailto:",
  },
  {
    name: "Calendly",
    icon: "calendly",
    placeholder: "calendly.com/your-name",
    urlPrefix: "https://",
  },
  {
    name: "Contact Form",
    icon: "contact-form",
    placeholder: "yourwebsite.com/contact",
    urlPrefix: "https://",
  },
  {
    name: "Google Forms",
    icon: "google-forms",
    placeholder: "docs.google.com/forms/...",
    urlPrefix: "https://",
  },
  {
    name: "Typeform",
    icon: "typeform",
    placeholder: "form.typeform.com/...",
    urlPrefix: "https://",
  },
  {
    name: "JotForm",
    icon: "jotform",
    placeholder: "form.jotform.com/...",
    urlPrefix: "https://",
  },
  {
    name: "HubSpot",
    icon: "hubspot",
    placeholder: "meetings.hubspot.com/...",
    urlPrefix: "https://",
  },
];

export const themes: Theme[] = [
  {
    id: "default",
    name: "Default",
    gradient: "from-teal-400 to-purple-500",
    bg: "bg-slate-900",
  },
  {
    id: "ocean",
    name: "Ocean",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-900",
  },
  {
    id: "sunset",
    name: "Sunset",
    gradient: "from-orange-500 to-pink-500",
    bg: "bg-orange-900",
  },
  {
    id: "forest",
    name: "Forest",
    gradient: "from-green-500 to-lime-500",
    bg: "bg-green-900",
  },
];

const templates = [
  {
    id: "neobrutalism",
    name: "Neo-Brutalism",
    component: NeobrutalismTemplate,
    thumbnail:
      "https://raw.githubusercontent.com/Abelokoh/vlink/main/public/templates/neobrutalism.png",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    component: GlassmorphismTemplate,
    thumbnail:
      "https://raw.githubusercontent.com/Abelokoh/vlink/main/public/templates/glassmorphism.png", // Placeholder
  },
  {
    id: "vcard7",
    name: "Modern vCard",
    component: Vcard7Template,
    thumbnail:
      "https://raw.githubusercontent.com/Abelokoh/vlink/main/public/templates/vcard.png", // Placeholder
  },
];

// --- MOCK DATA (In a real app, this would come from an API) ---
const initialProfiles: UserProfile[] = [
  {
    id: "1",
    displayName: "Abelly Baba",
    username: "abellybaba",
    bio: "Full-stack developer and content creator. 🚀",
    avatar: "/placeholder.svg",
    verified: true,
    theme: "ocean",
    template: "neobrutalism",
    views: 10450,
    links: [
      {
        id: "1",
        title: "My Portfolio",
        url: "https://portfolio.com",
        clicks: 1245,
        isActive: true,
        icon: "globe",
        featured: true,
      },
      {
        id: "2",
        title: "YouTube Channel",
        url: "https://youtube.com/@abellybaba",
        clicks: 889,
        isActive: true,
        icon: "youtube",
      },
    ],
  },
  {
    id: "2",
    displayName: "My Side Hustle",
    username: "sidehustle",
    bio: "A fun project I'm working on in my spare time.",
    avatar: "/placeholder.svg",
    verified: false,
    theme: "forest",
    template: "neobrutalism",
    views: 2340,
    links: [
      {
        id: "3",
        title: "Project Website",
        url: "https://sidehustle.dev",
        clicks: 450,
        isActive: true,
        icon: "link",
      },
    ],
  },
];

// --- Child Components ---

function StatsCards({
  totalViews,
  totalClicks,
}: {
  totalViews: number;
  totalClicks: number;
}) {
  const clickThroughRate =
    totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalViews.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          <MousePointer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalClicks.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Click-Through Rate
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clickThroughRate}%</div>
        </CardContent>
      </Card>
    </div>
  );
}

function LinksTab({
  links,
  onAddLink,
  onUpdateLink,
  onDeleteLink,
  onReorderLinks,
}: {
  links: LinkItem[];
  onAddLink: (link: Omit<LinkItem, "id" | "clicks" | "isActive">) => void;
  onUpdateLink: (id: string, updates: Partial<LinkItem>) => void;
  onDeleteLink: (id: string) => void;
  onReorderLinks: (reorderedLinks: LinkItem[]) => void;
}) {
  const [newLink, setNewLink] = useState({ title: "", url: "", icon: "link" });
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [selectedSocial, setSelectedSocial] = useState<any>(null);
  const [socialInputValue, setSocialInputValue] = useState("");
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("socials");

  const handleAddCustomLink = () => {
    if (newLink.title && newLink.url) {
      onAddLink({ ...newLink, featured: false });
      setNewLink({ title: "", url: "", icon: "link" });
    }
  };

  const handleAddSocialLink = () => {
    if (!selectedSocial || !socialInputValue) return;
    const url = selectedSocial.urlPrefix
      ? `${selectedSocial.urlPrefix}${socialInputValue}`
      : socialInputValue;
    onAddLink({
      title: selectedSocial.name,
      url,
      icon: selectedSocial.icon,
      featured: false,
    });
    setSocialInputValue("");
    setSocialModalOpen(false);
  };

  const handleUpdateLink = () => {
    if (editingLink) {
      onUpdateLink(editingLink.id, {
        title: editingLink.title,
        url: editingLink.url,
      });
      setEditingLink(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) =>
    setDraggedItem(id);
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem) return;
    const reordered = [...links];
    const draggedContent = links.find((l) => l.id === draggedItem);
    if (!draggedContent) return;
    const fromIndex = links.findIndex((l) => l.id === draggedItem);
    const toIndex = links.findIndex((l) => l.id === targetId);
    reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, draggedContent);
    onReorderLinks(reordered);
    setDraggedItem(null);
  };

  const getIconComponent = (iconName?: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || LinkIcon;
    return <Icon className="w-5 h-5 text-muted-foreground" />;
  };

  const addedSocialIcons = links.map((link) => link.icon);

  const renderPlatformGrid = (platforms: any[]) => {
    return (
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {platforms.map((platform) => {
          const isAdded = addedSocialIcons.includes(platform.icon);
          const IconComponent = iconMap[platform.icon];
          return (
            <button
              key={platform.name}
              disabled={isAdded}
              onClick={() => {
                if (isAdded) return;
                setSelectedSocial(platform);
                setSocialModalOpen(true);
              }}
              className={`relative flex flex-col items-center justify-center gap-2 p-3 border rounded-lg aspect-square transition-all ${
                isAdded
                  ? "bg-muted opacity-50 cursor-not-allowed"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {IconComponent ? (
                <IconComponent className="w-6 h-6" />
              ) : (
                <LinkIcon className="w-6 h-6" />
              )}
              <span className="text-xs text-center truncate">
                {platform.name}
              </span>
              {isAdded && (
                <div className="absolute top-1 right-1 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Dialog open={isSocialModalOpen} onOpenChange={setSocialModalOpen}>
        <Card>
          <Tabs
            defaultValue="socials"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <CardHeader>
              <CardTitle>Add New Link</CardTitle>
              <div className="w-full overflow-x-auto pb-2">
                <TabsList className="mt-2 inline-flex h-auto">
                  <TabsTrigger value="socials">Socials</TabsTrigger>
                  <TabsTrigger value="music">Music</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="professional">Portfolio</TabsTrigger>
                  <TabsTrigger value="blog">Blog</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="apps">Apps</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>

            <TabsContent value="socials" className="px-6 pb-6">
              <CardDescription className="mb-4">
                Quickly add links to your social media profiles.
              </CardDescription>
              {renderPlatformGrid(socialPlatforms)}
            </TabsContent>

            <TabsContent value="music" className="px-6 pb-6">
              <CardDescription className="mb-4">
                Link your music from your favorite streaming platforms.
              </CardDescription>
              {renderPlatformGrid(musicPlatforms)}
            </TabsContent>

            <TabsContent value="video" className="px-6 pb-6">
              <CardDescription className="mb-4">
                Showcase your video content and live streams.
              </CardDescription>
              {renderPlatformGrid(videoPlatforms)}
            </TabsContent>

            <TabsContent value="professional" className="px-6 pb-6">
              <CardDescription className="mb-4">
                Display your professional work and portfolio.
              </CardDescription>
              {renderPlatformGrid(professionalPlatforms)}
            </TabsContent>

            <TabsContent value="blog" className="px-6 pb-6">
              <CardDescription className="mb-4">
                Share your personal blog, website, or publications.
              </CardDescription>
              {renderPlatformGrid(blogPlatforms)}
            </TabsContent>

            <TabsContent value="contact" className="px-6 pb-6">
              <CardDescription className="mb-4">
                Make it easy for your audience to get in touch.
              </CardDescription>
              {renderPlatformGrid(contactPlatforms)}
            </TabsContent>

            <TabsContent value="apps" className="px-6 pb-6">
              <CardDescription className="mb-4">
                Provide links to download your applications.
              </CardDescription>
              {renderPlatformGrid(appPlatforms)}
            </TabsContent>

            <TabsContent value="custom" className="px-6 pb-6 space-y-4">
              <CardDescription>
                For any other websites or pages you want to share.
              </CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Title"
                  value={newLink.title}
                  onChange={(e) =>
                    setNewLink({ ...newLink, title: e.target.value })
                  }
                />
                <Input
                  placeholder="URL"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                />
                <select
                  value={newLink.icon}
                  onChange={(e) =>
                    setNewLink({ ...newLink, icon: e.target.value })
                  }
                  className="w-full p-2 border rounded-md bg-background text-sm"
                >
                  {Object.keys(iconMap).map((key) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleAddCustomLink}>
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Link
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
        <DialogContent>
          {selectedSocial && (
            <>
              <DialogHeader>
                <DialogTitle>Add {selectedSocial.name} Link</DialogTitle>
                <DialogDescription>
                  Enter your {selectedSocial.name} details below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Label htmlFor="social-input">
                  {selectedSocial.urlPrefix
                    ? "Username/Handle"
                    : "Full Profile URL"}
                </Label>
                <div className="flex items-center">
                  {selectedSocial.urlPrefix && (
                    <span className="text-muted-foreground text-sm px-3 py-2 bg-muted rounded-l-md border border-r-0">
                      {selectedSocial.urlPrefix.replace("https://", "")}
                    </span>
                  )}
                  <Input
                    id="social-input"
                    placeholder={selectedSocial.placeholder}
                    value={socialInputValue}
                    onChange={(e) => setSocialInputValue(e.target.value)}
                    className={selectedSocial.urlPrefix ? "rounded-l-none" : ""}
                  />
                </div>
                <Button onClick={handleAddSocialLink} className="w-full">
                  Add Link
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
          <CardDescription>
            Drag to reorder, toggle to show/hide, or feature a link.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              draggable
              onDragStart={(e) => handleDragStart(e, link.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, link.id)}
              className={`flex items-center space-x-4 p-3 rounded-lg border cursor-move ${
                !link.isActive && "opacity-50"
              } ${draggedItem === link.id && "shadow-lg"}`}
            >
              <GripVertical className="w-5 h-5 text-muted-foreground" />
              {getIconComponent(link.icon)}
              <div className="flex-1">
                <h3 className="font-medium">{link.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {link.url}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Switch
                  checked={link.isActive}
                  onCheckedChange={(c) =>
                    onUpdateLink(link.id, { isActive: c })
                  }
                />
                <Dialog onOpenChange={(open) => !open && setEditingLink(null)}>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditingLink(link)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Link</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Input
                        value={editingLink?.title}
                        onChange={(e) =>
                          editingLink &&
                          setEditingLink({
                            ...editingLink,
                            title: e.target.value,
                          })
                        }
                      />
                      <Input
                        value={editingLink?.url}
                        onChange={(e) =>
                          editingLink &&
                          setEditingLink({
                            ...editingLink,
                            url: e.target.value,
                          })
                        }
                      />
                      <Button onClick={handleUpdateLink}>Save Changes</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDeleteLink(link.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileTab({
  profile,
  onUpdateProfile,
}: {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your public profile information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-2xl">
              {profile.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Change Photo
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={profile.displayName}
              onChange={(e) => onUpdateProfile({ displayName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={profile.username}
              onChange={(e) => onUpdateProfile({ username: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => onUpdateProfile({ bio: e.target.value })}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}

const AppearanceTab = ({
  profile,
  onUpdateProfile,
}: {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}) => {
  const handleTemplateChange = (templateId: string) => {
    onUpdateProfile({ template: templateId });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Choose a template to define the look and feel of your public profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Select a Template</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="cursor-pointer group"
                onClick={() => handleTemplateChange(template.id)}
              >
                <div
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    profile.template === template.id
                      ? "border-primary shadow-2xl"
                      : "border-muted group-hover:border-accent-foreground"
                  }`}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                  />
                  {profile.template === template.id && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <h4 className="font-semibold text-lg">{template.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AnalyticsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Analytics
        </CardTitle>
        <CardDescription>Performance and audience insights.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 rounded-lg border bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Analytics charts coming soon.</p>
        </div>
      </CardContent>
    </Card>
  );
};

const LivePreview = ({ profile }: { profile: UserProfile }) => {
  const TemplateComponent = templates.find(
    (t) => t.id === profile.template
  )?.component;

  if (!TemplateComponent) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <p>Template not found. Please select a template.</p>
      </div>
    );
  }

  return (
    <div className="sticky top-8 w-full h-full bg-gray-100 dark:bg-gray-900/50 rounded-lg p-4 overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="relative w-full h-full">
        {/* Phone Mockup */}
        <div className="relative mx-auto border-gray-800 dark:border-gray-600 bg-gray-800 border-[12px] rounded-[2.5rem] h-[700px] w-[350px] shadow-2xl">
          <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[15px] top-[124px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[15px] top-[178px] rounded-l-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[15px] top-[142px] rounded-r-lg"></div>
          <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-slate-900">
            <div className="w-full h-full overflow-y-auto scrollbar-hide">
              <TemplateComponent profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function DashboardPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfileUsername, setNewProfileUsername] = useState("");

  // Load profiles from local storage on initial render
  useEffect(() => {
    try {
      const savedProfiles = localStorage.getItem("vlink-profiles");
      const savedActiveProfileId = localStorage.getItem(
        "vlink-active-profile-id"
      );

      if (savedProfiles) {
        const parsedProfiles = JSON.parse(savedProfiles);
        if (Array.isArray(parsedProfiles) && parsedProfiles.length > 0) {
          setProfiles(parsedProfiles);
          const activeId = savedActiveProfileId
            ? JSON.parse(savedActiveProfileId)
            : null;
          if (activeId && parsedProfiles.some((p) => p.id === activeId)) {
            setActiveProfileId(activeId);
          } else {
            setActiveProfileId(parsedProfiles[0].id);
          }
        } else {
          setProfiles(initialProfiles);
          setActiveProfileId(initialProfiles[0].id);
        }
      } else {
        setProfiles(initialProfiles);
        setActiveProfileId(initialProfiles[0].id);
      }
    } catch (error) {
      console.error("Failed to parse profiles from local storage:", error);
      setProfiles(initialProfiles);
      setActiveProfileId(initialProfiles[0].id);
    }
  }, []);

  // Save profiles to local storage whenever they change
  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem("vlink-profiles", JSON.stringify(profiles));
    }
  }, [profiles]);

  // Save active profile ID to local storage when it changes
  useEffect(() => {
    if (activeProfileId) {
      localStorage.setItem(
        "vlink-active-profile-id",
        JSON.stringify(activeProfileId)
      );
    }
  }, [activeProfileId]);

  const activeProfile = profiles.find((p) => p.id === activeProfileId);

  const handleUpdateActiveProfile = (updates: Partial<UserProfile>) => {
    if (!activeProfile) return;
    const updatedProfile = { ...activeProfile, ...updates };
    const newProfiles = profiles.map((p) =>
      p.id === activeProfileId ? updatedProfile : p
    );
    setProfiles(newProfiles);
  };

  const handleCreateNewProfile = () => {
    if (newProfileUsername.trim()) {
      const newProfile: UserProfile = {
        id: Date.now().toString(),
        username: newProfileUsername,
        displayName: newProfileUsername,
        bio: "A new vLink profile!",
        avatar: `https://avatar.vercel.sh/${newProfileUsername}.png`,
        verified: false,
        theme: "default",
        template: "neobrutalism",
        links: [],
        views: 0,
      };
      const newProfiles = [...profiles, newProfile];
      setProfiles(newProfiles);
      setActiveProfileId(newProfile.id);
      setNewProfileUsername("");
      setIsModalOpen(false);
    }
  };

  const handleAddLink = (
    newLink: Omit<LinkItem, "id" | "clicks" | "isActive">
  ) => {
    if (!activeProfile) return;
    const linkToAdd: LinkItem = {
      ...newLink,
      id: Date.now().toString(),
      clicks: 0,
      isActive: true,
    };
    handleUpdateActiveProfile({ links: [...activeProfile.links, linkToAdd] });
  };

  const handleUpdateLink = (id: string, updates: Partial<LinkItem>) => {
    if (!activeProfile) return;
    const updatedLinks = activeProfile.links.map((l) =>
      l.id === id ? { ...l, ...updates } : l
    );
    handleUpdateActiveProfile({ links: updatedLinks });
  };

  const handleDeleteLink = (id: string) => {
    if (!activeProfile) return;
    const updatedLinks = activeProfile.links.filter((l) => l.id !== id);
    handleUpdateActiveProfile({ links: updatedLinks });
  };

  const handleReorderLinks = (reorderedLinks: LinkItem[]) => {
    handleUpdateActiveProfile({ links: reorderedLinks });
  };

  if (!activeProfile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Welcome to vLink</h2>
          <p className="text-muted-foreground">
            Create a profile to get started.
          </p>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg">Create Your First Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new profile</DialogTitle>
                <DialogDescription>
                  Enter a username for your new vLink profile.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newProfileUsername}
                  onChange={(e) => setNewProfileUsername(e.target.value)}
                  placeholder="e.g., yourname"
                />
                <Button onClick={handleCreateNewProfile} className="w-full">
                  Create Profile
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  const totalClicks = activeProfile.links.reduce(
    (acc, link) => acc + link.clicks,
    0
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <h1 className="text-2xl font-bold">vLink</h1>
          </Link>
          <Badge variant="outline">Dashboard</Badge>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={activeProfile.avatar} />
                  <AvatarFallback>
                    {activeProfile.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{activeProfile.displayName}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Profiles</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {profiles.map((profile) => (
                  <DropdownMenuItem
                    key={profile.id}
                    onSelect={() => setActiveProfileId(profile.id)}
                    className="flex items-center justify-between"
                  >
                    <span>{profile.displayName}</span>
                    {profile.id === activeProfileId && (
                      <Check className="h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Profile
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a new profile</DialogTitle>
                    <DialogDescription>
                      Enter a username for your new vLink profile.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={newProfileUsername}
                      onChange={(e) => setNewProfileUsername(e.target.value)}
                      placeholder="e.g., yourname"
                    />
                    <Button onClick={handleCreateNewProfile} className="w-full">
                      Create Profile
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild>
            <Link href={`/${activeProfile.username}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View Live Page
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <StatsCards
              totalViews={activeProfile.views}
              totalClicks={totalClicks}
            />
            <Tabs defaultValue="links" className="w-full">
              <div className="overflow-x-auto">
                <TabsList className="inline-flex h-auto">
                  <TabsTrigger value="links">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Links
                  </TabsTrigger>
                  <TabsTrigger value="profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="appearance">
                    <Palette className="mr-2 h-4 w-4" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="links" className="pt-6">
                <LinksTab
                  links={activeProfile.links}
                  onAddLink={handleAddLink}
                  onUpdateLink={handleUpdateLink}
                  onDeleteLink={handleDeleteLink}
                  onReorderLinks={handleReorderLinks}
                />
              </TabsContent>

              <TabsContent value="profile" className="pt-6">
                <ProfileTab
                  profile={activeProfile}
                  onUpdateProfile={handleUpdateActiveProfile}
                />
              </TabsContent>

              <TabsContent value="appearance" className="pt-6">
                <AppearanceTab
                  profile={activeProfile}
                  onUpdateProfile={handleUpdateActiveProfile}
                />
              </TabsContent>

              <TabsContent value="analytics" className="pt-6">
                <AnalyticsTab />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <LivePreview profile={activeProfile} />
          </div>
        </div>
      </main>
    </div>
  );
}
