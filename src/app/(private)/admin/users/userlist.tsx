"use client";
import { useActionState, useEffect, useState } from "react";

import { User } from "@/db/orm/drizzle/mysql/schema";
import { APIResponse } from "@/lib/types";

import { userGetList, userUpdate } from "@/app/(private)/admin/users/actions";
import { toast } from "sonner";
import UserListTable from "@/components/tables/userlisttable";
import consoleLogger from "@/lib/core/logger/ConsoleLogger";

export default function UserList() {
  consoleLogger.logInfo("Client > UserList");

  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [state, formAction, isPending] = useActionState(userGetList, {
    error: false,
    message: ""
  });

  // const fetchData = async () => {
  //   consoleLogger.logInfo('UserList -> fetchData()');
  //   const result = await userGetList(state,new FormData());
  //   if(!result.error){
  //     consoleLogger.logDebug(JSON.stringify(result.data));
  //     setUsers(result.data);
      
  //   }
  //   setIsLoaded(true);
  // };

  // useEffect(() => {consoleLogger.logInfo('useEffect is called.');
  //   fetchData();
  // }, []);

  useEffect(() => {
    if(state.error){
      toast(state.message);
    }
  },[state]);

  return (
    <UserListTable formState={state} formAction={formAction} isPending={isPending} />
  );
}