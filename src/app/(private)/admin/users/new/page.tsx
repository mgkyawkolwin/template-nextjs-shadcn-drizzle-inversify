"use server";

import UserCreate from "@/app/(private)/admin/users/new/usercreate";
import { userCreate } from "./actions";

export default async function UserNewPage() {

  return (
    <UserCreate action={userCreate}/>
  );
}