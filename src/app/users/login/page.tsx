'use client';

import { AiOutlineGoogle } from "react-icons/ai";
import {SiNaver} from 'react-icons/si';
import {RiKakaoTalkFill} from 'react-icons/ri';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login(){

    const {data, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if(status === 'authenticated'){
            router.replace("/");
        }
    },[router, status])

    return (
        <div className="flex flex-col justify-center px-6 lg:px8 h-[60vh]">
            <div className="mx-auto w-full max-w-sm">
                <div className="text-blue-800 text-center text-2xl font-semibold italic">Nextmap</div>
                <div className="text-center mt-6 text-2xl font-bold text-gray-600">
                    SNS계정으로 로그인 해주세요.
                </div>
                <p className="text-center mt-2 text-sm text-gray-600">계정이 없다면 자동으로 회원가입이 진행됩니다.</p>
            </div>
            <div className="mt-10 mx-auto w-full max-w-sm">
                <div className="flex flex-col gap-3">
                    <button className="text-white flex gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg
                    w-full px-5 py-4 text-center items-center justify-center" onClick={() => signIn('google',{callbackUrl:'/'})}>
                        <AiOutlineGoogle className="w-6 h-6"/>
                        Sign in Google
                    </button>
                    <button className="text-white flex gap-2 bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg
                    w-full px-5 py-4 text-center items-center justify-center" onClick={() => signIn('naver',{callbackUrl:'/'})}>
                        <SiNaver/>
                        Sign in Naver
                    </button>
                    <button className="text-white flex gap-2 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-lg
                    w-full px-5 py-4 text-center items-center justify-center text-black" onClick={() => alert('구현안됨')}>
                        <RiKakaoTalkFill className="w-6 h-6"/>
                        Sign in Kakao
                    </button>
                </div>
            </div>
        </div>
    );
}