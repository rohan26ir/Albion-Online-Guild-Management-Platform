import type { Metadata } from "next";
import AboutOurAchievements from "@/components/pagesComp/AboutOurAchievements";
import AboutOurStory from "@/components/pagesComp/AboutOurStory";
import AboutOurValues from "@/components/pagesComp/AboutOurValues";
import AboutBentoGrid from "@/components/pagesComp/AboutBentoGrid";
import PageCover from "@/components/pagesComp/PageCover";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the team and mission behind Albion Game, the all-in-one platform for Albion Online players.",
};

export default function page() {
  return (
    <section>

      {/* content */}
      <PageCover
        title="About Us"
        description="We are a passionate team dedicated to creating an immersive and engaging experience for the Albion Online community. Our mission is to provide valuable resources, insights, and updates to enhance your journey in the world of Albion Online."
      />


      <div className=" pt-10 flex flex-col gap-12 ">

        {/* Our Story */}
        <AboutOurStory />



        {/* <AboutOurValues /> */}


        <AboutOurAchievements />

        {/* Bento Grid Features */}
        <AboutBentoGrid />


      </div>
    </section>
  )
}