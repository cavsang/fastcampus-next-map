/* gloal kakao (이거없어도 나오는데? 이거용도는??)*/  
import Script from '../../node_modules/next/script';
import Markers from './Markers';
import { Dispatch, SetStateAction } from 'react';

//typescript에서 못찾으니까 여기에 컴파일러에만 알려주는 용도. window.하는객체도 원래는 Window인가보다.
declare global{
  interface Window{
    kakao: any;
  }
}

interface MapProps{
  setMap: Dispatch<SetStateAction<any>>;
}

//강남역 정도로..위도,경도.
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Map({setMap}:MapProps){
    const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level : 3
      };
      
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    })
  }
  return (
    <>
      {/* <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."></script> */}
      <Script 
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        strategy="afterInteractive"
        type="text/javascript"
        onReady={loadKakaoMap}  
      ></Script>
      <div id="map" className="w-full h-screen"/>
    </>
  );
}