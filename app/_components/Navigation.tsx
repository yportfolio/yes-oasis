import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2, SearchIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MusicPlayer from "@/app/_components/MusicPlayer";

const Navigation = () => {
  return (
    <div className="flex items-center h-14 dark:border-gray-700 justify-between container">
      <div className="flex">
        <Link
          className="flex items-center font-semibold text-lg md:text-base"
          href="/"
        >
          Acme Inc
        </Link>

        <div className="w-48 mx-4">
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full pl-8 peer placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <MusicPlayer />
        <Button variant="link">
          <Link2 />
          <Link
            className="flex items-center font-semibold text-lg md:text-base"
            href="/new"
          >
            Write
          </Link>
        </Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Navigation;
