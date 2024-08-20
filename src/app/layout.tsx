import { NextLayout,NextProviders } from "./Providers";
import {Metadata} from 'next';
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Fastcampus-Nextmap",
    description: "Next.js 13을 이용한 맛집 앱"

}

export default function RootLayout({children}:{children: React.ReactNode}){
    return(
        <html>
            <body>
                <NextProviders>
                    <NextLayout>
                        {children}
                    </NextLayout>
                </NextProviders>
            </body>
        </html>
    );
}