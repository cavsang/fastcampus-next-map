import { useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { StoreType } from "../interface/index";

interface MarkersProps{
    map: any;
    storeData: StoreType[],
    setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({map, storeData, setCurrentStore}:MarkersProps){

    const loadKakaoMarkers = useCallback(() => {
        if(map){
            storeData?.map((data:StoreType) => {
                const markersList = ["동남아","베이커리","복어취급","분식","술집","양식","인도_중동","일식","중국식","카페","탕류","한식"];

                var markerPosition = new window.kakao.maps.LatLng(data?.lat ,data?.lng);

                var img = data?.category || 'default';
                if(data?.category){
                    img = markersList.indexOf(data?.category) > -1 ?  data?.category : 'default';
                }

                // 마커이미지의 주소입니다
                var imageSrc = `/images/markers/${img}.png`,
                // 마커이미지의 크기입니다
                imageSize = new window.kakao.maps.Size(30, 30), 
                // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                imageOption = {offset: new window.kakao.maps.Point(27, 69)};
                
                // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


                var marker = new window.kakao.maps.Marker({
                position: markerPosition,
                    image : markerImage
                });

                marker.setMap(map);

                //커서가 지도위에 갔을때 표시할 인포윈도우
                var content = `<div class="infowindow">${data?.name}</div>`;
                var customOverlay = new window.kakao.maps.CustomOverlay({
                    position: markerPosition,
                    content: content,
                    xAnchor: 0.6,
                    yAnchor: 0.99
                });

                // 마커에 마우스오버 이벤트를 등록합니다
                window.kakao.maps.event.addListener(marker, 'mouseover', function() {
                    customOverlay.setMap(map);
                });

                // 마커에 마우스아웃 이벤트를 등록합니다
                window.kakao.maps.event.addListener(marker, 'mouseout', function() {
                    customOverlay.setMap(null);  
                });

                //클릭한 가게 저장.
                window.kakao.maps.event.addListener(marker, 'click', function(){
                    setCurrentStore(data);
                })
            });
        }
    },[map, setCurrentStore, storeData]);

    useEffect(() => {
        loadKakaoMarkers();
    },[loadKakaoMarkers, map]);

    return <></>;
}