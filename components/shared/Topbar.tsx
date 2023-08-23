import Image from "next/image";
import Link from "next/link";

function Topbar() {
    return (
        <nav className="topbar">
            <Link href="/" className="flex items-center gap-4" >
                <Image src= "/logo.svg" alt="logo" width={28} height={28} />
            </Link>
            <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
        </nav>
    )
}

export default Topbar;