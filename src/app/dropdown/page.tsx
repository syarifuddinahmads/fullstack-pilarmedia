'use client'
import { DependentDropdown } from "@/components/dropdowns.components";
import Header from "@/components/header.components";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function UIDropdown() {
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
            <h1>UI Dropdown (Dependent Dropdown)</h1>
                <ul>
                    <li>
                        <h4>Apa itu dependent dropdown (pilihan terkait) dan kapan Anda akan menggunakannya dalam pengembangan web?</h4>
                        <strong>Jawaban :</strong>
                        <p>Dependent Dropdown adalah sebuah component dimana component satu dengan yang lain saling berkaitan, dependent dropdown biasanya digunakan untuk pilihan regional dimana terdapat data yang saling berkaitan seperti desa dengan kecamatan dsb. selain itu digunakan juga untuk category yang memiliki sub category.</p>
                    </li>
                    <li>
                        <h4>Bagaimana Anda akan mengimplementasikan dependent dropdown dalam JavaScript atau kerangka kerja tertentu yang anda kuasai ?</h4>
                        <strong>Jawaban :</strong>
                        <p>Dalam mengimplimentasikan Dependent Dropdown ada beberapa langkah :</p>
                        <ul>
                            <li>Mengambil data awal untuk mengisi pilihan atau dropdown</li>
                            <li>Menanggapi perubahan data pada pilihan awal, dimana value dari data pilihan awal digunakan untuk mengambil data (filter)</li>
                        </ul>
                    </li>
                    <li>
                        <h4>Berikan contoh penggunaan Dependent Dropdown dalam bahasa pemrograman yang anda kuasai. (Negara, Propinsi, Kabupaten/Kota, Kecamatan, Kelurahan) refrensi OpenApi: https://github.com/emsifa/api-wilayah-indonesia.git</h4>
                        <strong>Jawaban :</strong>
                            <div>
                                <h5>Demo Sederhana Dependent Dropdown :</h5>
                                <DependentDropdown />
                            </div>
                    </li>
                </ul>
            </div>
        </>
    )
}