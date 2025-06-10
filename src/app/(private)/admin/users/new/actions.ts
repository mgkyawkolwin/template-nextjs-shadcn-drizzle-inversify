'use server';
import { User } from "@/db/orm/drizzle/mysql/schema"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insertUserSchema } from '@/lib/zodschema';
import { APIResponse } from "@/lib/types";


export async function createUser(prevState: any, formData: FormData) {

  const validatedFields = insertUserSchema.safeParse(Object.fromEntries(formData.entries()));
  
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update user.' + JSON.stringify(formData),
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const response = await fetch(process.env.API_URL + `users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create sample');
    }

    const data = await response.json();

    // Revalidate cache and redirect
    //revalidatePath('/sample');
    //redirect('/sample');

    //return data;
  } catch (error) {
    console.error('Update Sample Error:', error);
    return {
      message: 'Database Error: Failed to create sample.',
    };
  }
  redirect('/users');
}