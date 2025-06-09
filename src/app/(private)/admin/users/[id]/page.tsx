// app/CustomerList.tsx
"use client";

import { User } from "@/db/drizzleschema";

import { use, useActionState, useEffect, useState } from "react";

import { getUser, updateUser } from "@/app/(private)/admin/users/actions";

import UserView from "../components/userview";

export default function page({ params }: { params: Promise<{ id: number }> }) {
  

  return (
    <UserView params={params} />
  );
}