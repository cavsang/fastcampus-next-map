import { StoreType} from "@/interface/index";
import Image from 'next/image';
import axios from 'axios';
import { useInfiniteQuery} from 'react-query';
import Loading from "@/components/Loading";
import React, { useRef, useEffect, useCallback } from "react";
import useintersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";
import SearchFilter from "@/components/SearchFilter";
import { useRecoilValue } from "recoil";
import { searchState } from "@/atom";
import { useRouter } from "next/router";


export default function StoreListPage() {
    const markersList = ["동남아", "베이커리", "복어취급", "분식", "술집", "양식", "인도_중동", "일식", "중국식", "카페", "탕류", "한식"];

    const router = useRouter();

    const searchRecoilState = useRecoilValue(searchState);

    /** 이런방법이 있네..?  */
    const searchParams = {
        q: searchRecoilState?.q,
        district: searchRecoilState?.district
    };

    const fetchStores = async ({pageParam = 1}) => {
        const {data} = await axios('/api/stores', {
            params:{
                limit: 10,
                page: pageParam,
                ...searchParams,  //와 이런방법이있네??
            }
        });
        return data;
    }


    
    const {data:stores, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, isError} 
    = useInfiniteQuery(['stores', searchParams],fetchStores,{
            getNextPageParam:(lastPage:any) => {
                const page = lastPage?.data?.length > 0 ? lastPage?.page + 1 : undefined;
                return page;
        },
    });

    const ref = useRef<HTMLDivElement | null>(null);//ref로 그엘레먼트를 가져옴.
    const pageRef = useintersectionObserver(ref, {});
    
    //page의 마지막인지?
    const isPageEnd = !!pageRef?.isIntersecting;

    const fetchNext = useCallback(async () => {
        const res = await fetchNextPage();
        if(res.isError){
            console.log(res.error);
        }
    },[fetchNextPage]);

    useEffect( () => {
        let timerId: NodeJS.Timeout | undefined;

        if(isPageEnd && hasNextPage){
            timerId = setTimeout(() => {
                fetchNext()
            },500);
        }

        return () => clearTimeout(timerId);
    },[fetchNext, isPageEnd, hasNextPage]);


  


    return (
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            <SearchFilter />
            <ul role="list" className="divide-y divide-gray-100">{/* 밑에줄긋는 옵션 */}

                {isLoading ? <Loading /> : stores?.pages?.map((page, index) => {
                    return (
                        <React.Fragment key={index}>

                            {page?.data?.map((store:StoreType, i:number) => {
                                var img: string = store?.category || 'default';
                                if (store?.category) {
                                    img = markersList.indexOf(store?.category) > -1 ? store?.category : 'default';
                                }

                                return (
                                    <li className="flex justify-between gap-x-y py-5 cursor-pointer hover:bg-gray-50" key={index} onClick={() => router.push(`/stores/${store.id}`)}>
                                        <div className="flex gap-x-4">
                                            <Image src={`/images/markers/${img}.png`} width={40} height={40} alt="아이콘 이미지" />
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
                                );
                            })}

                        </React.Fragment>
                    )
                })}
            </ul>
           
            {isFetching && hasNextPage && (
                <Loader />
            )}
            <div className="w-full touch-none h-10 mb-10" ref={ref}></div>
        </div>
    )
}
