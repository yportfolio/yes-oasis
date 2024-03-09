import Heading from "@/app/_components/Heading";
import PostList from "@/app/_components/PostList";
import UserInfo from "@/app/_components/UserInfo";

export default function Home() {
  return (
    <main className="container ">
      {/* <UserInfo /> */}
      <Heading />
      <PostList />
    </main>
  );
}
