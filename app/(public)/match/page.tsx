import TimeCounter from "@/components/customComp/TimeCounter";

export default function page() {
  return (
    <div>
      <div>

        <div className="max-w-7xl w-[95%] mx-auto">
          <h1 className="text-4xl font-bold">Match - Find Your Next Adventure</h1>
        </div>

        <div className="text-8xl  max-w-7xl w-[95%] mx-auto mt-10 text-center font-bold">

          <TimeCounter time="2027-06-26T17:00:00" />


          
        </div>
      </div>
    </div>
  )
}