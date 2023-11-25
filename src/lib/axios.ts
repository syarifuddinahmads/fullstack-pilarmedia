import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://www.emsifa.com/api-wilayah-indonesia/api/'
})

export const Api = {
    getProvincies:()=>axiosInstance.get(`provinces.json`),
    getRegencies:(id?:string) => axiosInstance.get(`regencies/${id}.json`),
    getDistricts:(id?:string) => axiosInstance.get(`districts/${id}.json`),
    getVillages:(id?:string) => axiosInstance.get(`villages/${id}.json`)
}