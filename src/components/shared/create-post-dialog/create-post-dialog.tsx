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
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function CreatePostDialog() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <form>
        <div className="flex gap-4 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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

          <Label htmlFor="add-img">Thêm ảnh cho bài viết</Label>
          <div id="add-img" className="grid grid-cols-5 gap-4 flex-wrap">
            {/* Hiển thị những ảnh đã chọn */}
            {selectedFiles.map((file, index) => {
              const imageUrl = URL.createObjectURL(file);

              return (
                <div
                  key={index}
                  className="relative w-full h-auto aspect-square rounded-lg overflow-hidden group group"
                >
                  <Image
                    src={imageUrl}
                    alt={`Ảnh ${index + 1}`}
                    fill
                    className="object-cover group-hover:blur-lg"
                  />
                  {/* Nút xóa ảnh đã chọn */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-1 opacity-0 group-hover:opacity-100 transition hover:cursor-pointer"
                  >
                    <X className="w-5 h-5 " />
                  </button>
                </div>
              );
            })}

            {/* Nút thêm ảnh */}
            <Label
              htmlFor="open-file"
              className="w-full h-auto aspect-square bg-muted/50 rounded-md flex justify-center items-center cursor-pointer hover:bg-muted"
            >
              <Plus className="text-muted-foreground" />
            </Label>
          </div>
          {/* Input chọn file (đã ẩn) */}
          <Input
            id="open-file"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="grid gap-4">
            <Textarea
              placeholder="Bạn đang nghĩ gì?"
              className="resize-none min-h-[12rem] max-h-[12rem] overflow-y-auto hide-scrollbar"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button type="submit">Chia sẻ</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
