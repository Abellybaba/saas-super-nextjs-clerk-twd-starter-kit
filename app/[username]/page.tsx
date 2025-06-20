"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  motion,
  Variants,
  Transition,
  TargetAndTransition,
} from "framer-motion";
import QRCode from "react-qr-code";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Calendar,
  Check,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Instagram,
  Link as LinkIcon,
  Mail,
  MapPin,
  Music,
  QrCode,
  Share2,
  Twitter,
  Youtube,
} from "lucide-react";

// --- TYPES AND CONSTANTS (Keep in one file for simplicity) ---

interface LinkItem {
  id: string;
  type: "link" | "video" | "map" | "image" | "music";
  title: string;
  url: string;
  icon?: string;
  featured?: boolean;
  embedUrl?: string;
  imageUrl?: string;
}

interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  verified: boolean;
  theme: string;
  socials: { [key: string]: string };
}

interface Theme {
  id: string;
  name: string;
  gradient: string;
  textColor: string;
  buttonBg: string;
  buttonTextColor: string;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  globe: Globe,
  youtube: Youtube,
  instagram: Instagram,
  twitter: Twitter,
  github: Github,
  mail: Mail,
  calendar: Calendar,
  music: Music,
  map: MapPin,
  link: LinkIcon,
};

const themes: Theme[] = [
  {
    id: "default",
    name: "Default",
    gradient: "from-gray-900 via-purple-950 to-gray-900",
    textColor: "text-white",
    buttonBg: "bg-white/10",
    buttonTextColor: "text-white",
  },
  {
    id: "ocean",
    name: "Ocean",
    gradient: "from-blue-900 via-cyan-900 to-blue-900",
    textColor: "text-white",
    buttonBg: "bg-white/20",
    buttonTextColor: "text-white",
  },
  {
    id: "sunset",
    name: "Sunset",
    gradient: "from-orange-800 via-rose-800 to-orange-800",
    textColor: "text-white",
    buttonBg: "bg-white/10",
    buttonTextColor: "text-white",
  },
  {
    id: "forest",
    name: "Forest",
    gradient: "from-green-900 via-emerald-950 to-green-900",
    textColor: "text-white",
    buttonBg: "bg-white/20",
    buttonTextColor: "text-white",
  },
  {
    id: "light",
    name: "Light",
    gradient: "from-slate-100 to-slate-200",
    textColor: "text-slate-800",
    buttonBg: "bg-white",
    buttonTextColor: "text-slate-800",
  },
];

// --- MAIN PAGE COMPONENT ---

