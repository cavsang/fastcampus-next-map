import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function MyPage(){

    const {data} = useSession();

    return (
        <div className="px-2 py-2 flex flex-col mx-auto">
            <div className="py-5 px-2 flex flex-col gap-2 border-b">
                <div className="text-lg font-bold">마이페이지</div>
                <div className="text-sm text-gray-500 font-bold">사용자 기본정보</div>
            </div>
            <div className="flex px-2 py-6 border-b">
                <div className="grow text-sm font-bold">이름</div>
    <div className="grow text-sm">{data?.user?.name}</div>
            </div>
            <div className="flex px-2 py-6 border-b">
                <div className="grow text-sm font-bold">이메일</div>
                <div className="grow text-sm">{data?.user?.email}</div>
            </div>
            <div className="flex px-2 py-6 border-b">
                <div className="grow text-sm font-bold">이미지</div>
                <div className="grow text-sm">
                    <div className="w-[50px] h-[50px] text-center bg-purple-900 text-white
                     rounded-[90%] py-3">
                        {data?.user?.name || 'who'}
                    </div>
                </div>
            </div>
            <div className="flex px-2 py-6 border-b">
                <div className="grow text-sm font-bold"></div>
                <div className="grow text-sm"><Link href="" className="underline" onClick={() => signOut()}>로그아웃</Link></div>
            </div>
        </div>
    )
}