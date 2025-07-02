import About from "@/components/common/(shared)/about";
import Features from "@/components/common/(shared)/features";
import Testmonials from "@/components/common/(shared)/testmonials";
import React from "react";
import OurTeam from "./_components/our-team";
import Instagram from "./_components/instagram";
import Companies from "@/components/common/(shared)/companies";

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* About */}
      <About />

      {/* Testimonials */}
      <Testmonials />

      {/* Our Team */}
      <OurTeam />

      {/* Features */}
      <Features />

      {/* Instagram */}
      <Instagram />

      {/* Companies */}
      <Companies />
    </div>
  );
}
