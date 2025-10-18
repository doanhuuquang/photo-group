"use client";

import AppNavBar from "@/components/main/app-navbar";
import ButtonOnclickAnimate from "@/components/shared/buttons/button-onclick-animate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "Khám phá", href: "/" },
  { label: "Về Photo Group", href: "/" },
];

const SearchBox = () => {
  return (
    <div className="w-full p-2 bg-accent rounded-full flex gap-4 ">
      <input
        type="text"
        placeholder="Bạn đang muốn tìm gì?"
        className="w-full bg-transparent border-0 outline-0 px-4"
      />
      <ButtonOnclickAnimate size={"icon"} className="rounded-full">
        <Search />
      </ButtonOnclickAnimate>
    </div>
  );
};

export default function AppHeader() {
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState<boolean>(false);

  return (
    <div className="w-full sticky top-0">
      <div className="w-full lg:px-10 lg:py-4 p-4 bg-background z-50 flex items-center justify-between gap-10 relative">
        {/* Left */}
        <div className="w-full flex items-center gap-10">
          {/* Menu mobile triger*/}
          <Button
            variant={"outline"}
            className="lg:hidden block"
            onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)}
          >
            {isMenuMobileOpen ? <X /> : <Menu />}
          </Button>

          {/* Menu mobile */}
          <div
            className={cn(
              "w-full h-[calc(100vh-68px)] absolute bottom-0 left-0 bg-background/80 translate-y-full transition-all duration-300 ease-in-out lg:hidden flex flex-col gap-6 z-49",
              isMenuMobileOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="w-full p-4 bg-background flex flex-col gap-6">
              <SearchBox />
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-xl font-semibold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div className="">
            <p className="font-playwrite font-semibold text-nowrap">
              Photo Group
            </p>
          </div>

          {/* TÌm kiếm */}
          <div className="lg:block hidden w-full max-w-lg">
            <SearchBox />
          </div>

          {/* Menu */}
          <div className="lg:flex hidden items-center gap-4">
            {menuItems.map((item, index) => (
              <div key={index} className="text-nowrap">
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <AppNavBar />
      </div>
    </div>
  );
}
