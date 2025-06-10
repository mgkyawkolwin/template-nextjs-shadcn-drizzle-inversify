import { db } from "@/db/orm/drizzle/mysql/db";
import { user } from "@/db/orm/drizzle/mysql/schema";
import { NextResponse } from "next/server";
import { container } from "@/dicontainer";
import IUserService from "@/services/IUserService";
import { TYPES } from "@/lib/types";


export async function GET(request: Request) {
  try{
    const userService = container.get<IUserService>(TYPES.IUserServce);
    const selected = await userService.userFindAll();
    return NextResponse.json({data : selected}, {status: 200});
  }catch(error){
    return NextResponse.json({ message: error}, { status: 500 });
  }
}



export async function POST(request: Request) {
  try{
    const body = await request.json();
    const userService = container.get<IUserService>(TYPES.IUserServce);
    const selected = await userService.userCreate(body);
    return NextResponse.json({ message: "Inserted"}, { status: 201 });
  }catch(error){
    return NextResponse.json({ message: "Unknown error occured."}, { status: 500 });
  }
}