export type DistrictsProps = {
    id: string
    regency_id:string
    name: string
}

export type ProvinceProps = {
    id: string
    name: string
}

export type RegenciesProps = {
    id: string
    province_id:string
    name: string
}

export type VillagesProps = {
    id: string
    district_id:string
    name: string
}

export type Sales = {
    sales_id:number
    sales_date:string
    sales_amount:string
    product_id:number
    sales_person_id:number
    product:Product
}

export type SalesPerson ={
    sales_person_id:number
    sales_person_name:string
    sales_person_phone:string
    sales_person_address:string
    sales?:Sales[]
}

export type Product = {
    product_id:number
    product_name:string
    product_description:string
    product_price:number
    sales?:Sales[]
}

export type User = {
    id:number
    name:string
    email:string
    password:string
}