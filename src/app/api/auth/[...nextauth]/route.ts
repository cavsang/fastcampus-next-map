import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import prisma from '@/db';


export const authOptions:NextAuthOptions= {
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
    },
    callbacks:{
        jwt: async ({user, token}) => {
            if(user){
                token.sub = user.id
            }
            return token; 
        },
        session: ({session, token}) => ({
            ...session,
            user : {
                ...session.user,
                id: token.sub
            }
        }),
    }
};

const handler =  NextAuth(authOptions);
export {handler as GET, handler as POST};
