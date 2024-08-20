'use client';

import { MdOutlineMyLocation } from "react-icons/md";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { mapState } from "@/atom";
import { toast } from "react-toastify";

export default function CurrentLocationButton(){

    const [loading, setLoading] = useState<boolean>(false);
    const map = useRecoilValue(mapState);

    const handleCurrentPosition = () => {
        setLoading(true);

        const options = {
            enableHighAccuracy: false, //true하면 정확도가 높아지지만.. 느려짐.
            timeout: 5000,
            maximumAge: Infinity //Cached와 관련됨. Infinity=캐싱한다. default=0인데 캐싱하지않고 매번 불러온다.
        };

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentPosition = new window.kakao.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    )

                    //console.log(currentPosition);
                    if(currentPosition){
                        setLoading(false);
                        map.panTo(currentPosition);
                        toast.success('현재 위치로 이동하였습니다.');
                    }

                    return currentPosition;
                } ,//성공시
                () => {
                    setLoading(false);
                    toast.error('현재위치를 가져올수 없습니다.');
                } ,//실패시
                options
            );


        }
    }
    return (
        <>
        {loading && (
            <div className="fixed w-full top-0 inset-x-0 h-screen flex flex-col justify-center bg-black/60 z-50">
                <div className="animate-spin w-10 h-10 text-bue-400 border-[4px] rounded-full m-auto border-t-transparent border-current"></div>
            </div>
        )}
        <button type="button" onClick={handleCurrentPosition} 
            className="fixed z-10 p-2 shadow right-5 bottom-20 bg-white rounded-md hover:shadow-lg focus:shadow-lg">
            <MdOutlineMyLocation className="w-5 h-5"/>
        </button>
        </>
    )
}