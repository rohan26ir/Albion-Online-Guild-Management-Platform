import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const websiteName = "Albion Guild Platform";
  const companyName: string = "Techtwen LLC.";
  const companyUrl = "https://techtwen.com";
  
  return(
    <footer className="flex h-12 shrink-0 items-center justify-between border-t border-border bg-background px-6">
      {/* Left side - Copyright */}
      <p className="text-[10px] text-muted-foreground">
        © {currentYear} {websiteName}. All rights reserved.
      </p>
      
      {/* Center - Quick links */}
      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
        <Link 
          href="/privacy-policy" 
          className="hover:text-foreground transition-colors duration-150"
        >
          Privacy
        </Link>
        <span className="text-border">•</span>
        <Link 
          href="/terms-of-service" 
          className="hover:text-foreground transition-colors duration-150"
        >
          Terms
        </Link>
        <span className="text-border">•</span>
        <Link 
          href="/contact" 
          className="hover:text-foreground transition-colors duration-150"
        >
          Contact
        </Link>
      </div>
      
      {/* Right side - Company info */}
      <p className="text-[9px] text-muted-foreground/60">
        Built by{' '}
        <a 
          href={companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors duration-150 font-medium"
        >
          {companyName}
        </a>
      </p>
    </footer>
  );
}