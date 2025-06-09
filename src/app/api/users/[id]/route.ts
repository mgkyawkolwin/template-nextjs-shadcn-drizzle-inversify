import { db } from "@/db/drizzledb";
import { user } from "@/db/drizzleschema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";


export async function GET(request: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = await params;
        const selected = await db.select().from(user).where(eq(user.id, id));
        if (selected.length === 0) {
            return NextResponse.json({ message: "Not found." }, { status: 404 });
        }
        return NextResponse.json({ data: selected }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Unknow error occured." }, { status: 500 });
    }
}


export async function PUT(request: Request, { params }: { params: { id: number } }) {
    try{
        const body = await request.json();
        const { id } = await params;
        await db.update(user)
            .set(body)
            .where(eq(user.id, id));
        return NextResponse.json({ message: "Updated" }, { status: 201 });
    }catch(error){
        return NextResponse.json({ message: "Unknow error occured." }, { status: 500 });
    }
}



export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try{
        const {id} = await params;
        const selected = await db.select().from(user).where(eq(user.id, id));
        if (selected.length === 0) {
            return NextResponse.json({ message: "Not found." }, { status: 404 });
        }
        await db.delete(user).where(eq(user.id, Number(params.id)));
        return NextResponse.json({ message: "Deleted" }, { status: 200 });
    }catch(error){
        return NextResponse.json({ message: "Unknow error occured." }, { status: 500 });
    }
}