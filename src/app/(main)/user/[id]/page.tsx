import PostList from "@/components/shared/post-list/post-list";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="w-full max-w-md m-auto">
      <PostList userId={"jMs4PVQkTghcRgkHylWUZ0D0ZPB2"} />
    </div>
  );
}
