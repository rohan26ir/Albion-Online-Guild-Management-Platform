'use client'

import UnderDevelopment from "@/components/shared/UnderDevelopment";
import { getCurrentUser } from "@/lib/auth";
import { redirect, usePathname } from "next/navigation";

export default function Page() {
  const user = getCurrentUser()
  const pathname = usePathname();
  
  // Get the last segment of the path
  const pageName = pathname.split('/').pop() || 'Page';
  // Capitalize the first letter
  const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);


  // user base access
  if (user.role !== "admin") { 
    redirect("/dashboard"); 
  }

  return (
    <div>
      <div>
        {/* heading */}
        <div>
          <h2 className="text-2xl font-semibold">{formattedPageName}</h2>
        </div>

        {/* content */}
        <UnderDevelopment progress={34} />
      </div>
    </div>
  );
}