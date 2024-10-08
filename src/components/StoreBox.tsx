'use client';

import Image from 'next/image';
import {AiOutlineClose, AiOutlineInfoCircle, AiOutlineCheck, AiOutlinePhone} from 'react-icons/ai';
import {HiOutlineMapPin} from 'react-icons/hi2';
import { useRouter } from "next/navigation";
import {  useRecoilState } from "recoil";
import { currentStoreState } from "@/atom";
import Like from './Like';


export default function StoreBox(){
    const markersList = ["동남아","베이커리","복어취급","분식","술집","양식","인도_중동","일식","중국식","카페","탕류","한식"];
    const router= useRouter();

    /*--------------------  이부분.. useRecoilState*/
    const [store, setStore] = useRecoilState(currentStoreState);
    /*--------------------  */

    var img:string = store?.category || 'default';
    if(store?.category){
        img = markersList.indexOf(store?.category) > -1 ?  store?.category : 'default';
    }

    return <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20
    rounded-ls shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
        {store && (
            <>
                <div className="p-8 ">
                    <div className="flex justify-between items-start ">
                        <div className="flex gap-4 items-center">
                            <Image src={`/images/markers/${img}.png`} width={40} alt='' height={40} priority={false} />
                            <div>
                                <div className="font-semibold ">{store?.name}</div>
                                <div className="text-sm ">{store?.storeType}</div>
                            </div>
                        </div>
                        <button onClick={() => {setStore(null);}}>
                            <AiOutlineClose />
                        </button>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div className="mt-4 flex gap-2 items-center col-span-3">
                            <HiOutlineMapPin /> 
                            {store?.address}
                        </div>
                        <Like storeId={store?.id}/>
                    </div>
                    <div className="mt-2 flex gap-2 items-center">
                        <AiOutlinePhone /> {store?.phone}
                    </div>
                    <div className="mt-2 flex gap-2 items-center">
                        <AiOutlineInfoCircle /> {store?.foodCertifyName}
                    </div>
                    <div className="mt-2 flex gap-2 items-center">
                        <AiOutlineCheck /> {store?.category}
                    </div>
                </div>
                <button onClick={() => {router.push(`/stores/${store.id}`)}} 
                className="bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 text-center w-full py-3 text-white 
                            font-semibole rounded-b-lg">
                                    상세보기
                </button>
            </>
        )}
    </div>
}