import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // Removed the fetchUser related code
  // if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>
      
      {/* If you're using userInfo._id elsewhere, consider replacing it */}
      <PostThread userId={user.id} />
    </>
  );
}

export default Page;
