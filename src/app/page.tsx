import Navbar from "@/components/Navbar";
import SeztaurantReveal from "@/components/SeztaurantReveal";
import About from "@/components/About";
import MenuSection from "@/components/MenuSection";
import OrderInfo from "@/components/OrderInfo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <SeztaurantReveal />
      <About />
      <MenuSection />
      <OrderInfo />
      <Contact />
      <Footer />
    </main>
  );
}
