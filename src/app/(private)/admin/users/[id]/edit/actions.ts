'use server';
import { User } from "@/db/drizzleschema"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { updateUserSchema } from '@/lib/zodschema';
import { APIResponse } from "@/lib/types";

export async function getUser(id : number): Promise<APIResponse> {
  //   const session = await auth();
  //   if (!session) throw new Error('Unauthorized');

  const res = await fetch(process.env.API_URL + `users/${id}`, {
    method: 'GET',
  });
  const responseData = await res.json();
  console.log(responseData);
  return {status : 0, message : "", data: responseData.data[0]};

}



export async function updateUser(prevState: any, formData: FormData) {
  console.log("updateSample is called.");

  const validatedFields = updateUserSchema.safeParse(Object.fromEntries(formData.entries()));
  
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update user.' + JSON.stringify(formData),
    };
  }

  const { id, name, email, password } = validatedFields.data;

  try {
    const response = await fetch(process.env.API_URL + `users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    console.log(response);
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