'use server';
import { signOutAction } from "./actions";
import SignOut from "@/app/(public)/auth/signout/SignOut";
 
export default function SignOutPage() {

  return (
    <SignOut action={signOutAction} />
  )
}