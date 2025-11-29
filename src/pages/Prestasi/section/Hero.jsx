import React from "react";
import SectionHeader from "@/components/common/SectionHeader";
import MotionReveal from "@/components/common/MotionReveal";

const Hero = () => (
    <section className="pb-4 md:pb-8 mb-2">
        <MotionReveal animation="fade-up">
            <SectionHeader title="Prestasi Ilkomerz" altText="Garis Prestasi" />
            <p className="text-center max-w-2xl mx-auto text-lg text-primary-darker mb-4">
                Pusat Informasi Prestasi Ilkomerz
            </p>
        </MotionReveal>
    </section>
);

export default Hero;
