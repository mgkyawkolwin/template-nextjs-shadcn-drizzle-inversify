"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

import {
  ColumnDef
} from "@tanstack/react-table"

import DataTable from "./datatable"
import { User } from "@/db/orm/drizzle/mysql/schema"
import consoleLogger from "@/lib/core/logger/ConsoleLogger"
import { FormState } from "@/lib/types"


const users: User[] = [
  {
    id: 1,
    name: "aa",
    userName: "pending",
    email: "m@example.com",
    password:"adf",
    role:"ADMIN",
    createdAt:null,
    updatedAt:null
  },
  {
    id: 1,
    name: "aa",
    userName: "pending",
    email: "m@example.com",
    password:"adf",
    role:"ADMIN",
    createdAt:null,
    updatedAt:null
  }
]

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "User ID",
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return <Button>Save</Button>
    }
  },
];

interface DataTableProps<TData, TValue> {
  formState: FormState
  formAction: (formData: FormData) => void
  isPending: boolean
}

export default function UserListTable<TData, TValue>({
  formState,
  formAction,
  isPending
}: DataTableProps<TData, TValue>) {
  consoleLogger.logInfo('Client UserListTable');
  consoleLogger.logDebug(JSON.stringify(formState));

  return (
    <DataTable columns={columns} data={formState.data ?? []} formState={formState} formAction={formAction} isPending={isPending} />
  )
}