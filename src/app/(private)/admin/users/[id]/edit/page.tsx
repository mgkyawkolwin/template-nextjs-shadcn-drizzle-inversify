"use client";
import { use, useActionState, useEffect, useState } from "react";

import { User } from "@/db/drizzleschema";
import { APIResponse } from "@/lib/types";

import { getUser, updateUser } from "@/app/(private)/admin/users/actions";

import UserEdit from "../../components/useredit";

export default function page({ params }: { params: { id: number } }) {
  //const {id} = use(params);

  return (
    <UserEdit params={params} />
  );
}