"use client";
import { useActionState, useEffect, useState } from "react";

import { User } from "@/db/drizzleschema";
import { APIResponse } from "@/lib/types";

import { getUser, updateUser } from "@/app/(private)/admin/users/actions";

export default function UserEdit({ params }: { params: { id: number } }) {
  const [user, setUser] = useState<User | null>(null);

  const [state, formAction, isPending] = useActionState(updateUser, {
    error: null,
    success: false,
    message: null
  });

  const fetchData = async () => {
    const result = await getUser(params.id);
    if(result.status === 0){
      setUser(result.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isPending]);


  if (!user) return <div>Loading ...</div>;
  if(state.error) return <div>{state.message}</div>

  return (
    <div>EDIT
      <form action={formAction}>
          <input name="id" defaultValue={user.id} />
          <input name="name" defaultValue={user.name ?? ""} />
          <input name="email" defaultValue={user.email ?? ""} />
          <input name="password" defaultValue={user.password ?? ""} />
          <input type="submit" value={"Save"}></input>
          </form>
    </div>
  );
}