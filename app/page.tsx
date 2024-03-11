import Heading from "@/app/_components/Heading";
import PostList from "@/app/_components/PostList";
import UserInfo from "@/app/_components/UserInfo";

export default async function Home() {
  return (
    <main className="container space-y-6">
      <UserInfo />
      <Heading />
      <div className="grid grid-cols-3 gap-4">
        <PostList className="col-span-2" />
        <div className="col-span-1">side bar</div>
      </div>
    </main>
  );
}
