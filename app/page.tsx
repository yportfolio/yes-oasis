import PostList from "@/app/_components/PostList";
import UserInfo from "@/app/_components/UserInfo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container ">
      <UserInfo />
      <PostList />
    </main>
  );
}
