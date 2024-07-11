"use client";
import ScrollToTop from "../Functions/ScrollToTop";
import { paddingForPage } from "../defineSize";
import Testimonials from "./Testimonials";

export default function AboutUsPage() {
  return (
    <>
      <div
        className={`pt-6 xmd:pt-20 px-2 sm:px-10 bg-bodybg h-full flex flex-col gap-4 sm:gap-6 xmd:gap-10 ${paddingForPage}`}
      >
        <ScrollToTop />
        <div className=" mt-2">
          <div className="">
            <p className=" text-sm sm:text-2xl xmd:text-4xl  text-primaryBlue font-bold py-2 ">
              About us
            </p>
            <div className=" bg-black opacity-20 w-full h-[1px] sm:h-[2px] "></div>
          </div>
          <div className=" w-full py-4">
            <p className=" text-xs sm:text-sm  xmd:text-lg text-primaryBlue break-words">
              Erlang Fashion Store is your premier destination for stylish
              clothing that combines quality, sustainability, and exceptional
              customer service. With a diverse selection of on-trend apparel, we
              cater to fashion-forward individuals who value both style and
              ethical practices. From chic everyday essentials to statement
              pieces, each garment is thoughtfully curated to elevate your
              wardrobe while minimizing environmental impact. Experience the
              perfect blend of fashion and conscience with Erlang Fashion Store.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-6 xmd:gap-10">
          <div className="bg-white  shadow-md px-2 xmd:px-10 py-2 xmd:py-10 rounded-xl">
            <div className="">
              <p className="  text-sm sm:text-2xl xmd:text-2xl  text-primaryBlue font-bold py-2 ">
                Our Brand Integrity
              </p>
              <div className=" bg-black opacity-20 w-full h-[1px] sm:h-[2px] "></div>
            </div>
            <div className=" my-2">
              <p className="text-xs sm:text-sm  xmd:text-base text-primaryBlue break-words">
                Erlang Fashion Store stands out amidst competitors for its
                unwavering commitment to quality, sustainability, and
                unparalleled customer service. We meticulously select each
                garment, ensuring it meets our stringent standards for both
                style and durability. Moreover, sustainability is at the
                forefront of our operations; we prioritize eco-friendly
                materials and ethical manufacturing practices. Our unique
                product offerings reflect the latest fashion trends while
                maintaining timeless appeal, catering to diverse tastes and
                preferences. With exceptional customer service, we strive to
                exceed expectations, fostering long-lasting relationships built
                on trust and satisfaction.
              </p>
            </div>
          </div>
          <div className="bg-white  shadow-md px-2 xmd:px-10 py-2 xmd:py-10 rounded-xl">
            <div className="">
              <p className=" text-sm sm:text-2xl xmd:text-2xl  text-primaryBlue font-bold py-2 ">
                Community involvement
              </p>
              <div className=" bg-black opacity-20 w-full h-[1px] sm:h-[2px] "></div>
            </div>
            <div className=" my-2">
              <p className="text-xs sm:text-sm  xmd:text-base text-primaryBlue break-words">
                At Erlang Fashion Store, we believe in giving back to the
                community and making a positive impact beyond the world of
                fashion. That&apos;s why we&apos;re proud to be involved in
                various philanthropic and environmental initiatives.One of our
                key partnerships is with a local charity organization that
                focuses on providing clothing and support to families in need.
                Through this partnership, we regularly donate clothing items and
                contribute to fundraising efforts to support their mission.One
                of our key partnerships is with a local charity organization
                that focuses on providing clothing and support to families in
                need. Through this partnership, we regularly donate clothing
                items and contribute to fundraising efforts to support their
                mission.
              </p>
            </div>
          </div>
        </div>
        {/* Testimonials */}
        <div className="">
          <div className="">
            <p className="  text-sm sm:text-2xl xmd:text-2xl  text-primaryBlue font-bold py-2 ">
              Testimonials
            </p>
            <div className=" bg-black opacity-20 w-full h-[1px] sm:h-[2px] "></div>
          </div>
          <div className=" pt-2 sm:pt-4">
            <Testimonials />
          </div>
        </div>
        {/* Our Journey */}
        <div className=" pb-10">
          <div className="">
            <p className="  text-sm sm:text-2xl xmd:text-2xl  text-primaryBlue font-bold py-2 ">
              Our Journey
            </p>
            <div className=" bg-black opacity-20 w-full h-[1px] sm:h-[2px] "></div>
          </div>
          <div className=" pt-2 sm:pt-4">
            <p className="text-xs sm:text-sm  xmd:text-lg text-primaryBlue break-words ">
              In the digital landscape, Erlang Fashion Store emerged, founded
              with a vision by fashion enthusiasts. Their mission: to offer
              trendy attire that elevates style effortlessly. Rooted in
              innovation and elegance, Erlang Fashion Store isn&apos;t just a
              platform—it&apos;s a destination for fashion-forward individuals
              seeking curated collections. Whether browsing for the latest
              trends or timeless classics, customers find themselves immersed in
              a world where quality meets style, all with the convenience of
              online shopping.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
