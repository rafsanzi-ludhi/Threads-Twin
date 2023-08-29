"use client"

import { sidebarLinks } from "@/constants"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { OrganizationSwitcher, SignedIn } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";


function LeftSidebar() {
    // see if link is active by showing us which url we are on
    const router = useRouter(); //make sure to add a declaration at the top of the file "use client"
    const pathname = usePathname();
    
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {
                    // is Active variable ---> also needs styling 
                    const isActive = (pathname.includes
                        (link.route) && link.route.length >
                        1) || pathname === link.route;            

                
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            {/* hide label at smaller widths below 1024px*/}
                            <p className="text-light-1 max-lg:hidden">{link.label}</p>
                        </Link>
                    )
                }
                )}
            </div>

            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                        <div className='flex cursor-pointer gap-4 p-4'>
                            <Image
                            src='/public/assets/logout.svg'
                            alt='logout'
                            width={24}
                            height={24}
                            />
                            
                            <p className="text-light-2 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    )
}

export default LeftSidebar;