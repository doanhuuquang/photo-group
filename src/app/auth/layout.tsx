"use client";

import ButtonOnclickAnimate from "@/components/shared/buttons/button-onclick-animate";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slideData = [
  {
    image: "/assets/images/auth-images/auth-image-1.jpg",
    description:
      "Cột cờ Hà Nội, biểu tượng lịch sử và văn hóa của thủ đô Việt Nam",
  },
  {
    image: "/assets/images/auth-images/auth-image-2.jpg",
    description: "Ruộng bậc thang Mù Cang Chải, Yên Bái, Việt Nam",
  },
  {
    image: "/assets/images/auth-images/auth-image-3.jpg",
    description: "Tháp rùa hồ Gươm, biểu tượng của Hà Nội",
  },
  {
    image: "/assets/images/auth-images/auth-image-4.jpg",
    description: "Hòn Trống Mái – Tuyệt tác của thiên nhiên",
  },
];

const Slider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideData.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  return (
    <div className="w-full h-full max-h-[900px] min-h-[500px] rounded-md my-auto group relative">
      {/* Lớp dưới cùng */}
      <div
        className={cn(
          "w-full h-full absolute top-0 opacity-20 lg:block hidden left-0 z-0 translate-x-20 scale-90 transition-all duration-500 ease-in-out overflow-hidden rounded-2xl",
          "group-hover:opacity-90 group-hover:origin-right group-hover:scale-80 group-hover:translate-x-20 group-hover:rotate-5"
        )}
      >
        <div className="w-full h-full relative rounded-4xl overflow-hidden">
          <Image
            src={slideData[currentSlideIndex].image}
            alt={slideData[currentSlideIndex].description}
            fill
            className={cn(
              "object-cover object-center transition-all duration-500 ease-in-out grayscale"
            )}
          />
          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
      </div>

      {/* Lớp trên cùng */}
      <div className="w-full h-full absolute top-0 left-0 z-1 rounded-4xl overflow-hidden group-hover:scale-95 group-hover:-translate-x-5 group-hover:shadow-2xl transition-all duration-500 ease-in-out">
        <div className="w-full h-full relative">
          {/* Ảnh nền */}
          <div className="w-full h-full absolute top-0 left-0 z-1">
            <Image
              src={
                slideData[
                  currentSlideIndex === 0
                    ? slideData.length - 1
                    : currentSlideIndex - 1
                ].image
              }
              alt={
                slideData[
                  currentSlideIndex === 0
                    ? slideData.length - 1
                    : currentSlideIndex - 1
                ].description
              }
              fill
              className="object-cover object-center transition-all duration-500 ease-in-out"
            />
          </div>

          {/* Nội dung */}
          <div className="w-full h-full absolute top-0 left-0 z-2 flex flex-col justify-between bg-gradient-to-t from-black to-transparent">
            {/* Nút quay lại */}
            <div className="p-6 z-2">
              <Link
                href={"/"}
                className="w-fit rounded-full bg-black/10 backdrop-blur-xl text-white py-2 px-3 text-xs flex items-center gap-2"
              >
                <ArrowLeft className="size-4" />
                Quay lại
              </Link>
            </div>

            <div className="grow"></div>

            {/* Nội dung chữ */}
            <div className="px-6 pt-6 space-y-3 z-2">
              <p className="lg:text-4xl text-2xl font-bold text-white uppercase leading-tight">
                Chia sẻ khoảnh khắc của bạn với thế giới
              </p>

              <p className="text-muted-foreground min-h-12">
                {
                  slideData[
                    currentSlideIndex === 0
                      ? slideData.length - 1
                      : currentSlideIndex - 1
                  ].description
                }
              </p>
            </div>

            {/* Thay đổi ảnh nền */}
            <div className="w-full px-6 pb-6 flex justify-between items-center">
              <div className="w-full flex items-center gap-3">
                {slideData.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-1 rounded-lg transition-all duration-300 ease-in-out",
                      currentSlideIndex === index
                        ? "bg-white w-8"
                        : "bg-white/20 w-4"
                    )}
                  ></div>
                ))}
              </div>

              <ButtonOnclickAnimate
                size={"icon"}
                className="rounded-full cursor-pointer bg-white text-black hover:bg-white/90"
                onClick={() =>
                  setCurrentSlideIndex((prev) => (prev + 1) % slideData.length)
                }
              >
                <ChevronRight />
              </ButtonOnclickAnimate>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full max-w-7xl min-h-[100vh] m-auto p-3 lg:gap-20 gap-5">
      <Slider />
      <main className="w-full h-fit m-auto z-1 lg:w-2/3">{children}</main>
    </div>
  );
}
