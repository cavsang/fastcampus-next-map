import NextAuth from 'next-auth';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions= {
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string, //undefined 때문에 as string 말고 이렇게 해도되네.
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ]
};

export default NextAuth(authOptions);