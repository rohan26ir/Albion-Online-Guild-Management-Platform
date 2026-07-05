import Link from "next/link";
import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconPhone,
  IconMapPin,
  IconHeart,
} from "@tabler/icons-react";

interface footerProps {
  id: number;
  name: string;
  path?: string;
  value?: string;
  icon?: React.ReactNode;
}

export default function Footer() {
  const pages: footerProps[] = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    { id: 3, name: "Contact", path: "/contact" },
    { id: 4, name: "Match", path: "/match" },
  ];

  const currentYear: number = new Date().getFullYear();
  const version: string = "1.0.0";
  const companyName: string = "Techtwen LLC";
  const companyURl: string = "https://meetrohan.netlify.app/";

  const contactInfo: footerProps[] = [
    { id: 1, name: "Email", value: "info@techtwen.com" },
    { id: 2, name: "Phone", value: "+1 (555) 123-4567" },
    { id: 3, name: "Address", value: "123 Main St, Anytown, USA" },
  ];

  const socials: footerProps[] = [
    { id: 1, name: "Facebook", path: "https://www.facebook.com/techtwen", icon: <IconBrandFacebook size={18} /> },
    { id: 2, name: "Twitter", path: "https://www.twitter.com/techtwen", icon: <IconBrandTwitter size={18} /> },
    { id: 3, name: "LinkedIn", path: "https://www.linkedin.com/company/techtwen", icon: <IconBrandLinkedin size={18} /> },
    { id: 4, name: "GitHub", path: "https://github.com/techtwen", icon: <IconBrandGithub size={18} /> },
  ];

  const getContactIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "email":
        return <IconMail size={16} />;
      case "phone":
        return <IconPhone size={16} />;
      case "address":
        return <IconMapPin size={16} />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative mt-auto border-t border-border bg-background">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Main Footer Content */}
      <div className="max-w-7xl w-[95%] mx-auto py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section with Image */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">

              <div>
                <h3 className="text-3xl font-bold uppercase tracking-wider text-foreground">
                  Albion Game
                </h3>
                <p className="text-md text-muted-foreground">
                  Guild Management Platform
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Empowering Albion Online guilds with advanced management tools,
              community features, and real-time analytics.
            </p>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded-md border border-border bg-accent/30 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={page.path!}
                    className="text-lg text-muted-foreground transition-colors duration-200 hover:text-foreground "
                  >
                    {page.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.id} className="flex items-center gap-2 text-lg text-muted-foreground">
                  <span className=" text-primary">
                    {getContactIcon(info.name)}
                  </span>
                  <span>{info.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Version Info */}
          <div className="space-y-4">
            <h4 className="text-2xl font-semibold uppercase tracking-wider text-foreground">
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and news.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105">
                Subscribe
              </button>
            </div>
            <div className=" pt-2 text-xs text-muted-foreground flex flex-wrap items-center justify-start gap-2 ">
              <p className="group">Version: <span className="group-hover:text-lime-500">{version}</span></p> -
              <p className="group"><span className="group-hover:text-lime-500">© {currentYear}</span>   <a href={companyURl} target="_blank" rel="noopener noreferrer" className="group-hover:text-rose-500">
                {companyName}
              </a></p>
              {/* <p className="mt-1 text-[10px]">
                Built with <IconHeart size={10} className="inline text-red-500" /> for Albion Community
              </p> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="group text-center text-xs sm:text-sm text-muted-foreground/70">
            This web application was created by player{' '}
            <span className="cursor-default font-semibold text-foreground/80 transition-all duration-300 group-hover:text-lime-500 group-hover:drop-shadow-[0_0_8px_rgba(132,204,22,0.3)]">
              Abstrack
            </span>
            {' '}from the{' '}
            <span className="cursor-default font-semibold text-foreground/80 transition-all duration-300 group-hover:text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]">
              Asia server
            </span>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}