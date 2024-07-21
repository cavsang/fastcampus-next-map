import Map from "../components/Map";
import Markers from "../components/Markers";
import StoreBox from "../components/StoreBox";
import { StoreType } from "../interface/index";
import axios from 'axios';
import CurrentLocationButton from "@/components/CurrentLocationButton";

export default function Home({stores}:{stores : StoreType[]}) {

  return (
  <>
    {/* 이부분 안에 props들이 다빠졌다. 전역으로 바꿧기때문에.. */}
    <Map/>
    <Markers storeData={stores} />
    <StoreBox />
    <CurrentLocationButton />
    {/* 이부분 안에 props들이 다빠졌다. 전역으로 바꿧기때문에.. */}
  </>
  );
}

export async function getServerSideProps(){
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  return {
    props:{
      stores : stores.data,
    }
  }
}
