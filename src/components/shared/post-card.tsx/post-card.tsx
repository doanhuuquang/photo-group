"use client";

import ButtonOnclickAnimate from "@/components/shared/buttons/button-onclick-animate";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/models/post/post";
import User from "@/lib/models/user/user";
import { getUserById } from "@/lib/services/user-service";
import { cn } from "@/lib/utils";
import {
  Ellipsis,
  EllipsisVertical,
  Flame,
  Heart,
  Maximize,
  MessageSquare,
  Share,
  Share2,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { transform } from "zod";

export default function PostCard({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  const [author, setAuthor] = useState<User | null>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      const user: User | null = await getUserById(post.authorId);

      if (user) setAuthor(user);

      setIsLoading(false);
    };

    fetchAuthor();
  }, [post.id]);

  if (!author) return null;

  return (
    <div className="w-full h-screen bg-background lg:p-6 ">
      <div className="w-fit h-full bg-background m-auto relative lg:rounded-3xl group transition-shadow duration-300 ease-in-out">
        <Image
          src={post.imageUrls[0]}
          alt="Post image"
          width={1000}
          height={1500}
          className="h-full w-auto object-contain lg:rounded-3xl"
        />

        <div
          className={cn(
            "w-full h-full absolute z-4 bottom-0 left-0 flex flex-col justify-between gap-4 p-4 lg:rounded-3xl transition-colors duration-500 ease-in-out",
            !isFullScreen
              ? "bg-gradient-to-t from-background to-transparent"
              : "bg-transparent"
          )}
        >
          <ButtonOnclickAnimate
            onClick={() => setIsFullScreen(!isFullScreen)}
            size={"icon"}
            className="absolute top-0 right-0 ml-auto rounded-full bg-black/50 hover:bg-black/70 text-white"
          >
            <Maximize />
          </ButtonOnclickAnimate>

          <div
            className={cn(
              "w-full max-w-lg mx-auto space-y-4 transition-opacity duration-500 ease-in-out",
              isFullScreen ? "opacity-0" : "opacity-100"
            )}
          >
            <p className="text-sm ">{post.content}</p>

            <div className="w-full h-fit flex gap-4 justify-between ">
              <Avatar className="w-12 h-12 mb-1">
                <AvatarImage src={author.avatarBase64} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="text-center space-y-2">
                <ButtonOnclickAnimate
                  variant={"outline"}
                  size={"icon-lg"}
                  className="rounded-full"
                >
                  <Heart />
                </ButtonOnclickAnimate>
              </div>

              <div className="text-center text-sm space-y-2">
                <ButtonOnclickAnimate
                  variant={"outline"}
                  size={"icon-lg"}
                  className="rounded-full"
                >
                  <MessageSquare />
                </ButtonOnclickAnimate>
              </div>

              <div className="text-center text-sm space-y-2">
                <ButtonOnclickAnimate
                  variant={"outline"}
                  size={"icon-lg"}
                  className="rounded-full"
                >
                  <Share />
                </ButtonOnclickAnimate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
