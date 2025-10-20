"use client";

import { CreatePostDialog } from "@/components/shared/create-post-dialog/create-post-dialog";
import PostCard from "@/components/shared/post-card.tsx/post-card";
import PostList from "@/components/shared/post-list/post-list";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Post } from "@/lib/models/post/post";
import { getPostsByAuthorId } from "@/lib/services/post-service";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts: Post[] = await getPostsByAuthorId(
        "jMs4PVQkTghcRgkHylWUZ0D0ZPB2"
      );
      setPosts(posts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) return <LoaderCircle className="animate-spin" />;

  return (
    <div className="w-full h-screen">
      <Carousel orientation="vertical" className="w-full h-screen p-0 ">
        <CarouselContent className="h-screen">
          {posts.map((post, index) => (
            <CarouselItem key={index}>
              <PostCard post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
