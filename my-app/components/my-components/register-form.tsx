"use client";

import { Lock, Mail, ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import { useActionState, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import RegisterFormAction from "@/app/actions/registerFormAction";

export default function RegisterForm() {  
  const [state, formAction, pending] = useActionState(RegisterFormAction, null) 

  if(state?.success){
    toast.success("Registration successful! Please faça Login.");
    signIn(undefined, { callbackUrl: "/auth/login" });

  } 

  return (
    <div className="w-full max-w-md px-4 sm:px-0">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 transition-colors">
        <Link 
          href="/auth/login"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {/*  tinha algo aqui */}
        </Link>

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Criar Conta</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Criando uma nova conta</p>
        </div>

        <form action={formAction} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="block w-full pl-10 pr-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="you@example.com"
              />
              {state?.error?.email && (<p className="mt-1 text-sm text-red-600" aria-live="polite">{state.error.email}</p>) }
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                name="password"                
                required
                className="block w-full pl-10 pr-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
                minLength={6}
              />
              {state?.error?.password && (state.error.password.map(key => <p className="mt-1 text-sm text-red-600" aria-live="polite">{key}</p>)) }
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirme Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
                className="block w-full pl-10 pr-3 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
                minLength={6}
              />
              {state?.error?.confirmPassword && (state.error.confirmPassword.map(key => <p className="mt-1 text-sm text-red-600" aria-live="polite">{key}</p>)) }
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center py-2 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {pending ? "Creating account..." : "Criando conta"}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Você tem uma conta ?{" "}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Fazer Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}