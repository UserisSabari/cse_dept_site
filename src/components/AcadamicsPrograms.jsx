import Image from "next/image";
import { AcadamicsDataForCard } from "@/constants/contents";
import ColoredSection from "@/components/ColoredSection";
import SyllabusBrowser from "@/components/SyllabusBrowser";

/**
 * AcadamicsPrograms — Server Component
 *
 * Renders the "Programmes and Syllabi" scroll section on the /academics page.
 * Each programme card now includes the dynamic SyllabusBrowser (DB-driven).
 */
const AcadamicsPrograms = async () => {
  return (
    <ColoredSection color="WHITE" className="bg-black w-full">
      <div className="lg:sticky">
        <div className="brightness-50 hidden lg:sticky inset-0 lg:block">
          <Image
            src="/bg-acadamic.jpeg"
            alt="department pic"
            className="object-fill"
            width={1920}
            height={1920}
          />
        </div>

        <div className="px-10 py-32 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[67%_33%] lg:gap-3 container mx-auto relative z-1">
            {/* Left sticky column */}
            <div
              className="space-y-4 lg:sticky lg:bottom-10 lg:top-40 z-1"
              style={{ minHeight: "auto", height: "fit-content" }}
            >
              <h2 className="text-[24px] lg:text-5xl font-normal font-bebasneue leading-[28.8px] lg:leading-tight lg:text-left">
                PROGRAMMES AND SYLLABI
              </h2>
              <p className="font-montserrat text-[16px] sm:text-[22px] md:text-[24px]">
                The Department of Computer Science &amp; Engineering (CSE)
                offers a comprehensive range of programs designed to equip
                students with the knowledge and skills necessary to thrive in
                the ever-evolving field of computer science.
              </p>
            </div>

            {/* Right scrolling column — one card per programme */}
            <div className="flex justify-center lg:justify-end z-1 mt-8 lg:mt-0">
              <div className="space-y-8 lg:space-y-[113px]">
                {AcadamicsDataForCard.map((item, i) => (
                  <div key={i} className="max-w-[390px] w-full lg:pl-16">
                    {/* Programme image */}
                    <img
                      className="w-full h-auto lg:h-[525.83px] object-cover"
                      src={item.image}
                      alt=""
                    />

                    {/* Programme title & description */}
                    <h2 className="font-medium font-montserrat text-[18px] lg:text-[20px] leading-[24.38px] mt-6">
                      {item.title}
                    </h2>
                    <p className="font-normal font-montserrat text-[14px] lg:text-[16px] leading-[19.5px] mt-4">
                      {item.description}
                    </p>

                    {/* Dynamic syllabus browser — DB-driven */}
                    <SyllabusBrowser />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ColoredSection>
  );
};

export default AcadamicsPrograms;
