// function PostThread({ userId }: { userId: string }) {
//     return <h1>Post Thread Form</h1>;
// }

"use client";

import * as z from "zod"
import { useForm, useFormState } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";


// import { updateUser } from "@/lib/actions/user.actions";
// import { UserValidation } from "@/lib/validations/user";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}




function PostThread() {
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("media");
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    }
  });    
    
    return <h1>Post Thread Form</h1>;
}
export default PostThread;
