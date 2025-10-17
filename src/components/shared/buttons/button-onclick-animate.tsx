"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { VariantProps } from "class-variance-authority";

interface ButtonOnclickAnimateProps
  extends VariantProps<typeof buttonVariants> {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonOnclickAnimate({
  onClick,
  children,
  className,
  variant = "default",
  size = "default",
}: ButtonOnclickAnimateProps) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!isClicked) return;

    const timeoutId = setTimeout(() => {
      setIsClicked(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isClicked]);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => {
        onClick();
        setIsClicked(true);
      }}
      className={cn(
        className,
        "relative overflow-hidden transition-transform",
        isClicked && "button-onclick-animate"
      )}
    >
      {children}
    </Button>
  );
}
