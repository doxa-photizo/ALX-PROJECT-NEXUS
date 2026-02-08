import Link from "next/link";
import React, { useState } from "react";
import { Package, Mail, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Subscription failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const footerSections = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/products" },
        { label: "Categories", href: "/products" },
        { label: "Best Sellers", href: "/products" },
        { label: "New Arrivals", href: "/products" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/contact" },
        { label: "Contact Us", href: "/contact" },
        { label: "Track Order", href: "/orders" },
        { label: "Returns", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/about" },
        { label: "Blog", href: "/about" },
        { label: "Press", href: "/about" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/about" },
        { label: "Terms of Service", href: "/about" },
        { label: "Cookie Policy", href: "/about" },
        { label: "Accessibility", href: "/about" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Nexus Store</span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed font-medium">
              Your one-stop shop for premium products. Discover, explore, and shop the best items curated just for you.
            </p>

            {/* Newsletter */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  Subscribe to Newsletter
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500 font-medium"
                />
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSuccess ? (
                    "Subscribed!"
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
              {isSuccess && (
                <p className="text-green-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors font-medium text-sm hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-sm font-medium">
              © {new Date().getFullYear()} Nexus Store. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;