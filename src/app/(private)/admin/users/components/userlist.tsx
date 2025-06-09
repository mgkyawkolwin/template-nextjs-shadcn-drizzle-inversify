"use client";
import { useActionState, useEffect, useState } from "react";

import { User } from "@/db/drizzleschema";
import { APIResponse } from "@/lib/types";

import { getUsers, updateUser } from "@/app/(private)/admin/users/actions";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const [state, formAction, isPending] = useActionState(updateUser, {
    error: null,
    success: false,
    message: null
  });

  const fetchData = async () => {
    const result = await getUsers();
    if(result.status === 0){
      setUsers(result.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isPending]);


  if (!users) return <div>Loading ...</div>;
  if (users.length === 0) return <div>No Data</div>;
  if(state.error) return <div>{state.message}</div>

  return (
    <div>this is sample list page
      {users.map((user) => (
        <div key={user.id}>
          <form action={formAction}>
          <input name="id" defaultValue={user.id} />
          <input name="name" defaultValue={user.name ?? ""} />
          <input name="email" defaultValue={user.email ?? ""} />
          <input name="password" defaultValue={user.password ?? ""} />
          <input type="submit" value={"Save"}></input>
          </form>
        </div>
      ))}
    </div>
  );
}