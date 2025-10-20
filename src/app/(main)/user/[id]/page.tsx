import PostList from "@/components/shared/post-list/post-list";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <PostList userId={(await params).id} />
    </div>
  );
}
