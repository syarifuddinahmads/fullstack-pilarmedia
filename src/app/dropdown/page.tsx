import { DependentDropdown } from "@/components/dropdowns.components";
import Header from "@/components/header.components";

export default function UIDropdown(){
    return (
        <>
        <Header/>
        <div>
            UI Dropdown
            <DependentDropdown/>
        </div>
        </>
    )
}