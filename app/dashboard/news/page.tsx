import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function page() {
  return (
    <section >
      <div className="">

        {/* heading */}
        <div>
          <h2>News</h2>
        </div>


        {/* content */}
        <UnderDevelopment  
           progress={55} 
           message="" />



      </div>
    </section>
  )
}