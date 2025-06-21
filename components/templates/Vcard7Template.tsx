"use client";

import React from "react";
import { UserProfile, LinkItem, icon } from "@/app/dashboard/page";
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
  if (!iconName) return <Mail className="w-5 h-5 text-gray-600" />;
  const IconComponent = iconMap[iconName];
  return IconComponent ? (
    <IconComponent className="w-5 h-5 text-gray-600" />
  ) : (
    <Mail className="w-5 h-5 text-gray-600" />
  );
};

// --- Sub-components for each section ---

const ProfileHeader = ({ profile }: { profile: UserProfile }) => (
  <div className="relative">
    {/* Banner Image */}
    <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop"
        alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>

    {/* Profile Section */}
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="relative -mt-16 sm:-mt-20 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-2xl mx-auto sm:mx-0 mb-4 sm:mb-0">
            <AvatarImage src={profile.avatar} alt={profile.displayName} />
            <AvatarFallback className="text-2xl sm:text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {profile.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left sm:pb-4 flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {profile.displayName}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-center">
            I am a heart surgeon. I have 10 year experience in surgery, I am a
            heart surgeon. I have 10 year experience in surgery, I am a heart
            surgeon. I have 10 year experience in surgery.
          </p>
        </div>
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

  if (socialLinks.length === 0) return null;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-center flex-wrap gap-3">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 border border-gray-100"
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
  const phone = profile.links.find((l) => l.icon === "phone");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Mobile: Horizontal scroll, Tablet+: Grid */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-48">
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="mx-auto w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-2">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold">
                E-mail Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <p className="text-gray-600 text-xs break-all">
                {email ? email.url.replace("mailto:", "") : "N/A"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-48">
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="mx-auto w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-2">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold">
                Mobile Number
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <p className="text-gray-600 text-xs">
                {phone ? phone.url : "+1 234 567 890"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-48">
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="mx-auto w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold">
                Date of Birth
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <p className="text-gray-600 text-xs">January 20, 1997</p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-48">
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="mx-auto w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-2">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold">Location</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 px-4 pb-4">
              <p className="text-gray-600 text-xs">Surat, India</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tablet and Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-base lg:text-lg font-semibold">
              E-mail Address
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 text-sm break-all">
              {email ? email.url.replace("mailto:", "") : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-3">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-base lg:text-lg font-semibold">
              Mobile Number
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 text-sm">
              {phone ? phone.url : "+1 234 567 890"}
            </p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-base lg:text-lg font-semibold">
              Date of Birth
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 text-sm">January 20, 1997</p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-3">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-base lg:text-lg font-semibold">
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 text-sm">Surat, India</p>
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
  <section className="px-4 sm:px-6 lg:px-8 py-6">
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-14 h-14 mb-4 shadow-lg">
        {icon}
      </div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
    </div>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const ServicesSection = ({ services }: { services: UserProfile["services"] }) =>
  services && services.length > 0 ? (
    <Section title="Our Services" icon={<Briefcase className="w-8 h-8" />}>
      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {services.map((service) => (
            <Card
              key={service.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-72"
            >
              <CardContent className="p-4 flex items-start">
                <div className="mr-3 p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <p className="text-sm text-blue-700 font-bold">
                    {service.price}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tablet and Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-4 lg:p-6 flex items-start">
              <div className="mr-4 p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex-shrink-0">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base lg:text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 mb-2 leading-relaxed">
                  {service.description}
                </p>
                <p className="text-base lg:text-lg text-blue-700 font-bold">
                  {service.price}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  ) : null;

const GallerySection = ({ gallery }: { gallery: UserProfile["gallery"] }) =>
  gallery && gallery.length > 0 ? (
    <Section title="Gallery" icon={<Camera className="w-8 h-8" />}>
      {/* Mobile: Horizontal scroll */}
      <div className="sm:hidden">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0"
            >
              <img
                src={img.url}
                className="w-40 h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                alt={img.altText || "Gallery item"}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet and Desktop: Grid layout */}
      <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
        {gallery.map((img) => (
          <div
            key={img.id}
            className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={img.url}
              className="w-full h-32 lg:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              alt={img.altText || "Gallery item"}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        ))}
      </div>
    </Section>
  ) : null;

const ProductsSection = ({ products }: { products: UserProfile["products"] }) =>
  products && products.length > 0 ? (
    <Section title="Products" icon={<ShoppingBag className="w-8 h-8" />}>
      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <Card
              key={product.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex-shrink-0 w-64"
            >
              {product.imageUrl && (
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {product.name}
                </h3>
                {product.price && (
                  <p className="text-base font-bold text-green-600 mb-2">
                    ${product.price}
                  </p>
                )}
                <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
                {product.linkUrl && (
                  <a
                    href={product.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-xs font-medium"
                  >
                    View Product
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tablet and Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {product.imageUrl && (
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 lg:h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardContent className="p-4 lg:p-6">
              <h3 className="font-semibold text-base lg:text-lg mb-2">
                {product.name}
              </h3>
              {product.price && (
                <p className="text-lg font-bold text-green-600 mb-2">
                  ${product.price}
                </p>
              )}
              <p className="text-sm lg:text-base text-gray-600 mb-3 leading-relaxed">
                {product.description}
              </p>
              {product.linkUrl && (
                <a
                  href={product.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium"
                >
                  View Product
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  ) : null;

const TestimonialsSection = ({
  testimonials,
}: {
  testimonials: UserProfile["testimonials"];
}) =>
  testimonials && testimonials.length > 0 ? (
    <Section title="Testimonials" icon={<MessageSquare className="w-8 h-8" />}>
      <div className="space-y-4 sm:space-y-6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-4 sm:p-6">
              <blockquote className="text-sm sm:text-base text-gray-700 border-l-4 border-blue-500 pl-4 sm:pl-6 italic leading-relaxed mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-right">
                <p className="font-semibold text-sm sm:text-base text-gray-900">
                  — {testimonial.author}
                </p>
                {testimonial.company && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {testimonial.company}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  ) : null;

const BlogSection = ({ blogPosts }: { blogPosts: UserProfile["blogPosts"] }) =>
  blogPosts && blogPosts.length > 0 ? (
    <Section title="Blog" icon={<BookOpen className="w-8 h-8" />}>
      <div className="space-y-4 sm:space-y-6">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                {post.imageUrl && (
                  <div className="mb-4 sm:mb-0 sm:w-1/3 flex-shrink-0">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-32 sm:h-24 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  ) : null;

const BusinessHoursSection = ({
  businessHours,
}: {
  businessHours: UserProfile["businessHours"];
}) =>
  businessHours ? (
    <Section title="Business Hours" icon={<Clock className="w-8 h-8" />}>
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3">
              {Object.entries(businessHours).map(([day, hours]) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="capitalize font-medium text-sm sm:text-base text-gray-900">
                    {day}
                  </span>
                  {hours.isOpen ? (
                    <span className="text-green-600 font-semibold text-sm sm:text-base">
                      {hours.start} - {hours.end}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm sm:text-base">
                      Closed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  ) : null;

const InquiryForm = () => (
  <Section title="Inquiries" icon={<Send className="w-8 h-8" />}>
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6 sm:p-8 space-y-4 sm:space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm sm:text-base"
          ></textarea>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  </Section>
);

const Vcard7Template = ({ profile }: { profile: UserProfile }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 min-h-screen font-sans">
      {/* Add custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 my-4 sm:my-8">
        <ProfileHeader profile={profile} />
        <SocialLinks links={profile.links} />
        <ContactDetails profile={profile} />
        <ServicesSection services={profile.services} />
        <GallerySection gallery={profile.gallery} />
        <ProductsSection products={profile.products} />
        <TestimonialsSection testimonials={profile.testimonials} />
        <BlogSection blogPosts={profile.blogPosts} />
        <BusinessHoursSection businessHours={profile.businessHours} />
        <InquiryForm />

        {/* Footer Actions */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 sm:p-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="outline"
              className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3 px-6 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Download vCard
            </Button>
            <Button
              variant="outline"
              className="bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 py-3 px-6 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vcard7Template;
