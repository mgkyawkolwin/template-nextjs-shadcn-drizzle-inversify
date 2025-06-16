"use client";
import { useActionState, useEffect, useState } from "react";
//Local Imports
import { User } from "@/db/orm/drizzle/mysql/schema";
import { FormState } from "@/lib/types";

export default function UserEdit({ params }:{ params:{ id:number, getFunc:(id:number) => Promise<FormState>, updateFunc:(formState:FormState, formData:FormData) => Promise<FormState> } }) {
  const [user, setUser] = useState<User | null>(null);

  const [state, formAction, isPending] = useActionState(params.updateFunc, {
    error: false,
    message: "",
    data : null
  });

  const fetchData = async () => {
    const result = await params.getFunc(params.id);
    if(!result.error){
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