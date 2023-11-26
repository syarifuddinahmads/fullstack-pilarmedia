import Header from "@/components/header.components";
import Link from "next/link";

export default function Sales(){
    return (
        <>
        <Header/>
        <div>
            Sales
            <ul>
                <li>
                    <Link href={'sales/product'}><span>Product</span></Link>
                </li>
                <li>
                    <Link href={'sales/person'}><span>Sales Person</span></Link>
                </li>
            </ul>
        </div>
        </>
    )
}