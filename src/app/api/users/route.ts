import { db } from "@/db/drizzledb";
import { user } from "@/db/drizzleschema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { container } from "@/lib/dicontainer";
import IUserService from "@/services/iuserservice";


export async function GET(request: Request) {
  try{
    const userService = container.get<IUserService>('IUserService');
    const selected = await userService.getUsers();
    return NextResponse.json({data : selected}, {status: 200});
  }catch(error){
    return NextResponse.json({ message: error}, { status: 500 });
  }
}



export async function POST(request: Request) {
  console.log("POST is called");
  try{
    const body = await request.json();
    const inserted = await db.insert(user).values(body);
    return NextResponse.json({ message: "Inserted"}, { status: 201 });
  }catch(error){
    return NextResponse.json({ message: "Unknown error occured."}, { status: 500 });
  }
}