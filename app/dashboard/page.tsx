import Notice from "@/components/shared/Notice";

export default function page() {

  const details = {
    title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ut.",
    urlText: "Click Here",
    url: "https://www.albiongame.netify.com"
  }
  return (
    <div>
      <div>

        <div>
          <Notice details={details}></Notice>
        </div>

        

      </div>
    </div>
  )
}