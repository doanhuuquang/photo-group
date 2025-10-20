"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/lib/context/user-context";
import { Post } from "@/lib/models/post/post";
import { upLoadPhotosToCloudinary } from "@/lib/services/cloudinary-service";
import { createPost } from "@/lib/services/post-service";
import { ImagePlus, LoaderCircle, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Link from "next/link";

export function CreatePostDialog() {
  const { user, loading } = useUser();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    setSelectedFiles((prev) => {
      const existingNames = prev.map((f) => f.name + f.lastModified);
      const newFiles = files.filter(
        (file) => !existingNames.includes(file.name + file.lastModified)
      );
      return [...prev, ...newFiles];
    });
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(URL.createObjectURL(selectedFiles[index]));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    if (!user) return;

    setIsUploading(true);

    try {
      const fileUploadedUrls: string[] =
        selectedFiles.length !== 0
          ? await upLoadPhotosToCloudinary("posts", selectedFiles)
          : [];

      await createPost({
        id: "",
        authorId: user.id,
        content: content,
        imageUrls: fileUploadedUrls,
        peopleWhoLiked: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Post);

      toast("Yeahhhhhh!", {
        description: "Đã đăng bài viết thành công.",
        action: {
          label: "Oke",
          onClick: () => null,
        },
      });
    } catch (error) {
      toast("Opps!", {
        description: `Đăng bài viết thất bại, vui lòng thử lại sau: ${error}`,
        action: {
          label: "Oke",
          onClick: () => null,
        },
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 items-center">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="grow h-10" />
      </div>
    );
  }

  return (
    <Dialog>
      <div className="flex gap-4 items-center">
        <Link href={"/user/" + user?.id}>
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <DialogTrigger asChild>
          <div className="w-full bg-accent rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-accent/80 cursor-pointer">
            Cho mọi người biết bạn đang nghĩ gì đi
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tạo bài viết</DialogTitle>
          <DialogDescription>
            Chia sẻ những suy nghĩ và khoảnh khắc của bạn với mọi người.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-5 gap-4">
          {selectedFiles.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);

            return (
              <div
                key={index}
                className="relative w-full h-auto aspect-square rounded-lg overflow-hidden group"
              >
                <Image
                  src={imageUrl}
                  alt={`Ảnh ${index + 1}`}
                  fill
                  className="object-cover group-hover:grayscale"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-background/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition hover:cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            );
          })}

          <Label
            htmlFor="open-file"
            className="w-full h-auto aspect-square bg-muted/50 rounded-md flex justify-center items-center cursor-pointer hover:bg-muted"
          >
            <ImagePlus className="text-muted-foreground" />
          </Label>
        </div>

        <Input
          id="open-file"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        <div className="grid gap-4">
          <Textarea
            disabled={isUploading}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì?"
            className="resize-none min-h-[12rem] max-h-[12rem] overflow-y-auto hide-scrollbar"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild disabled={isUploading}>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            onClick={() => onSubmit()}
            type="submit"
            disabled={
              isUploading ||
              (selectedFiles.length === 0 && content.trim() === "")
            }
          >
            {isUploading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Chia sẻ"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
