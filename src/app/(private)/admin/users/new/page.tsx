"use server";

import UserNew from "@/components/user/usernew";
import { createUser } from "./actions";

export default async function UserNewPage() {

  return (
    <UserNew action={createUser}/>
  );
}