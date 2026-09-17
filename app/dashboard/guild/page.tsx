import type { Metadata } from "next";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export const metadata: Metadata = {
  title: "Guild Overview",
  description: "Albion Online guild operations, territory ownership, hideout status, and guild roster.",
};

export default function page() {
  return (
    <section >
      <div className="">

        {/* heading */}
        <div>
          <h2>Guild / overview page</h2>
        </div>


        {/* content */}
        <UnderDevelopment  
           progress={55} 
           message="" />



      </div>
    </section>
  )
}