import { AiOutlineSearch } from "react-icons/ai";
import {DISTRICT_ARR} from '@/data/store';
import { Dispatch, SetStateAction } from "react";



export default function SeachFilter({setDistrict, setQ}:
    {
        setDistrict :Dispatch<SetStateAction<any>>,
        setQ :Dispatch<SetStateAction<any>>
    }
){

    return (
        <div className="flex flex-col md:flex-row gap-2 my-4">
            <div className="flex items-center justify-content  w-full gap-4">
                <AiOutlineSearch className="w-6 h-6"/>
                <input type="search" placeholder="음식점검색" name="" id="" 
                className="block w-full p-3 text-sm text-gray-800 border border-gray-300 
                rounded-lg bg-gray-50 outline-none focus:border-blue-500" onChange={(e) => setQ(e.target.value)}/>
            </div>
            <select className="block w-full p-3 bg-gray-50 outline-none border focus:border-blue-300 text-gray-800 text-sm md:max-w-[200px]
             rounded-lg " onChange={(e) => {setDistrict(e.target.value)}}>
                <option>지역선택</option>
                {DISTRICT_ARR.map((arr, index) => (
                    <option value={arr} key={index}>{arr}</option>
                ))}
            </select>
        </div>
    )
}