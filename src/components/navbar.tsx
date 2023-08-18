import Link from "next/link";
import Search from "./search";

export default function Navbar() {
  return (
    <nav className="bg-green-500 flex items-center justify-between h-16 px-8 mb-6"> 
      <Link href="/">
        <h3 className="text-silver-400 text-xl cursor-pointer">Characters</h3> 
      </Link>
      <ul className="w-1/2 gap-3 flex">
        <Link href="/" className="text-silver-400 hover:underline cursor-pointer">Home</Link> 
        <Link href="/" className="text-silver-400 hover:underline cursor-pointer">About</Link> 
      </ul>
      <div>
        <Search />
      </div>
    </nav>
  );
}

