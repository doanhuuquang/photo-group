"use client";

import { Post } from "@/lib/models/post/post";
import { useEffect, useState } from "react";
import { getPostsByAuthorId } from "@/lib/services/post-service";
import { LoaderCircle } from "lucide-react";
import PostCard from "@/components/shared/post-card.tsx/post-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PostList({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts: Post[] = await getPostsByAuthorId(userId);
      setPosts(posts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) return <LoaderCircle className="animate-spin" />;

  return (
    <div>
      <Carousel className="w-full max-w-lg">
        <CarouselContent>
          {posts.map((post, index) => (
            <CarouselItem key={index}>
              <PostCard post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
