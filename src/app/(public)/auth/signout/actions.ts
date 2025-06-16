'use server';
import { redirect } from 'next/navigation';
import { signOut } from "@/app/auth";
import consoleLogger from '@/lib/core/logger/ConsoleLogger';

export async function signOutAction() : Promise<void>{
  consoleLogger.logInfo("singOutAction");
  await signOut();
  redirect("/auth/signin");
}
