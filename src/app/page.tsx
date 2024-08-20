import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface/index";
import CurrentLocationButton from "@/components/CurrentLocationButton";

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'My Page Title',
}

export const dynamic = 'force-dynamic'

export default async function Page() { 
    const stores: StoreType[] = await getData();

    return (
        <>
            <Map />
            <Markers storeData={stores} /> 
            <StoreBox />
            <CurrentLocationButton />
        </>
    );
}

async function getData() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.log(error);
    }
}