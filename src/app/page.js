import Banner from "@/components/Banner";
import WhyChoose from "@/components/Choose";
import HowItWorks from "@/components/Works";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyChoose />
      <HowItWorks />

    </div>
  );
}
