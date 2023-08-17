import Link from "next/link";
import Search from "./search";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-16 px-32">
      <Link href="/">
      <h3>Characters</h3>
      </Link>
      <ul className="w-1/2 gap-3 flex">
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
      </ul>
      <div>
      <Search/>
      </div>
    </nav>
  );
}