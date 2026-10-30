import Image from "next/image";

import Hero from "@/components/home/hero";
import WhyChooseUs from "@/components/home/WhyChoseUs";
import Testimonials from "@/components/home/Testomonials";
import CtaBanner from "@/components/home/CTAbanner";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </div>
  );
}
