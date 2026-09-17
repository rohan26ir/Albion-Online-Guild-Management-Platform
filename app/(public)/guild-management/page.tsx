import type { Metadata } from "next";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export const metadata: Metadata = {
  title: "Guild Management",
  description: "Modern guild management software for Albion Online: roster automation, Discord bots, and treasury splits.",
};

export default function GuildManagementPage() {
  return (
    <section>
      <div className="max-w-7xl w-[95%] mx-auto py-10 ">

        {/* content */}
        <div>
          <h2 className="text-xl font-bold">Market Place</h2>
        </div>

        {/* under constraction */}
        <div className='max-w-7xl w-[95%] mx-auto mt-20'>
          <UnderDevelopment
            progress={55}
          ></UnderDevelopment>
        </div>

      </div>
    </section>
  );
}
