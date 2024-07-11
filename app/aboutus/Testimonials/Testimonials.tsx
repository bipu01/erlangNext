import { testimonials } from "./testimonialCluster";

export default function Testimonials() {
  return (
    <div className=" flex flex-col gap-3 bg-bgLightBlue/70 p-8 rounded-xl ">
      {testimonials.map((testimonial, index) => (
        <div className=" " key={index}>
          <div className="flex  gap-5 items-start ">
            <div className="max-w-8 max-h-8 sm:max-w-10 sm:max-h-10  xmd:max-w-14 xmd:max-h-14 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover "
                src={testimonial.avatar}
                alt="avatar"
              />
            </div>
            <div className="">
              {/* connecting comment and the user name  */}
              <p className=" sm:font-medium text-xs sm:text-sm text-primaryBlue">
                {`"${testimonial.comment}"-`}{" "}
                <span className="font-bold">{`${testimonial.name}`}</span>
              </p>
            </div>
          </div>
          <div className=" bg-black opacity-50 w-full h-[1px]  mt-2"></div>
        </div>
      ))}
    </div>
  );
}
