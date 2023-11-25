"use client";
import { useEffect, useState } from "react";
import { DistrictsProps, ProvinceProps, RegenciesProps, VillagesProps } from "../lib/type";
import { Api } from "../lib/axios";

export const DependentDropdown = () => {
    const [provincies, setProvincies] = useState<ProvinceProps[]>([]);
    const [regencies, setRegencies] = useState<RegenciesProps[]>([]);
    const [districts, setDistricts] = useState<DistrictsProps[]>([]);
    const [villages, setVillages] = useState<VillagesProps[]>([]);

    const [idProvince, setIdProvince] = useState<string>("");
    const [idRegency, setIdRegency] = useState<string>("");
    const [idDistrict, setIdDistrict] = useState<string>("");

    useEffect(() => {
        Api.getProvincies().then(({ data }) => {
            setProvincies(data);
            setRegencies([]);
            setDistricts([]);
            setVillages([]);
        });
    }, []);

    useEffect(() => {
        if (idProvince) {
            Api.getRegencies(idProvince).then(({ data }) => {
                setRegencies(data);
                setDistricts([]);
                setVillages([]);
            });
        }
    }, [idProvince]);

    useEffect(() => {
        if (idRegency) {
            Api.getDistricts(idRegency).then(({ data }) => {
                setDistricts(data);
                setVillages([]);
            });
        }
    }, [idRegency]);

    useEffect(() => {
        if (idDistrict) {
            Api.getVillages(idDistrict).then(({ data }) => {
                setVillages(data);
            });
        }
    }, [idDistrict]);

    const selectProvince = (e: any) => {
        const value = e.target.value;
        if (value) {
            setIdProvince(value);
        } else {
            setRegencies([]);
            setDistricts([]);
            setVillages([]);
        }
    };

    const selectRegency = (e: any) => {
        const value = e.target.value;
        if (value) {
            setIdRegency(value);
        } else {
            setDistricts([]);
            setVillages([]);
        }
    };

    const selectDistrict = (e: any) => {
        const value = e.target.value;
        if (value) {
            setIdDistrict(value);
        } else {
            setVillages([]);
        }
    };

    return (
        <>
            <select onChange={selectProvince} value={idProvince}>
                <option value="">--- Select Provincies ---</option>
                {provincies.map((data) => (
                    <option value={data.id} key={data.id}>
                        {data.name}
                    </option>
                ))}
            </select>

            <select onChange={selectRegency} value={idRegency}>
                <option value="">--- Select Regency ---</option>
                {regencies.map((data) => (
                    <option value={data.id} key={data.id}>
                        {data.name}
                    </option>
                ))}
            </select>

            <select onChange={selectDistrict} value={idDistrict}>
                <option value="">--- Select District ---</option>
                {districts.map((data) => (
                    <option value={data.id} key={data.id}>
                        {data.name}
                    </option>
                ))}
            </select>

            <select>
                <option value="">--- Select Village ---</option>
                {villages.map((data) => (
                    <option value={data.id} key={data.id}>
                        {data.name}
                    </option>
                ))}
            </select>
        </>
    );
};