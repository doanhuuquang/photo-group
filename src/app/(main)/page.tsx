"use client";

import ButtonOnclickAnimate from "@/components/shared/buttons/button-onclick-animate";
import auth from "@/lib/firebase/firebase-auth";
import { signOut } from "firebase/auth";

export default function Home() {
  return (
    <div>
      {Array.from({ length: 100 }).map((_, index) => (
        <h1 key={index} className="text-4xl">
          Hello
        </h1>
      ))}
    </div>
  );
}
