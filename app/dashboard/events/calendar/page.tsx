import type { Metadata } from "next";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export const metadata: Metadata = {
  title: "Event Calendar",
  description: "Albion Online guild event calendar, castle timers, and ZvZ schedule.",
};

export default function page() {
  return (
    <section >
      <div className="">

        {/* heading */}
        <div>
          <h2>Event / calender page</h2>
        </div>


        {/* content */}
        <UnderDevelopment  
           progress={55} 
           message="" />



      </div>
    </section>
  )
}