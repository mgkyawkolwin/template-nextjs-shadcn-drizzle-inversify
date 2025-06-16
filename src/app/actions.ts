'use server';
import { redirect } from 'next/navigation';
import { signOut } from "@/app/auth";
import consoleLogger from '@/lib/core/logger/ConsoleLogger';
import { FormState } from '@/lib/types';

export async function signOutAction() : Promise<FormState>{
  consoleLogger.logInfo("singOutActionx");
  await signOut();
  consoleLogger.logInfo("singOutActionx");
  return redirect("/auth/signin");
  consoleLogger.logInfo("singOutActionx");
}