import { Metadata } from "next"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar/navbar"
import Link from "next/link"



const NotFound = () => {
  return (
    <>
    <Navbar />
    <div className="flex w-full flex-col text-center py-32 gap-4">
        <h2 className="text-5xl">Page not found</h2>
        <p>{`The page you are trying to find doesn't exists.`}</p>
        <Link href={"/dashboard"} className="underline">Go Back</Link>
    </div>
    <Footer />
    </>
  )
}
export default NotFound