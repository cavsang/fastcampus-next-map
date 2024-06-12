import { StoreApiResponse } from "@/interface/index";
import Link from 'next/link';

export default function Pagination({stores}:{stores:StoreApiResponse}){
    return (
        <div className="w-full py-6 flex justify-center gap-4 bg-white my-10 flex-wrap">
                {stores?.totalPage && stores?.totalPage > 10 ? (
                    <>
                        {stores?.page > 1 && (
                            <Link href={ { pathname: '/stores', query: { page: stores?.page -1 } }}>
                                <span className='px-3 py-2 rounded shadow-sm bt-white border'>
                                    {/* . */}이전
                                </span>
                            </Link>
                        )}
                        
                        <Link href={ { pathname: '/stores', query: { page: stores?.page } }}>
                            <span className='px-3 py-2 rounded shadow-sm bt-white text-blue-600 font-bold'>
                                {stores?.page}
                            </span>
                        </Link>
                        {stores?.page < stores?.totalPage && (
                            <Link href={ { pathname: '/stores', query: { page: stores?.page +1 } }}>
                                <span className='px-3 py-2 rounded border shadow-sm bt-white'>
                                    {/* . */}다음
                                </span>
                            </Link>
                        )}
                    </>
                ) : (
                        <>
                            {stores?.page > 1 && (
                                <Link href={ { pathname: '/stores', query: { page: stores?.page -1 } }}>
                                    <span className='px-3 py-2 rounded shadow-sm bt-white border'>
                                        {/* . */}이전
                                    </span>
                                </Link>
                            )}
                            {stores?.pageSize && [...Array(stores?.pageSize)].map((i, index) => {
                                const customPage = (index + (Math.floor((stores?.page as number - 1) / stores?.pageSize) * stores?.pageSize as number)) + 1;
                                return (
                                    <Link href={{ pathname: '/stores', query: { page: customPage } }} key={customPage}>
                                        <span className={`px-3 py-2 rounded shadow-sm bt-white border
                                        ${stores?.page === customPage ? 
                                        'text-blue-600 font-bold' 
                                        : 'text-gray-300'}`}
                                        >
                                            {customPage}
                                        </span>
                                    </Link>
                                );
                            })}
                            {stores?.totalPage && stores?.page < stores?.totalPage && (
                                <Link href={ { pathname: '/stores', query: { page: stores?.page +1 } }}>
                                    <span className='px-3 py-2 rounded border shadow-sm bt-white'>
                                        {/* . */}다음
                                    </span>
                                </Link>
                            )}
                        </>
                    )
                }
            </div>
    )
}