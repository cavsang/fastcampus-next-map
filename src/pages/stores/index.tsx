import { StoreType } from "../../interface/index";
import Image from '../../../node_modules/next/image';

export default function StoreListPage({stores}:{stores: StoreType[]})
{
    const markersList = ["동남아","베이커리","복어취급","분식","술집","양식","인도_중동","일식","중국식","카페","탕류","한식"];
    
    
    return ( 
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            <ul role="list" className="divide-y divide-gray-100">{/* 밑에줄긋는 옵션 */}
                {stores?.map((store, index) => {
                    var img:string = store?.bizcnd_code_nm || 'default';
                    img = markersList.indexOf(store?.bizcnd_code_nm) > -1 ?  store?.bizcnd_code_nm : 'default';

                    return (
                        <li className="flex justify-between gap-x-y py-5" key={index}>
                            <div className="flex gap-x-4">
                                <Image src={`/images/markers/${img}.png`} width={40} height={40} alt="아이콘 이미지"/>
                                <div>
                                    <div className="text-sm font-semibold leading-9 text-grat-900">
                                        {store?.upso_nm}
                                    </div>
                                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                        {store?.upso_nm}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <div className="text-sm font-semibold leading-6 text-gray-900">
                                    {store?.rdn_code_nm}
                                </div>
                                <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                    {store?.tel_no || '번호없음'} | {store?.crtfc_gbn_nm} | {store?.bizcnd_code_nm}
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