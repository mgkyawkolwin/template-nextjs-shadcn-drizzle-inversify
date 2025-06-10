"use client";
import { useActionState, useEffect, useState } from "react";

import { User } from "@/db/orm/drizzle/mysql/schema";
import { APIResponse } from "@/lib/types";

import { createUser } from "./actions";

export default function SampleNew() {

  const [state, formAction, isPending] = useActionState(createUser, {
    error: null,
    success: false,
    message: null
  });

  useEffect(() => {
  }, [isPending]);


  if(state.error) return <div>{state.message}</div>

  return (
    <div>NEW
          {!state.error &&
            <div>{state.message}</div>
            }
          <form action={formAction}>
          <input name="name" />
          <input name="email" />
          <input name="password" />
          <input type="submit" value={"Save"}></input>
          </form>
    </div>
  );
}