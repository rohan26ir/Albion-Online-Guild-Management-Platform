import type { Metadata } from "next";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export const metadata: Metadata = {
  title: "Albion Tutorials",
  description: "Beginner and veteran game tutorials covering gathering, crafting, and islands.",
};

export default function page() {
  return (
    <section >
      <div className="">

        {/* heading */}
        <div>
          <h2>Guides page</h2>
        </div>


        {/* content */}
        <UnderDevelopment  
           progress={55} 
           message="" />



      </div>
    </section>
  )
}