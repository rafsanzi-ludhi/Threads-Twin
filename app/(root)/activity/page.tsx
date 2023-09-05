import Image from "next/image"; // Import Next.js Image component for optimized image loading
import Link from "next/link"; // Import Next.js Link for client-side navigation
import { currentUser } from "@clerk/nextjs"; // Import Clerk function to get the current user
import { redirect } from "next/navigation"; // Import Next.js redirect function

import { fetchUser, getActivity } from "@/lib/actions/user.actions"; // Import user-related API actions

async function Page() {
  const user = await currentUser(); // Get the current user using Clerk
  if (!user) return null; // If no user, return null

  const userInfo = await fetchUser(user.id); // Fetch additional user info
  if (!userInfo?.onboarded) redirect("/onboarding"); // Redirect to onboarding if not onboarded

  const activity = await getActivity(userInfo._id); // Fetch the user's activity

  // JSX for rendering the activity page
  return (
    <>
      <h1 className='head-text'>Activity</h1>

      <section className='mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                {/* Individual activity card */}
              </Link>
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>No threads made yet</p>
        )}
      </section>
    </>
  );
}

export default Page;
