import { CreatePostDialog } from "@/components/shared/create-post-dialog/create-post-dialog";
import PostCard from "@/components/shared/post-card.tsx/post-card";

export default function Home() {
  return (
    <div className="w-full h-full lg:grid grid-cols-2 gap-4 bg-muted dark:bg-background">
      <div className="w-full h-full col-span-1 m-auto space-y-0.5 overflow-y-auto hide-scrollbar">
        <div className="w-full bg-background dark:bg-muted/50 p-4">
          <CreatePostDialog />
        </div>
        {Array.from({ length: 100 }).map((_, index) => (
          <PostCard key={index} />
        ))}
      </div>
      <div className="lg:block hidden">hehehe</div>
    </div>
  );
}
