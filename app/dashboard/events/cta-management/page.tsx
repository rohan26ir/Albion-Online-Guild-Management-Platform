import type { Metadata } from "next";
import CommingSoon from "@/components/shared/CommingSoon";

export const metadata: Metadata = {
  title: "CTA & ZvZ Management",
  description: "Coordinate Call to Arms, mass-up calls, battle regears, and combat readiness.",
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
        <CommingSoon />



      </div>
    </section>
  )
}