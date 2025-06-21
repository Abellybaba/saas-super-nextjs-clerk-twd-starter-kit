"use client";

import React from "react";
import { UserProfile, LinkItem, iconMap } from "@/app/dashboard/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Camera,
  ShoppingBag,
  MessageSquare,
  BookOpen,
  QrCode,
  Clock,
  Send,
  Download,
  Share2,
} from "lucide-react";

// Helper to get the right icon for a link
const getIcon = (iconName: string | undefined) => {
  if (!iconName) return <Mail className="w-6 h-6 text-gray-600" />;
  const IconComponent = iconMap[iconName];
  return IconComponent ? (
    <IconComponent className="w-6 h-6 text-gray-600" />
  ) : (
    <Mail className="w-6 h-6 text-gray-600" />
  );
};

// --- Sub-components for each section ---

const ProfileHeader = ({ profile }: { profile: UserProfile }) => (
  <div className="relative">
    <img
      src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop"
      alt="Banner"
      className="w-full h-48 object-cover"
    />
    <div className="container mx-auto px-4 -mt-16">
      <div className="flex items-end space-x-4">
        <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
          <AvatarImage src={profile.avatar} alt={profile.displayName} />
          <AvatarFallback className="text-4xl">
            {profile.displayName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="pb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {profile.displayName}
          </h1>
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </div>
      <div className="py-4 border-t border-b border-gray-200 mt-4">
        <p className="text-gray-600 text-center">
          I am a heart surgeon. I have 10 year experience in surgery,I am a
          heart surgeon. I have 10 year experience in surgery,I am a heart
          surgeon. I have 10 year experience in surgery.
        </p>
      </div>
    </div>
  </div>
);

const SocialLinks = ({ links }: { links: LinkItem[] }) => {
  const socialLinks = links.filter(
    (link) =>
      link.icon &&
      [
        "twitter",
        "facebook",
        "instagram",
        "linkedin",
        "github",
        "youtube",
      ].includes(link.icon)
  );

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-center space-x-4">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            {getIcon(link.icon)}
          </a>
        ))}
      </div>
    </div>
  );
};

const ContactDetails = ({ profile }: { profile: UserProfile }) => {
  const email = profile.links.find((l) => l.icon === "mail");
  const phone = profile.links.find((l) => l.icon === "phone"); // Assuming 'phone' icon exists

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardHeader>
            <Mail className="mx-auto w-8 h-8 text-blue-500" />
            <CardTitle className="mt-2 text-lg">E-mail Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {email ? email.url.replace("mailto:", "") : "N/A"}
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <Phone className="mx-auto w-8 h-8 text-blue-500" />
            <CardTitle className="mt-2 text-lg">Mobile Number</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {phone ? phone.url : "+1 234 567 890"}
            </p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <Calendar className="mx-auto w-8 h-8 text-blue-500" />
            <CardTitle className="mt-2 text-lg">Date of Birth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">January 20, 1997</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <MapPin className="mx-auto w-8 h-8 text-blue-500" />
            <CardTitle className="mt-2 text-lg">Location</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Surat, India</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-full w-16 h-16 mb-4">
        {icon}
      </div>
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
    {children}
  </div>
);

const ServicesSection = () => (
  <Section title="Our Services" icon={<Briefcase className="w-8 h-8" />}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Placeholder services */}
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="mr-4 p-3 bg-blue-100 rounded-full">
            <Mail className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold">Web Design</h3>
            <p className="text-sm text-gray-500">
              Modern and responsive web design services.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="mr-4 p-3 bg-blue-100 rounded-full">
            <Phone className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold">UI/UX Design</h3>
            <p className="text-sm text-gray-500">
              User-centric and intuitive interface design.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </Section>
);

const GallerySection = () => (
  <Section title="Gallery" icon={<Camera className="w-8 h-8" />}>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* Placeholder images */}
      <img
        src="https://images.unsplash.com/photo-1517329782449-85634231b47e?q=80&w=2070&auto=format&fit=crop"
        className="rounded-lg shadow-md w-full h-full object-cover"
        alt="Gallery item 1"
      />
      <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
        className="rounded-lg shadow-md w-full h-full object-cover"
        alt="Gallery item 2"
      />
      <img
        src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop"
        className="rounded-lg shadow-md w-full h-full object-cover"
        alt="Gallery item 3"
      />
    </div>
  </Section>
);

const ProductsSection = () => (
  <Section title="Products" icon={<ShoppingBag className="w-8 h-8" />}>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {/* Placeholder products */}
      <Card>
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"
          alt="Product 1"
          className="rounded-t-lg"
        />
        <CardContent className="p-4">
          <h3 className="font-semibold">Cool Gadget</h3>
          <p className="text-gray-600">$150</p>
        </CardContent>
      </Card>
      <Card>
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
          alt="Product 2"
          className="rounded-t-lg"
        />
        <CardContent className="p-4">
          <h3 className="font-semibold">Running Shoes</h3>
          <p className="text-gray-600">$120</p>
        </CardContent>
      </Card>
    </div>
  </Section>
);

const InquiryForm = () => (
  <Section title="Inquiries" icon={<Send className="w-8 h-8" />}>
    <Card>
      <CardContent className="p-6 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg"
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          className="w-full p-3 border rounded-lg"
        ></textarea>
        <Button className="w-full">Send Message</Button>
      </CardContent>
    </Card>
  </Section>
);

const Vcard7Template = ({ profile }: { profile: UserProfile }) => {
  return (
    <div className="bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl">
        <ProfileHeader profile={profile} />
        <SocialLinks links={profile.links} />
        <ContactDetails profile={profile} />

        {/* NOTE: The sections below are placeholders. */}
        {/* To make them dynamic, the UserProfile data structure would need to be extended. */}

        <ServicesSection />
        <GallerySection />
        <ProductsSection />
        <InquiryForm />

        <div className="bg-gray-100 p-6 text-center">
          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download vCard
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vcard7Template;
