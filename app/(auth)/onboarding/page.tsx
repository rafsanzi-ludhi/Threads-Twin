import { currentUser } from "@clerk/nextjs"; // Importing Clerk's current user function
import { redirect } from "next/navigation";  // Importing Next.js redirect function

import { fetchUser } from "@/lib/actions/user.actions"; // Importing a function to fetch user data
import AccountProfile from "@/components/forms/AccountProfile"; // Importing the AccountProfile component

async function Page() {
  const user = await currentUser(); // Fetching the current user
  if (!user) return null; // Exit if no user, mainly to avoid TypeScript warnings

  const userInfo = await fetchUser(user.id); // Fetching additional user info
  if (userInfo?.onboarded) redirect("/"); // Redirect to home if user is already onboarded

  // Mapping user data from both Clerk and the fetched data
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  // Returning the JSX for rendering
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Account Set Up</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile before using Threads
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
}

export default Page;
