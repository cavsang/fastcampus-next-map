'use client';

/* gloal kakao (이거없어도 나오는데? 이거용도는??)*/  
import Script from '../../node_modules/next/script';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { mapState, locationState } from '@/atom';

//typescript에서 못찾으니까 여기에 컴파일러에만 알려주는 용도. window.하는객체도 원래는 Window인가보다.
declare global{
  interface Window{
    kakao: any;
  }
}
interface MapProps{
  lat?:string;
  lng?:string;
  zoom?:string;
}

export default function Map({lat,lng, zoom}:MapProps){

  /* 여기도 바뀜 */
  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);
  /* 여기도 바뀜 */

    const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng
        (
          lat ?? location?.lat, //??는 있으면 첫번째값 사용. 없으면 뒤에거사용.
          lng ?? location?.lng
        ),
        level : zoom ?? location?.zoom  
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