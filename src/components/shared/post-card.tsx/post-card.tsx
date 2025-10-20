"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/models/post/post";
import User from "@/lib/models/user/user";
import { getUserById } from "@/lib/services/user-service";
import {
  Ellipsis,
  EllipsisVertical,
  Flame,
  Heart,
  MessageSquare,
  Share,
  Share2,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PostCard({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  const [author, setAuthor] = useState<User | null>(null);
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
    <div className="w-full aspect-square bg-background dark:bg-muted/50">
      <div className="flex items-center gap-4 p-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={author.avatarBase64}
            className="object-center object-cover"
          />
          <AvatarFallback>{author.firstName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="full">
          <p className="w-full text-lg font-semibold truncate">
            {author.getFullName()}
          </p>
          <p className="text-xs text-muted-foreground">2 ngày trước</p>
        </div>
        <Ellipsis size={15} className="ml-auto text-muted-foreground" />
      </div>

      <p className="px-4 pb-4">{post.content}</p>

      <Image
        src={post.imageUrls[0]}
        alt="skjbdc"
        width={1000}
        height={1000}
        className="w-full h-auto aspect-square object-center object-cover "
      />

      <div className="flex items-center gap-4 p-4">
        <Button variant={"ghost"} className="grow">
          <Heart className="text-primary" />
        </Button>
        <Button variant={"ghost"} className="grow">
          <MessageSquare />
        </Button>
        <Button variant={"ghost"} className="grow">
          <Share2 />
        </Button>
      </div>
    </div>
  );
}
