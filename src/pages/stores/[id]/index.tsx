import { useRouter } from 'next/router';
import axios from 'axios';
import { StoreType } from '@/interface';
import { useQuery } from 'react-query';
import Loader from '@/components/Loader';
import Map from '@/components/Map';
import { useState } from 'react';
import Markers from '@/components/Markers';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


export default function StoreDetailPage() {

    const router = useRouter();
    const { id } = router.query;
    const [map, setMap] = useState(null);

    const fetchStore = async () => {
        const { data } = await axios(`/api/stores?id=${id}`);
        return data as StoreType;
    }

    const {status} = useSession();

    
    const { data: store,isSuccess, isFetching, isError } = useQuery(`store-${id}`, fetchStore, {
        enabled: !!id,//비동기로 날리는데 id가 있는경우에만 날려라. options의 enabled의미.
        refetchOnWindowFocus: false//기본값은 true인데.다른창가거나 다른프로그램갔다가 가면 항상 새로고침한다. 그걸꺼준다.
    });

    if (isFetching) {
        return <Loader className="mt-[20%]" />
    }

    const storeData:StoreType[] = [store as StoreType];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center py-4 md:py-0">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">{store?.name}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{store?.address}</p>
                </div>
                {status === 'authenticated' && (
                    <div className="flex items-center gap-4">
                        <Link className="underline hover:text-gray-300 text-sm" href={`/stores/${store?.id}/edit`}>수정</Link>
                        <Link className="underline hover:text-gray-300 text-sm" href="">삭제</Link>
                    </div>
                )}
                
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">카테고리</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.category}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">주소</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.address}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">위도</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.lat}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">경도</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.lng}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">연락처</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{store?.phone}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">식품인증구분</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {store?.foodCertifyName}
                        </dd>
                    </div>
                </dl>
                {isSuccess && (
                    <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
                        <Map lat={store?.lat} lng={store?.lng} zoom="1"/>
                        <Markers storeData={storeData}/>
                    </div>
                )}
            </div>
        </div>
    )

}