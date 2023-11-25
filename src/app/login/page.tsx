"use client"
import Header from "@/components/header.components";
import { LoginForm } from "./form";

// pages/login.tsx
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 

    if (session) {
      router.replace('/');
    }
  }, [session, status, router]);

  return (
    <>
    <Header />
      <section className="bg-ct-blue-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
