import { db } from "@/db/orm/drizzle/mysql/db";
import { user } from "@/db/orm/drizzle/mysql/schema";
import { NextResponse } from "next/server";
import { container } from "@/dicontainer";
import IUserService from "@/services/contracts/IUserService";
import { TYPES } from "@/lib/types";
import consoleLogger from "@/lib/core/logger/ConsoleLogger";


export async function GET(request: Request) {
  try{
    consoleLogger.logInfo("GET /api/users/[id]");
    consoleLogger.logDebug(JSON.stringify(request));
    const userService = container.get<IUserService>(TYPES.IUserServce);
    const selected = await userService.userFindAll();
    return NextResponse.json({data : selected}, {status: 200});
  }catch(error){
    consoleLogger.logError(error instanceof Error ? error.message : String(error));
    return NextResponse.json(error, { status: 500 });
  }
}



export async function POST(request: Request) {
  try{
    consoleLogger.logInfo("GET /api/users/[id]");
    consoleLogger.logDebug(JSON.stringify(request));
    const body = await request.json();
    const userService = container.get<IUserService>(TYPES.IUserServce);
    const selected = await userService.userCreate(body);
    return NextResponse.json({ message: "Inserted"}, { status: 201 });
  }catch(error){
    consoleLogger.logError(error instanceof Error ? error.message : String(error));
    return NextResponse.json({ message: "Unknown error occured."}, { status: 500 });
  }
}