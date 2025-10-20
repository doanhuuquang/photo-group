import { CreatePostDialog } from "@/components/shared/create-post-dialog/create-post-dialog";
import PostCard from "@/components/shared/post-card.tsx/post-card";

export default function Home() {
  return (
    <div className="w-full h-full lg:grid grid-cols-2 gap-0.5 bg-muted dark:bg-background">
      <div className="w-full h-full col-span-1 m-auto space-y-0.5 overflow-y-auto hide-scrollbar">
        <div className="w-full bg-background dark:bg-muted/50 p-4">
          <CreatePostDialog />
        </div>
      </div>
      <div className="lg:block hidden bg-background dark:bg-muted/50 p-4">
        hehehe
      </div>
    </div>
  );
}
