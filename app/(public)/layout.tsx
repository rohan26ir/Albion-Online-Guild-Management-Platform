import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import UnderDevelopment from "@/components/shared/UnderDevelopment"

export default function publicLayout({children}: {children: React.ReactNode}) {
  return(
    <div>
      <Navbar></Navbar>
       <UnderDevelopment></UnderDevelopment>
      {children}     
      <Footer></Footer>
    </div>
  )
}
