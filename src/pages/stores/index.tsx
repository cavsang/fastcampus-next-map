import { StoreType } from "../../interface/index";
import Image from '../../../node_modules/next/image';

export default function StoreListPage({stores}:{stores: StoreType[]})
{
    const markersList = ["동남아","베이커리","복어취급","분식","술집","양식","인도_중동","일식","중국식","카페","탕류","한식"];
    
    
    return ( 
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            <ul role="list" className="divide-y divide-gray-100">{/* 밑에줄긋는 옵션 */}
                {stores?.map((store, index) => {
                    var img:string = store?.category || 'default';
                    if(store?.category){
                        img = markersList.indexOf(store?.category) > -1 ?  store?.category : 'default';
                    }

                    return (
                        <li className="flex justify-between gap-x-y py-5" key={index}>
                            <div className="flex gap-x-4">
                                <Image src={`/images/markers/${img}.png`} width={40} height={40} alt="아이콘 이미지"/>
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

export async function getServerSideProps(){
    const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`).then((res) => res.json());
    return {
        props:{
        stores
        }
    }
}