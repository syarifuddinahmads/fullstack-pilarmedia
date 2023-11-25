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