import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function GuidesPage() {
  return (
    <section>
          <div className="max-w-7xl w-[95%] mx-auto py-10 ">
    
            {/* content */}
            <div>
              <h2 className="text-xl font-bold">Guild</h2>
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
