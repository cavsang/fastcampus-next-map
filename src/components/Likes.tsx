'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import React,{ useRef, useEffect, useCallback } from "react";
import useintersectionObserver from "@/hooks/useIntersectionObserver";
import Loading from "./Loading";
import Loader from "./Loader";

export default function Likes(){
    const markersList = ["동남아", "베이커리", "복어취급", "분식", "술집", "양식", "인도_중동", "일식", "중국식", "카페", "탕류", "한식"];
    const router = useRouter();

    const fetchLikes = async ({pageParam = 1}) => {
        const {data} = await axios('/api/likes', {
            params:{
                limit: 10,
                page: pageParam,
            }
        });
        return data;
    }
    
    const {data:likes, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading, isError} 
    = useInfiniteQuery('likes',fetchLikes,{
            getNextPageParam:(lastPage:any) => {
                const page = lastPage?.result?.length > 0 ? lastPage?.page + 1 : undefined;
                return page;
        },
    });

    //console.log(likes?.pages[0]);

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
            <ul role="list" className="divide-y divide-gray-100">{/* 밑에줄긋는 옵션 */}

            <div className="py-3 px-2 flex flex-col gap-2">
                <div className="text-lg font-semibold">찜한 가게</div>
                <div className="text-sm text-gray-600">찜한 가게 목록</div>
            </div>

                {isLoading ? <Loading /> : likes?.pages?.map((page, index) => {
                    return (
                        <React.Fragment key={index}>

                            {page?.result?.map((stores:any, i:number) => {
                                const store = stores?.store;
                                console.log(store);
                                var img: string = store?.category || 'default';
                                if (store?.category) {
                                    img = markersList.indexOf(store?.category) > -1 ? store?.category : 'default';
                                }

                                return (
                                    <li className="flex justify-between gap-x-y py-5 cursor-pointer hover:bg-gray-50" key={index} onClick={() => router.push(`/stores/${store.id}`)}>
                                        <div className="flex gap-x-4 w-full">
                                            <Image src={`/images/markers/${img}.png`} width={40} height={40} alt="아이콘 이미지" />
                                            <div className="w-full">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm font-semibold leading-9 text-gray-900">
                                                        {store?.name}
                                                    </div>
                                                    <div className="text-sm font-semibold leading-9 text-gray-900">
                                                        {store?.address}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                                        {store?.name}
                                                    </div>
                                                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                                        {store?.phone}|{store?.foodCertifyName}|{store?.category}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       {/*  <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <div className="text-sm font-semibold leading-6 text-gray-900">
                                                {store?.address}
                                            </div>
                                            <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                                                {store?.phone || '번호없음'} | {store?.foodCertifyName} | {store?.category}
                                            </div>
                                        </div> */}
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