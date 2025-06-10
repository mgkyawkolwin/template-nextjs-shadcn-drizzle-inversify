// app/CustomerList.tsx
"use client";

import { User } from "@/db/orm/drizzle/mysql/schema";

import { use, useActionState, useEffect, useState } from "react";

import { getUser, updateUser } from "@/app/(private)/admin/users/actions";

export default function UserView({ params }: { params: Promise<{ id: number }> }) {
  //const {id} = use(params);
  const { id } = use(params);
  const [user, setUser] = useState<{ data : User} | null>(null);

  const [state, formAction, isPending] = useActionState(updateUser, {
    error: null,
    success: false,
  });

  const fetchData = async () => {
    const response = await getUser(id); // Calls server action
    setUser(response.data);
    console.log(response);
  };

  useEffect(() => {
    fetchData();
  }, [isPending]);

  useEffect(() => {
    console.log(state);console.log("STATE CHANGEDx");
  }, [state]);

  if (!user) return <div>Loadingx...</div>;
  if( state.errors) return <div>{state.message}</div>

  return (
    <div key={user.id}>
          <form action={formAction}>
          <input name="id" defaultValue={user.id} />
          <input name="name" defaultValue={user.name} />
          <input name="email" defaultValue={user.email ?? ""} />
          <input name="password" defaultValue={user.password} />
          <input type="submit" value={"save"}></input>
          </form>
        </div>
  );
}