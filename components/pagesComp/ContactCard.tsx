'use client';

import { FaFacebookF, FaLinkedinIn, FaTwitter, FaPlus as PlusIcon } from "react-icons/fa6";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

interface ContactInfo {
  title?: string;
  value?: string;
  url?: string;
  icon?: React.ReactNode;
}

export default function ContactCard() {
  const contactInfo: ContactInfo[] = [
    { title: "Phone", value: "+1 (555) 123-4567", icon: <FaPhone /> },
    { title: "Email", value: "support@example.com", icon: <FaEnvelope /> },
    { title: "Address", value: "123 Main St, City", icon: <FaLocationDot /> },
  ];

  const socialLinks: ContactInfo[] = [
    { title: "Facebook", url: "https://facebook.com", icon: <FaFacebookF /> },
    { title: "Twitter", url: "https://twitter.com", icon: <FaTwitter /> },
    { title: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedinIn /> },
  ];

  // Form Submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Here you can handle the form submission, e.g., send data to an API or email service
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data:", data);
    
    alert("Form submitted successfully!");
    e.currentTarget.reset(); // Reset the form after submission
  };

  return (
    <div className="max-w-7xl w-[95%] mx-auto">
      <div>
        {/* form container */}
        <div className="bg-card border relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3">
          {/* Corner decoration icons */}
          <PlusIcon className="absolute -top-3 -left-3 h-6 w-6" />
          <PlusIcon className="absolute -top-3 -right-3 h-6 w-6" />
          <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6" />
          <PlusIcon className="absolute -bottom-3 -right-3 h-6 w-6" />

          {/* left - Contact Info */}
          <div className="flex flex-col justify-between lg:col-span-2">
            <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
              <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                Stay in Touch
              </h2>
              <p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
                If you have any questions regarding our Services or need help,
                please fill out the form here. We do our best to respond within
                1 business day.
              </p>

              {/* Contact Info Grid */}
              <div className="flex flex-col items-start">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3 py-2">
                    <div className="bg-muted/40 rounded-lg p-3">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <p className="text-muted-foreground text-xs">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* social media */}
              <div className="mt-1 flex flex-col items-start gap-2">
                <h2 className="mt-4 text-lg font-semibold md:text-xl lg:text-xl">
                  Follow us
                </h2>
                
                <div className="flex items-center gap-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-primary border p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                      title={social.title}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* right - Form */}
          <div className="bg-muted/40 flex h-full w-full items-center border-t p-5 md:col-span-1 md:border-t-0 md:border-l">
            <form 
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-muted-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Enter subject"
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Enter your message"
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}