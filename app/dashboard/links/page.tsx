import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Instagram,
  Youtube,
  Twitter,
  Github,
  Globe,
  Mail,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function DemoPage() {
  const demoLinks = [
    {
      id: "1",
      title: "My Portfolio Website",
      url: "#",
      icon: <Globe className="w-5 h-5" />,
      featured: true,
    },
    {
      id: "2",
      title: "YouTube Channel",
      url: "#",
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      id: "3",
      title: "GitHub Profile",
      url: "#",
      icon: <Github className="w-5 h-5" />,
    },
    {
      id: "4",
      title: "Instagram",
      url: "#",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      id: "5",
      title: "Twitter",
      url: "#",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      id: "6",
      title: "Book a Call",
      url: "#",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "7",
      title: "Newsletter",
      url: "#",
      icon: <Mail className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Demo Badge */}
        <div className="text-center mb-4">
          <Badge className="bg-teal-400/20 text-teal-300 border-teal-400/30">
            Demo Profile
          </Badge>
        </div>

        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 border-4 border-teal-400/50">
              <AvatarImage src="/placeholder.svg" alt="Alex Creator" />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-teal-400 to-purple-500 text-white">
                AC
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Alex Creator
            <Badge className="ml-2 bg-teal-400/20 text-teal-300 border-teal-400/30">
              Verified
            </Badge>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">
            Content creator, developer, and digital nomad. Sharing my journey
            through code, travel, and creativity. ✨
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {demoLinks.map((link) => (
            <div key={link.id}>
              <Card
                className={`
                group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${
                  link.featured
                    ? "bg-gradient-to-r from-teal-400/20 to-purple-500/20 border-teal-400/30"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }
                backdrop-blur-sm
              `}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {link.icon && (
                        <div
                          className={`
                          ${
                            link.featured
                              ? "text-teal-400"
                              : "text-gray-400 group-hover:text-white"
                          }
                          transition-colors duration-300
                        `}
                        >
                          {link.icon}
                        </div>
                      )}
                      <span
                        className={`
                        font-medium transition-colors duration-300
                        ${
                          link.featured
                            ? "text-white"
                            : "text-gray-300 group-hover:text-white"
                        }
                      `}
                      >
                        {link.title}
                      </span>
                    </div>
                    <ExternalLink
                      className={`
                      w-4 h-4 transition-all duration-300
                      ${
                        link.featured
                          ? "text-teal-400"
                          : "text-gray-500 group-hover:text-white group-hover:translate-x-1"
                      }
                    `}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-xs mb-4">
            This is a demo profile showcasing LinkSphere's features
          </p>
          <Link href="/signup">
            <Button className="bg-teal-400 hover:bg-teal-500 text-black">
              Create Your Own Profile
            </Button>
          </Link>
          <p className="text-gray-500 text-xs mt-4">
            Powered by{" "}
            <Link href="/" className="text-teal-400 hover:underline">
              LinkSphere
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
