'use client'
/* eslint-disable react/no-unescaped-entities */
import Header from "@/components/header.components";
import Api from "@/lib/axios";
import { Sales } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sales() {

    const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 

    if (!session) {
      router.replace('/login');
    }
  }, [session, status, router]);

    const [salesData, setSalesData] = useState<Sales[]>([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        start_date: '',
        end_date: '',
        page: 1,
        limit: 10,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.getSales({ params: filters });
                setSalesData(response.data.data.sales);
                setPaginationInfo(response.data.data.paginationInfo);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filters]);

    const handleFilterChange = (event: any) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handlePageChange = (newPage: any) => {
        setFilters((prevFilters) => ({ ...prevFilters, page: newPage }));
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <Header />
            <div>
                <h1>Optimasi Query & Dashboard Grafik</h1>
                <ul>
                    <li>
                        <h4>Bagaimana Anda akan mengoptimalkan query SQL untuk mengambil data dari tabel yang memiliki jutaan baris?</h4>
                        <strong>Jawaban :</strong>
                        <p>Untuk mengoptimalkan query bisa dilakukan dengan beberapa cara, seperti indexing, menerapkan paging, melakukan limit, melakukan selective field, query caching, denormalisasi database sampai sharding database</p>
                    </li>
                    <li>
                        <h4>Jelaskan apa yang dimaksud dengan indeks dalam basis data dan bagaimana penggunaannya dapat meningkatkan performa query.</h4>
                        <strong>Jawaban :</strong>
                        <p>indeks adalah struktur data tambahan yang dibuat pada satu atau beberapa kolom tabel untuk mempercepat proses pencarian dan pengurutan data. <br /> Indeks memungkinkan basis data untuk dengan cepat menemukan dan mengakses baris data tertentu tanpa harus memeriksa setiap baris satu per satu. <br /> Penggunaan indeks dapat signifikan meningkatkan performa kueri dengan mengurangi jumlah data yang perlu diakses dan diproses.</p>
                    </li>
                    <li>
                        <h4>Berikan Contoh Bagaimana Anda akan membuat dashboard grafik interaktif dari data yang diambil dari basis data (misal: grafik penjualan perbulan/pertahun/persales dengan jumlah data 2juta record) ?</h4>
                        <p>
                            <pre>
                                Tabel "Sales": <br />
                                SalesID (Primary Key): ID unik untuk setiap transaksi penjualan. <br />
                                SalesDate: Tanggal transaksi penjualan. <br />
                                ProductID: ID produk yang dijual. <br />
                                SalesAmount: Jumlah penjualan (misalnya, dalam mata uang tertentu). <br />
                                SalesPersonID: ID dari salesperson yang melakukan penjualan.
                            </pre>
                            <pre>
                                Tabel "Products": <br />
                                ProductID (Primary Key): ID unik untuk setiap produk. <br />
                                ProductName: Nama produk. <br />
                                (Kolom-kolom lain sesuai kebutuhan, misalnya, harga produk, deskripsi, dll.)
                            </pre>
                            <pre>
                                Tabel "Salespersons": <br />
                                SalesPersonID (Primary Key): ID unik untuk setiap salesperson. <br />
                                SalesPersonName: Nama salesperson. <br />
                                (Kolom-kolom lain sesuai kebutuhan, misalnya, alamat, nomor kontak, dll.)
                            </pre>
                        </p>
                        <strong>Jawaban :</strong>

                        <div>
                            <h4>Menu : </h4>
                            <ul>
                                <li>
                                    <Link href={'sales/product'}><span>Product</span></Link>
                                </li>
                                <li>
                                    <Link href={'sales/person'}><span>Sales Person</span></Link>
                                </li>
                            </ul>

                            <h3>Sales List</h3>
                            <div>
                                <div>
                                    <label>Start Date:</label>
                                    <input type="date" name="start_date" value={filters.start_date} onChange={handleFilterChange} />
                                </div>
                                <div>
                                    <label>End Date:</label>
                                    <input type="date" name="end_date" value={filters.end_date} onChange={handleFilterChange} />
                                </div>

                                <ul>
                                    {Array.of(salesData) && salesData.map((sale) => (
                                        <li key={sale.sales_id}>
                                            {'-'} - {sale.sales_amount}
                                        </li>
                                    ))}
                                </ul>

                                {paginationInfo.totalPages > 1 && (
                                    <div>
                                        <p>
                                            Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
                                        </p>
                                        <button disabled={filters.page === 1} onClick={() => handlePageChange(filters.page - 1)}>
                                            Previous
                                        </button>
                                        <button
                                            disabled={filters.page === paginationInfo.totalPages}
                                            onClick={() => handlePageChange(filters.page + 1)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </li>
                </ul>


            </div>
        </>
    )
}