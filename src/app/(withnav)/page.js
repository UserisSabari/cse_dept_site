// TODO: If useState or other client hooks are re-enabled, uncomment "use client" below
"use client";

// TODO: For future implementation
// import CourseOfferedSection from "@/components/CourseOfferedSection";
// import Footer from "@/components/Footer";
// import LenisScroll from "@/components/LenisScroll";
// import Acadamics from "./academics/page";
// import { useState } from "react";

import DeptInfo from "@/components/DeptInfo";
import DeptLogo from "@/components/DeptLogo";
import HomePage from "@/app/(withnav)/HomePage/page";
import References from "@/components/References";
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";

// TODO: For future implementation - import HodMessage and Acheivers when ready
// import HodMessage from "@/components/HodMessage";
// import Acheivers from "@/app/(withnav)/achievement/acheivers/page";

export default function Home() {
  return (
    <main>
      <HomePage />
      <DeptInfo />
      <DeptLogo />
      <HorizontalScrollCarousel />
      {/* TODO: For future implementation
      <HodMessage /> 
      */}
      {/* Hidden per issue #148 — re-enable when achievers data is ready
      <Acheivers />
      */}
      <References />
    </main>
  );
}
