import type { Metadata } from "next";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export const metadata: Metadata = {
  title: "Economic Calculators",
  description: "Calculate crafting returns, refining profit, fame spec progression, and trade flipping margins in Albion Online.",
};

export default function CalculatorsPage() {
  return (
    <section>
          <div className="max-w-7xl w-[95%] mx-auto py-10 ">
    
            {/* content */}
            <div>
              <h2 className="text-xl font-bold">calculator</h2>
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
