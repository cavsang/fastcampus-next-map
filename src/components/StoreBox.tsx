import { Dispatch, SetStateAction } from "react";
import Image from 'next/image';
import {AiOutlineClose, AiOutlineInfoCircle, AiOutlineCheck, AiOutlinePhone} from 'react-icons/ai';
import {HiOutlineMapPin} from 'react-icons/hi2';

interface StoreBoxProps{
    store: any,
    setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({store, setStore}:StoreBoxProps){
    const markersList = ["동남아","베이커리","복어취급","분식","술집","양식","인도_중동","일식","중국식","카페","탕류","한식"];
    var img:string = store?.bizcnd_code_nm || 'default';
    img = markersList.indexOf(store?.bizcnd_code_nm) > -1 ?  store?.bizcnd_code_nm : 'default';


    return <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20
    rounded-ls shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
        {store && (
            <>
                <div className="p-8 ">
                    <div className="flex justify-between items-start ">
                        <div className="flex gap-4 items-center">
                            <Image src={`/images/markers/${img}.png`} width={40} alt='' height={40} />
                            <div>
                                <div className="font-semibold ">{store?.upso_nm}</div>
                                <div className="text-sm ">{store?.cob_code_nm}</div>
                            </div>
                        </div>
                        <button onClick={() => {setStore(null);}}>
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className="mt-4 flex gap-2 items-center">
                        <HiOutlineMapPin /> {store?.rdn_code_nm}
                    </div>
                    <div className="mt-2 flex gap-2 items-center">
                        <AiOutlinePhone /> {store?.tel_no}
                    </div>
                    <div className="mt-2 flex gap-2 items-center">
                        <AiOutlineInfoCircle /> {store?.crtfc_gbn_nm}
                    </div>
                    <div className="mt-2 flex gap-2 items-center">
                        <AiOutlineCheck /> {store?.bizcnd_code_nm}
                    </div>
                </div>
                <button onClick={() => {window.alert('상세보기 작업중');}} 
                className="bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 text-center w-full py-3 text-white 
                            font-semibole rounded-b-lg">
                                    상세보기
                </button>
            </>
        )}
    </div>
}