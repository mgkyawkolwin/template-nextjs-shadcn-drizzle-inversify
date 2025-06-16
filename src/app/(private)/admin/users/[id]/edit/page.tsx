"use server";
import { userGet, userUpdate } from "./actions";
import UserEdit from "./useredit";

export default async function UserEditPage({ params }: { params: { id: number } }) {

  return (
    <UserEdit params={{id:params.id, getFunc: userGet, updateFunc: userUpdate}} />
  );
} 