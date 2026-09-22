"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
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

import hunterChar from '@/public//assets/charecter/hunter-charecter_with_pet.png'

interface footerProps {
  id: number;
  name: string;
  path?: string;
  value?: string;
  icon?: React.ReactNode;
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Successfully subscribed to our newsletter!");
    setEmail("");
  };

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
      <div className="max-w-7xl w-[95%] mx-auto py-8 md:pt-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center space-y-4 order-2 lg:order-1">
            <h4 className="text-2xl font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={page.path!}
                    className="text-lg text-muted-foreground transition-colors duration-200 hover:text-foreground inline-block"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Section with Image */}
          <div className="flex flex-col items-center text-center space-y-4 order-1 lg:order-2">
            <div className="flex flex-col items-center gap-3">
              <div>
                <h3 className="text-3xl font-bold uppercase tracking-wider text-foreground">
                  Albion Game
                </h3>
                <p className="text-md text-muted-foreground">
                  The All-in-One Gaming Platform
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs md:max-w-sm">
              The all-in-one gaming platform for Albion Online players. Marketplace prices,
              calculators, builds, guild management, and interactive tools.
            </p>
            <div className="flex justify-center gap-2 mt-2">
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

          {/* Contact Information */}
          <div className="flex flex-col items-center text-center space-y-4 order-3">
            <h4 className="text-2xl font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.id} className="flex items-center justify-center gap-2 text-lg text-muted-foreground">
                  <span className=" text-primary">
                    {getContactIcon(info.name)}
                  </span>
                  <span>{info.value}</span>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* CTA Subscription Banner */}
        <div className="relative mt-24 rounded-2xl bg-[#0f0f0f] border border-border shadow-2xl overflow-visible flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 px-6 sm:px-12 md:px-16 py-10 ">

          {/* Character Image (Overflowing top) */}
          <div className="absolute bottom-0 left-0 sm:left-4 lg:left-12 w-48 h-64 sm:w-64 sm:h-80 lg:w-80 lg:h-[22rem] pointer-events-none hidden sm:block z-20">
            <Image
              src={hunterChar}
              alt="Albion Character"
              fill
              className="object-contain object-bottom drop-shadow-xl"
              priority
            />
          </div>

          {/* Spacer for the absolute image on larger screens */}
          <div className="hidden sm:block w-40 md:w-64 lg:w-72 shrink-0"></div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left z-10 mb-8 md:mb-0 max-w-sm">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white/90">
              Join our passionate Albion community today.
            </h3>
          </div>

          {/* Subscribe Form */}
          <div className="w-full md:w-auto z-10 shrink-0">
            <div className="flex w-full md:w-[350px] lg:w-[400px] bg-white rounded-md overflow-hidden p-1.5 shadow-lg focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E.g. info@mail.com"
                className="flex-1 px-4 py-2.5 bg-transparent text-black text-sm outline-none placeholder:text-gray-500 font-medium"
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-2.5 bg-[#111] text-white font-semibold text-sm rounded-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        {/* <div className="mt-8 border-t border-border pt-6 text-center">
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
        </div> */}

        <p className="group text-center pt-5  ">Copyright & develop by <a target="_blank" className="group-hover:text-red-700" href="https://meetrohan.netlify.app/">@rohan26ir</a> - 2026</p>


      </div>
    </footer>
  );
}