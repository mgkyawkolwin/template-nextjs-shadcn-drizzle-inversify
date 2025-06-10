'use server';
import { User } from "@/db/orm/drizzle/mysql/schema"
import { query } from '@/lib/db';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { updateUserSchema } from '@/lib/zodschema'; // Your validation schema
//import { type Sample } from '@/lib/types'; // Your types

export async function getSample() {
    //   const session = await auth();
    //   if (!session) throw new Error('Unauthorized');
    console.log("X");
    
    const res = await fetch(process.env.API_URL + 'users/1', {
      method: 'GET',
    });
    const responseData = await res.json();
    return responseData;
    }

    

export async function updateSample(prevState: any, formData: FormData){
  // const rawData = {
  //   id: formData.get("id"),
  //   col1: formData.get("col1"),
  // };
  // Validate the form data
  console.log("X");
  const validatedFields = updateUserSchema.safeParse(Object.fromEntries(formData.entries()));
  //const validatedFields = updateSampleSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update user.'+ JSON.stringify(formData),
    };
  }

  const { id, col1 } = validatedFields.data;

  try {
    const response = await fetch(`http://localhost:3000/api/samples/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ col1 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user');
    }

    const data = await response.json();
    
    // Revalidate cache and redirect
    //revalidatePath('/sample');
    //redirect('/sample');
    
    return data;
  } catch (error) {
    console.error('Update User Error:', error);
    return {
      message: 'Database Error: Failed to update user.',
    };
  }
}