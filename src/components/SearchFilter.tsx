import { AiOutlineSearch } from "react-icons/ai";

export default function SeachFilter(){
    return (
        <div className="md:flex gap-2 my-4">
            <div className="flex items-center justify-content  w-full">
                <AiOutlineSearch />
                <input type="search" placeholder="음식점검색" name="" id=""/>
            </div>
        </div>
    )
}