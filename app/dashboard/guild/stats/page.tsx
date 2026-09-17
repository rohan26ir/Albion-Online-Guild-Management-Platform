import type { Metadata } from "next";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export const metadata: Metadata = {
  title: "Guild Statistics",
  description: "View guild PvP/PvE fame, kill/death ratios, and season point rankings.",
};

export default function page() {
  return (
    <section >
      <div className="">

        {/* heading */}
        <div>
          <h2>Guild / stats page</h2>
        </div>


        {/* content */}
        <UnderDevelopment  
           progress={55} 
           message="" />



      </div>
    </section>
  )
}