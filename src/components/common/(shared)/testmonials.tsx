import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPagination,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Testmonials() {
  // Translation
  const t = useTranslations();

  // Variables
  const testimonials = [
    {
      name: "Ahmed Mohamed",
      role: "Customer",
      image: "/assets/images/testmonials/person1.jpeg",
      text: "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
    },
    {
      name: "Sarah Ali",
      role: "Customer",
      image: "/assets/images/testmonials/person2.jpeg",
      text: "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
    },
    {
      name: "Hassan Karim",
      role: "Customer",
      image: "/assets/images/testmonials/person3.jpeg",
      text: "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
    },
    {
      name: "Fatima Noor",
      role: "Customer",
      image: "/assets/images/testmonials/person4.jpeg",
      text: "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
    },
    {
      name: "Omar Khalid",
      role: "Customer",
      image: "/assets/images/testmonials/person1.jpeg",
      text: "Ab vel consequatur repellat eos omnis accusamus porro sunt dolorem. Totam voluptas ullam ut. Neque accusantium voluptas rerum. Dolorem veritatis quo omnis nihil nulla harum eum. Dignissimos laborum necessitatibus vero nihil.",
    },
  ];

  return (
    <div className="mt-16 relative py-16">
      {/* Background */}
      <Image
        src="/assets/images/testmonials/birthdaybg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover inset-0 -z-10"
      />

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full container py-10"
      >
        <CarouselContent className="">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-4">
              <div className="p-6 flex flex-col w-full bg-white min-h-[370px] rounded-tr-[6rem] rounded-b-[6rem] rounded-tl-[3rem] rtl:rounded-tl-[6rem] rtl:rounded-b-[6rem] rtl:rounded-tr-[3rem] overflow-hidden">
                {/* Header */}
                <div className="flex relative gap-4 ">
                  {/* Customer photo */}
                  <div className="relative h-16 w-16 before:absolute before:h-10 before:w-[4.5rem] before:rotate-45 before:bg-pink-900 before:top-6 before:rounded-bl-full before:rounded-br-full before:-translate-x-4 before:left-0 rtl:before:left-auto rtl:before:right-[24px] rtl:before:translate-x-4">
                    <Image
                      src={testimonial.image}
                      className="object-cover rounded-full"
                      fill
                      alt={testimonial.name}
                    />
                  </div>

                  {/* Customer name */}
                  <div className="flex flex-col justify-center">
                    <span className="font-inter font-bold text-[17px] leading-[20.57px] text-strom-900">
                      {testimonial.name}
                    </span>

                    <span className="font-inter font-bold text-[17px] leading-[20.57px] text-pink-900">
                      {t("customer")}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <hr className="border-t my-6 border-storm-500 w-full mb-4" />

                {/* Text */}
                <p className="font-inter font-normal text-[14px] leading-[16.94px] tracking-[0px] text-gray-600 opacity-75">
                  {t("testimonial")}
                </p>

                {/* Bottom */}
                <div className="mt-auto flex items-center justify-around">
                  {/* Bottom-Left */}
                  <div className="flex-shrink-0">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <FaStar key={i} className="text-pink-900" size={15} />
                      ))}
                    </div>
                  </div>

                  {/* Bottom-Right */}
                  <div className="flex-shrink-0">
                    <svg
                      width="77"
                      height="63"
                      viewBox="0 0 77 63"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M73.5019 38.8921C73.3822 38.4134 73.3822 37.8151 73.7412 37.4561C75.7756 33.7464 76.9722 29.558 76.9722 25.1303C76.9722 11.2488 65.1251 0 50.6453 0C44.4226 0 38.6785 2.15402 34.1311 5.6244C49.0896 8.85543 60.2187 21.7796 60.2187 37.0971C60.2187 41.4051 59.3811 45.5935 57.7057 49.3032C60.0991 48.7049 62.3728 47.7475 64.5268 46.4312C65.0054 46.1918 65.4841 46.0722 65.9628 46.3115L73.6215 49.0639C74.9379 49.5426 76.2542 48.2262 75.8952 46.7902L73.5019 38.8921Z"
                        className="fill-pink-900"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M26.7112 11.9668C12.2314 11.9668 0.384277 23.2156 0.384277 37.0971C0.384277 41.5248 1.58096 45.7132 3.73498 49.4229C3.97432 49.9016 4.09399 50.3802 3.97432 50.8589L1.46129 58.8767C0.982617 60.3127 2.29896 61.629 3.73498 61.1503L11.3937 58.398C11.8724 58.2783 12.4707 58.2783 12.8297 58.5177C16.8985 60.911 21.5655 62.2274 26.7112 62.2274C41.1911 62.2274 53.0382 50.9786 53.0382 37.0971C53.0382 23.2156 41.1911 11.9668 26.7112 11.9668ZM12.3511 41.8838C9.71838 41.8838 7.56436 39.7298 7.56436 37.0971C7.56436 34.4644 9.71838 32.3104 12.3511 32.3104C14.9838 32.3104 17.1378 34.4644 17.1378 37.0971C17.1378 39.7298 14.9838 41.8838 12.3511 41.8838ZM26.7112 41.8838C24.0785 41.8838 21.9245 39.7298 21.9245 37.0971C21.9245 34.4644 24.0785 32.3104 26.7112 32.3104C29.3439 32.3104 31.498 34.4644 31.498 37.0971C31.498 39.7298 29.3439 41.8838 26.7112 41.8838ZM41.0714 41.8838C38.4387 41.8838 36.2847 39.7298 36.2847 37.0971C36.2847 34.4644 38.4387 32.3104 41.0714 32.3104C43.7041 32.3104 45.8581 34.4644 45.8581 37.0971C45.8581 39.7298 43.7041 41.8838 41.0714 41.8838Z"
                        className="fill-pink-900"
                        fillOpacity="0.2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious className="absolute bottom-[180px] bg-pink-900 text-white font-bold rounded-full -translate-y-1/2 left-0 rtl:left-auto rtl:right-0" />
        <CarouselNext className="absolute bottom-[180px] bg-pink-900 text-white font-bold rounded-full top-1/2 -translate-y-1/2 right-0 rtl:right-auto rtl:left-0" />

        {/* Pagination */}
        <CarouselPagination className="-bottom-4" />
      </Carousel>
    </div>
  );
}
