import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

const prisma = new PrismaClient()

export const authOptions= {
    session:{
        strategy: 'jwt' as const,
        maxAge: 60 * 60 * 24,
        updateAge: 60 * 60 * 2,
    },
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID|| "",
            clientSecret: process.env.NAVER_CLIENT_SECRET||""
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID|| "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET||""
        })
    ],
    pages: {
        signIn: "/users/login"
    }
};

export default NextAuth(authOptions);
