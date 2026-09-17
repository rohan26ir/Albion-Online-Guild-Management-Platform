import type { Metadata } from "next";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export const metadata: Metadata = {
  title: "PvP & Ganking Strategy",
  description: "Advanced guild battle tactics, small scale roaming, ganking spots, and ZvZ shotcalling guides.",
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