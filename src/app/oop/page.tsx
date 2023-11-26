'use client'
import Header from "@/components/header.components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OOP() {

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
            <Header />
            <div>
                <h1>Object Oriented Programming</h1>
                <ul>
                    <li>
                        <h4>Apa itu OOP (Pemrograman Berorientasi Objek) dan mengapa itu penting dalam pengembangan perangkat lunak?</h4>
                        <strong>Jawaban :</strong>
                        <p>OOP adalah sebuah metode pengembangan aplikasi yang dirancang dengan
                            menggunakan blueprint (object) yang di buat dalam bentuk kecil-kecil dan bersifat
                            specific dimana tujuannya supaya mempermudah developer dalam pengembangan.</p>
                        <p>Mengapa konsep oop penting, oop penting karena dengan menggunakan konsep oop
                            Pengembangan aplikasi akan sangat bisa dilakukan secara terstruktur dan lebih baik,
                            Selain itu dengan menggunakan oop kita dapat menerapkan parallel development, reusable,
                            coding jauh lebih mudah dan readable</p>
                    </li>
                    <li>
                        <h4>Jelaskan konsep utama dalam OOP seperti encapsulation, inheritance, dan polymorphism.</h4>
                        <strong>Jawaban :</strong>
                        <div>
                            <p><strong>Encapsulation</strong>, pengikatan data tau metode yang berbeda satu sama lain yang disatukan atau dikapsulkan menjadi satu unit data. Lebih jelasnya ialah masing”
        object atau class di satukan dalam satu wadah (class) dimana object/class tersebut tetap berdiri sendiri dan tidak terpengaruh oleh class yang lain.</p>
                            <p><strong>Inheritance</strong>,  atau turunan adalah sebuah class yang memiliki fungsi dengen class induk atau mempunyai kemiripan fungsi dengan class induk</p>
                            <p><strong>Polymorphism</strong>, Bisa diartikan sebagai blueprint (interface) yang mana memiliki banyak bentik, dimana satu (interface) dapat digunakan dibanyak entity yang berbeda.
</p>
                        </div>
                    </li>
                    <li>
                        <h4>Berikan contoh penggunaan OOP encapsulation, inheritance, polimorphism juga menerapkan SOLID principles dalam bahasa pemrograman yang Anda kuasai.</h4>
                        <strong>Jawaban :</strong>
                        <div>
                            <p>Link Repository : <a href="https://github.com/syarifuddinahmads/test-oop" target="_blank">https://github.com/syarifuddinahmads/test-oop</a> </p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}