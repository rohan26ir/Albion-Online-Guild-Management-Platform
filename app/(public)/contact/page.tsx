import ContactCard from "@/components/pagesComp/ContactCard";
import PageCover from "@/components/pagesComp/PageCover";

export default function page() {
  return (
    <section>
      {/* content */}
      <PageCover
        title="Contact Us"
        description="We are here to assist you. Reach out to us with any questions, feedback, or inquiries. Our team is dedicated to providing prompt and helpful responses."
      />


      <div className="max-w-7xl w-[95%] mx-auto py-10  ">


        <div>
          <ContactCard></ContactCard>
        </div>

      </div>
    </section>
  )
}