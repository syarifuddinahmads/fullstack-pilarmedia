'use client'
import Header from "@/components/header.components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UnitTest(){
    const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 

    if (!session) {
      router.replace('/login');
    }
  }, [session, status, router]);
    return (
        <>
        <Header/>
        <div>
            <h1>Penerapan Unit Testing</h1>       
            <ul>
                <li>
                    <h4>Apa itu unit testing dan mengapa penting dalam pengembangan perangkat lunak?</h4>
                    <strong>Jawaban :</strong>
                    <p>
                        <span>Unit Test adalah pengujian yang dilakukan dalam satuan unit terkecil dalam suatu program yang dikembangakan.</span>
                        <br />
                        <span>Tujuan dari unit testing adalah untuk memverifikasi bahwa setiap bagian kecil dari perangkat lunak bekerja seperti yang diinginkan.</span>
                    </p>
                </li>
                <li>
                    <h4>Bagaimana Anda akan melakukan unit testing dalam bahasa pemrograman yang Anda kuasai? Berikan contoh sederhana.</h4>
                    <strong>Jawaban :</strong>
                    <p>
                        <span>Langkah untuk mebuat unit test biasanya dapat dilakukan dengan membuat fungsi atau method untuk suatu action atau juga sebaliknya dengan membuat file test terlebih dahulu dengan melakukak mock.</span>
                    </p>
                </li>
            </ul>
         </div>
        </>
    )
}