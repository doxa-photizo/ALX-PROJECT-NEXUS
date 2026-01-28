import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { Package } from "lucide-react";
import { FooterProps, SocialLink } from "@/interfaces";

const FooterLinks: Record<string, FooterProps> = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/products/new" },
      { label: "Best Sellers", href: "/products/best-sellers" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support" },
      { label: "Contact Us", href: "/support/contact" },
      { label: "FAQs", href: "/support/faqs" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Press", href: "/company/press" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
    ],
  },
};

const footerSections = [
  FooterLinks.shop,
  FooterLinks.support,
  FooterLinks.company,
  FooterLinks.legal,
];


const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.856 4.958 4.958 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.521 17.708c-1.445 2.257-4.148 3.754-7.225 3.754-4.571 0-8.288-3.717-8.288-8.288S5.154 4.586 9.721 4.586c3.085 0 5.789 1.502 7.238 3.768a6.26 6.26 0 01.881 2.82h-2.722a3.576 3.576 0 00-5.397-3.076 3.576 3.576 0 00-1.496 4.772 3.576 3.576 0 006.893.304h2.722a6.26 6.26 0 01-.881 2.816z" />
      </svg>
    ),
  },
];





const Footer: React.FC = () => {

    const  [email,setEmail] = useState ("");  
    const [isLoading,setIsLoading] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading (true);    
        setIsSuccess(false);

        try{
            await axios.post('/api/subscribe',{email});
            setIsSuccess(true);
            setEmail("");
        } catch (error) {
            console.error("subscription failed",error);
        } finally{
            setIsLoading(false);

        }
    };


  
    return(

        <footer className="border-t bg-muted/30">
            <div className="container-wide py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
                    {/*Brand & Newsletter*/}
                    <div className="lg:col-span-2">
                        <Link href="/" className="text-2xl font-bold">
                        <Package className="h-6 w-6 "/>
                        
                      <span className="ml-2">Nexus Store</span></Link>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Your one-stop shop for all things awesome. Discover, explore, and shop the best products curated just for you.
                        </p>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">
                                Subscribe to our newsletter
                            </p>
                            <form 
                            onSubmit={handleSubmit}

                            className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="max-w-[240px]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <button
                                    type="submit"
                                    className="btn btn-primary"
                                   

                                    disabled={isLoading || isSuccess}
                                    >
                                      {isLoading ? "Subcribing" : isSuccess ? "Subcribed" : "Subscribe"}
                                    </button>
                                
                            </form>

                        </div>

                    </div>
                    {/*Footer Links*/}
                    <div>
  {footerSections.map((section) => (
    <div key={section.title} className="lg:col-span-1">
      <h3 className="mb-3 text-sm font-semibold">{section.title}</h3>
      <ul className="space-y-2">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>


                    </div>
    
                    {/*Bottom Social Links*/}
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Nexus Store. All rights reserved.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.href}
                                    href={social.href}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>





            </div>
        </footer>
    )


}
export default Footer;