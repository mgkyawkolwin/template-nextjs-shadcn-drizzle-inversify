'use server';
//Ordered Imports

//Local Imports
import { User } from "@/db/orm/drizzle/mysql/schema"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { userUpdateSchema } from '@/lib/zodschema';
import { APIResponse } from "@/lib/types";
import consoleLogger from "@/lib/core/logger/ConsoleLogger";
import { FormState } from "@/lib/types";

export async function userGet(id : number): Promise<FormState> {
  try{
    consoleLogger.logInfo('Actions > /admin/users/[id]/edit > userGet');

    //retrieve user
    const response = await fetch(process.env.API_URL + `users/${id}`, {
      method: 'GET',
    });

    //user retrieval fail
    if(!response.ok)
      return {error: true, message: "Failed to retrieve user.", data: null};

    //user retrieval success
    const responseData = await response.json();
    return {error:false, message : "", data: responseData.data[0]};
  }catch(error){
    consoleLogger.logError(error instanceof Error ? error.message : String(error));
    return {error: true, message: "Failed to retrieve user.", data: null};
  }

}



export async function userUpdate(formState : FormState, formData: FormData) : Promise<FormState>{
  try {
    consoleLogger.logInfo('Actions > /admin/users/[id]/edit > userUpdate');

    //validate and parse form input
    const validatedFields = userUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
    
    //form validation fail
    if (!validatedFields.success) {
      consoleLogger.logError(JSON.stringify(validatedFields.error.flatten().fieldErrors));
      return { error: true, message: 'Invalid inputs.', data: null};
    }

    //form validation pass
    const { id, name, email, password } = validatedFields.data;

    //update user
    const response = await fetch(process.env.API_URL + `users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    //update user failed
    if (!response.ok) {
      const errorData = await response.json();
      consoleLogger.logError(errorData.message);
      return { error: true, message: 'Failed to update user.', data: null};
    }

    //update user success
    const data = await response.json();
    return {error: false, message:"", data: data};
  } catch (error) {
    consoleLogger.logError(error instanceof Error ? error.message : String(error));
    return {error: true, message: 'Failed to update user.', data: null};
  }
}