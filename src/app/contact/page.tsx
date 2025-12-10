import Navbar from "@/components/navigation/NavBar";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Evently",
};

export default function ContactPage() {

  return (
   <>
    <Navbar />
    <ContactForm />
   </>
  ) 
}