export default function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  // In a real app, you would fetch this data from your database based on `params.username`
  const user: UserProfile = {
    username: params.username,
    displayName: "John Doe",
    bio: "Full-stack developer, content creator, and tech enthusiast. Building the future one line of code at a time. 🚀",
    avatar: "/placeholder.svg",
    verified: true,
    theme: "default",
    socials: {
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
      youtube: "https://youtube.com/@johndoe",
    },
  };

  const links: LinkItem[] = [
    {
      id: "1",
      type: "link",
      title: "My Portfolio Website",
      url: "https://johndoe.dev",
      icon: "globe",
      featured: true,
    },
    {
      id: "video-1",
      type: "video",
      title: "Latest YouTube Video",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "2",
      type: "link",
      title: "YouTube Channel",
      url: "https://youtube.com/@johndoe",
      icon: "youtube",
    },
    {
      id: "music-1",
      type: "music",
      title: "My Vibe",
      url: "https://open.spotify.com/track/4cOdK2wGLETOMsVU403xOX",
      embedUrl:
        "https://open.spotify.com/embed/track/4cOdK2wGLETOMsVU403xOX?utm_source=generator",
    },
    {
      id: "image-1",
      type: "image",
      title: "A trip to the mountains!",
      url: "https://instagram.com/p/some-post",
      imageUrl:
        "https://images.unsplash.com/photo-1589823923228-031807a83544?q=80&w=2940&auto=format&fit=crop",
    },
    {
      id: "3",
      type: "link",
      title: "Book a 1-on-1 Call",
      url: "https://calendly.com/johndoe",
      icon: "calendar",
    },
    {
      id: "map-1",
      type: "map",
      title: "Come find me here!",
      url: "https://maps.app.goo.gl/someplace",
      embedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916259961993!2d2.292292615674238!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e29641f45e1%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1622550000000!5m2!1sen!2sfr",
    },
  ];

  const [copied, setCopied] = useState(false);
  const selectedTheme = themes.find((t) => t.id === user.theme) || themes[0];
  const profileUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (iconName?: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap] || ExternalLink;
    return <Icon className="w-5 h-5" />;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  const featuredPulse: TargetAndTransition = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${selectedTheme.gradient} ${selectedTheme.textColor} transition-colors duration-500`}
    >
      <motion.div
        className="max-w-md mx-auto px-4 py-12 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback className="text-2xl bg-white/10">
                {user.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-1">@{user.username}</h1>
          <p className="text-base opacity-80 leading-relaxed max-w-sm mx-auto">
            {user.bio}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-8"
        >
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className={`bg-transparent border-white/20 hover:bg-white/10 ${selectedTheme.textColor}`}
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Share2 className="w-4 h-4 mr-2" />
            )}
            {copied ? "Copied!" : "Share"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={`bg-transparent border-white/20 hover:bg-white/10 ${selectedTheme.textColor}`}
              >
                <QrCode className="w-4 h-4 mr-2" /> QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg max-w-xs">
              <div className="p-4 bg-white rounded-md">
                <QRCode
                  value={profileUrl}
                  size={256}
                  viewBox={`0 0 256 256`}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Scan to view profile
              </p>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Links */}
        <div className="w-full space-y-4 mb-8">
          {links.map((link) => {
            if (link.type === "link") {
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  animate={link.featured ? featuredPulse : undefined}
                >
                  <div
                    className={`group w-full p-4 rounded-lg transition-all duration-300 flex items-center space-x-4 shadow-md border border-transparent ${
                      link.featured
                        ? `bg-white ${selectedTheme.gradient
                            .replace("from-", "from-")
                            .replace(
                              "to-",
                              "to-"
                            )} text-transparent bg-clip-text`
                        : `${selectedTheme.buttonBg} hover:bg-white/20 backdrop-blur-sm border-white/10`
                    }`}
                  >
                    <div
                      className={
                        link.featured
                          ? `bg-gradient-to-r ${selectedTheme.gradient} text-transparent bg-clip-text`
                          : ""
                      }
                    >
                      {getIcon(link.icon)}
                    </div>
                    <span
                      className={`flex-1 font-semibold ${
                        link.featured
                          ? `bg-gradient-to-r ${selectedTheme.gradient} text-transparent bg-clip-text`
                          : ""
                      }`}
                    >
                      {link.title}
                    </span>
                  </div>
                </motion.a>
              );
            }

            // For embeds
            return (
              <motion.div
                key={link.id}
                variants={itemVariants}
                className="w-full"
              >
                <div
                  className={`${selectedTheme.buttonBg} p-3 rounded-lg shadow-md backdrop-blur-sm border-white/10`}
                >
                  <h3 className="font-semibold mb-3 px-1">{link.title}</h3>
                  {link.type === "video" && link.embedUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                      <iframe
                        src={link.embedUrl}
                        title={link.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                  {link.type === "image" && link.imageUrl && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={link.imageUrl}
                        alt={link.title}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </a>
                  )}
                  {link.type === "music" && link.embedUrl && (
                    <iframe
                      src={link.embedUrl}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  )}
                  {link.type === "map" && link.embedUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                      <iframe
                        src={link.embedUrl}
                        title={link.title}
                        frameBorder="0"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mb-10"
        >
          {Object.entries(user.socials).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
            >
              {getIcon(key)}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="text-lg font-bold opacity-80 hover:opacity-100 transition-opacity"
          >
            vLink
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
