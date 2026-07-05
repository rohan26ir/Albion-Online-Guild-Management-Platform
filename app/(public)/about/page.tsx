import AboutOurAchievements from "@/components/pagesComp/AboutOurAchievements";
import AboutOurStory from "@/components/pagesComp/AboutOurStory";
import AboutOurValues from "@/components/pagesComp/AboutOurValues";
import PageCover from "@/components/pagesComp/PageCover";
// import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function page() {
  return (
    <section>

      {/* content */}
      <PageCover
        title="About Us"
        description="We are a passionate team dedicated to creating an immersive and engaging experience for the Albion Online community. Our mission is to provide valuable resources, insights, and updates to enhance your journey in the world of Albion Online."
      />


      <div className=" pt-10 flex flex-col gap-12 ">

        {/* content */}
        <AboutOurStory />


        <AboutOurValues />


        <AboutOurAchievements />



      </div>
    </section>
  )
}