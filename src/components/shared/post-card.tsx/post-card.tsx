import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

export default function PostCard({ className }: { className?: string }) {
  return (
    <div className="w-full aspect-square bg-background dark:bg-muted/50">
      <div className="flex items-center gap-4 p-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="full">
          <p className="w-full text-lg font-semibold truncate">
            Đoàn Hữu Quang
          </p>
          <p className="text-xs text-muted-foreground">2 ngày trước</p>
        </div>
        <Ellipsis size={15} className="ml-auto text-muted-foreground" />
      </div>

      <p className="px-4 pb-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum saepe
        vero quasi maxime obcaecati illo repellendus, quod autem aliquid culpa
        minus, assumenda tenetur atque repudiandae voluptatum praesentium quo
        cupiditate tempora?
      </p>

      <Image
        src={"/assets/images/auth-images/auth-image-1.jpg"}
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
