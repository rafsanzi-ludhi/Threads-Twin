import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // Removed fetchUser and related logic
  // const userInfo = await fetchUser(user.id);
  // if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>
      
      {/* Replaced userInfo._id with user.id */}
      <PostThread userId={user.id} />
    </>
  );
}

export default Page;
