import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"

export default function publicLayout({children}: {children: React.ReactNode}) {
  return(
    <div>
      <Navbar></Navbar>
      {children}     
      <Footer></Footer>
    </div>
  )
}
