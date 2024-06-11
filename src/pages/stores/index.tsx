import { StoreType } from "@/interface/index";
import Image from 'next/image';
import axios from 'axios';
import {useQuery} from 'react-query';
import Loading from "@/components/Loading";

export default function StoreListPage()
{
    const markersList = ["동남아","베이커리","복어취급","분식","술집","양식","인도_중동","일식","중국식","카페","탕류","한식"];
    
    const { isLoading, isError, data:stores } = useQuery('stores', async () => {
        const {data} = await axios('/api/stores');
        return data as StoreType[];
    });
    if (isError) {
        return <span>Error: {error.message}</span>
    }
    
    return ( 
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            <ul role="list" className="divide-y divide-gray-100">{/* 밑에줄긋는 옵션 */}
            
                {isLoading ? <Loading />: stores?.map((store, index) => {
                    var img:string = store?.category || 'default';
                    if(store?.category){
                        img = markersList.indexOf(store?.category) > -1 ?  store?.category : 'default';
                    }

                    return (
                        <li className="flex justify-between gap-x-y py-5" key={index}>
                            <div className="flex gap-x-4">
                                <Image src={`/images/markers/${img}.png`} width={40} height={40} alt="아이콘 이미지" priority={false} />
                                <div>
                                    <div className="text-sm font-semibold leading-9 text-grat-900">
                                        {store?.name}
                                    </div>
                                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                        {store?.name}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <div className="text-sm font-semibold leading-6 text-gray-900">
                                    {store?.address}
                                </div>
                                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                    {store?.phone || '번호없음'} | {store?.foodCertifyName} | {store?.category}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
