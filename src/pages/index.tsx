import Map from "../components/Map";
import Markers from "../components/Markers";
import { useState } from "react";
import StoreBox from "../components/StoreBox";
import { StoreType } from "../interface/index";
import axios from 'axios';

export default function Home({stores}:{stores : StoreType[]}) {

  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null); //클릭시 저장.

  return (
  <>
    <Map setMap={setMap}/>
    <Markers storeData={stores} map={map} setCurrentStore={setCurrentStore}/>
    <StoreBox store={currentStore as any} setStore={setCurrentStore} />
  </>
  );
}

export async function getStaticProps(){
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  return {
    props:{
      stores : stores.data,
      revalidate: 60 * 60 //60초 * 60 = 1시간.
    }
  }
}
