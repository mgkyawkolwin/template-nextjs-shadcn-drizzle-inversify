"use client";
import { useActionState, useEffect, useState } from "react";

import { User } from "@/db/orm/drizzle/mysql/schema";
import { APIResponse } from "@/lib/types";

import { userGetAll, userUpdate } from "@/app/(private)/admin/users/actions";
import { toast } from "sonner";

export default function UserList() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [state, formAction, isPending] = useActionState(userUpdate, {
    error: false,
    message: "",
    data : null,
    formData: null
  });

  const fetchData = async () => {
    const result = await userGetAll();
    if(!result.error){
      setUsers(result.data);
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(state.error){
      toast(state.message);
    }
  },[state]);


  if (!isLoaded) return <div>Loading ...</div>;
  if (users.length === 0) return <div>No Data</div>;
  if(state.error) return <div>{state.message}</div>

  return (
    <div>this is sample list page
      {users.map((user) => (
        <div key={user.id}>
          {/* <form key={user.id} action={formAction}> */}
          <input name="id" defaultValue={user.id} />
          <input name="name" defaultValue={user.name ?? ""} />
          <input name="email" defaultValue={user.email ?? ""} />
          <input name="password" defaultValue={user.password ?? ""} />
          <input type="submit" value={"Save"}></input>
          {/* </form> */}
        </div>
      ))}
    </div>
  );
}