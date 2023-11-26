import axios, { AxiosRequestConfig } from 'axios';
import { Product, SalesPerson } from './type';

// Axios instance for regional API
const regionalApiInstance = axios.create({
    baseURL: 'https://www.emsifa.com/api-wilayah-indonesia/api/',
});

// Axios instance for Next.js API
const nextApiInstance = axios.create({
    baseURL: 'http://localhost:3000/api/', // Update with your actual Next.js API URL
});

export const Api = {
    getProvincies: () => regionalApiInstance.get(`provinces.json`),
    getRegencies: (id?: string) => regionalApiInstance.get(`regencies/${id}.json`),
    getDistricts: (id?: string) => regionalApiInstance.get(`districts/${id}.json`),
    getVillages: (id?: string) => regionalApiInstance.get(`villages/${id}.json`),

    // Salespersons API
    getSalespersons: (queryParams?: Record<string, any>) => {
        const config: AxiosRequestConfig = {
            params: queryParams,
        };
        return nextApiInstance.get(`/salespersons`, config);
    },
    createSalesperson: (newSalesperson: SalesPerson) => nextApiInstance.post<SalesPerson>(`/salespersons`, newSalesperson),
    deleteSalesperson: (salespersonId: number)=>nextApiInstance.delete(`/salespersons/${salespersonId}`),
    updateSalesperson: (updatedSalesperson: SalesPerson) => nextApiInstance.put<SalesPerson>(`/salespersons`, updatedSalesperson),
    getSalespersonById: (salespersonId: number)=>nextApiInstance.get(`/salespersons/${salespersonId}`),
    // Products API
    getProducts: (queryParams?: Record<string, any>) => {
        const config: AxiosRequestConfig = {
            params: queryParams,
        };
        return nextApiInstance.get(`/products`, config);
    },     createProduct: (newProduct: Product) => nextApiInstance.post<Product>(`/products`, newProduct),
    deleteProduct: (productId: number)=> nextApiInstance.delete(`/products/${productId}`),
    updateProduct: (updatedProduct: Product) => nextApiInstance.put<Product>(`/products`, updatedProduct),
    getProductById: (productId: number)=>nextApiInstance.get(`/products/${productId}`),

    // Sales
    getSales:(queryParams?: Record<string, any>) => {
        const config: AxiosRequestConfig = {
            params: queryParams,
        };
        return nextApiInstance.get(`/sales`, config);
    }
};

export default Api;
