"use client";
import { useActionState, useEffect, useState } from "react";

import { User } from "@/db/orm/drizzle/mysql/schema";
import { APIResponse } from "@/lib/types";

import { getUsers, updateUser } from "./actions";

import UserList from "./components/userlist";

export default function page() {

  return (
    <UserList />
  );
}