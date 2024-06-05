import Map from "../components/Map";
import Markers from "../components/Markers";
import * as stores from '@/data/store_data.json';
import { useState } from "react";
import StoreBox from "../components/StoreBox";

export default function Home() {

  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null); //클릭시 저장.

  return (
  <>
    <Map setMap={setMap}/>
    <Markers storeData={stores?.DATA} map={map} setCurrentStore={setCurrentStore}/>
    <StoreBox store={currentStore} setStore={setCurrentStore} />
  </>
  );
}
