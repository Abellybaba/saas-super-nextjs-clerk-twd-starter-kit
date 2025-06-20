"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Globe,
  Link as LinkIcon,
  Palette,
  Plus,
  Upload,
  User,
} from "lucide-react";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    bio: "",
    avatar: "",
    links: [{ title: "", url: "" }],
    theme: "default",
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { title: "", url: "" }],
    }));
  };

  const updateLink = (index: number, field: "title" | "url", value: string) => {
    const updatedLinks = formData.links.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  const themes = [
    { id: "default", name: "Default", gradient: "from-teal-400 to-purple-500" },
    { id: "ocean", name: "Ocean", gradient: "from-blue-500 to-cyan-500" },
    { id: "sunset", name: "Sunset", gradient: "from-orange-500 to-pink-500" },
    { id: "forest", name: "Forest", gradient: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">vLink</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Set up your profile
          </h1>
          <p className="text-muted-foreground">
            Complete the steps below to get started.
          </p>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </CardHeader>

          {currentStep === 1 && (
            <CardContent className="space-y-6 pt-6">
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={formData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {formData.displayName ? (
                      formData.displayName[0].toUpperCase()
                    ) : (
                      <User />
                    )}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  placeholder="John Doe"
                  value={formData.displayName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">
                  Your public URL will be: vlink.to/
                  {formData.username || "username"}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell people about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </CardContent>
          )}

          {currentStep === 2 && (
            <CardContent className="space-y-4 pt-6">
              <CardTitle className="flex items-center">
                <LinkIcon className="w-5 h-5 mr-2" />
                Add Your Links
              </CardTitle>
              <CardDescription>
                Add the links you want to share on your profile.
              </CardDescription>
              <div className="space-y-4 max-h-64 overflow-y-auto p-1">
                {formData.links.map((link, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg"
                  >
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        placeholder="My Portfolio"
                        value={link.title}
                        onChange={(e) =>
                          updateLink(index, "title", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        placeholder="https://example.com"
                        value={link.url}
                        onChange={(e) =>
                          updateLink(index, "url", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={addLink} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Another Link
              </Button>
            </CardContent>
          )}

          {currentStep === 3 && (
            <CardContent className="space-y-4 pt-6">
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Choose Your Theme
              </CardTitle>
              <CardDescription>
                Select a theme that represents you.
              </CardDescription>
              <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() =>
                      setFormData({ ...formData, theme: theme.id })
                    }
                    className={`p-1 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                      formData.theme === theme.id
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-md bg-gradient-to-br ${theme.gradient}`}
                    >
                      <div className="h-16 bg-black/20 rounded" />
                    </div>
                    <p className="text-center font-medium mt-2 text-sm">
                      {theme.name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          )}

          {currentStep === 4 && (
            <CardContent className="space-y-6 pt-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Congratulations!</h3>
              <p className="text-muted-foreground mb-6">
                Your profile is ready. You can now share your link with the
                world!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link href={`/u/${formData.username}`}>View My Profile</Link>
                </Button>
                <Button asChild variant="secondary" className="flex-1">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          )}

          {/* Navigation */}
          <CardFooter className="flex justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button asChild>
                <Link href="/dashboard">
                  Finish
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
