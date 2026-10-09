// import CourseOfferedSection from "@/components/CourseOfferedSection";

'use client';
import { useState } from 'react';
import DeptInfo from '@/components/DeptInfo';
import DeptLogo from '@/components/DeptLogo';
import HodMessage from '@/components/HodMessage';
import HeroSection from '@/components/HeroSection';
import References from '@/components/References';
// import Acadamics from "./academics/page";

export default function Home() {
    return (
        <main>
            <HeroSection />
            <DeptInfo />
            <DeptLogo />
            <HodMessage />
            <References />
        </main>
    );
}
