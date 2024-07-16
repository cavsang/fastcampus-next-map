
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import axios from 'axios';
import { StoreType } from '@/interface';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

interface LikeProps{
    storeId: number | undefined;
}

export default function Like({storeId}:LikeProps){

    const fetchStore = async () => {
        const { data } = await axios(`/api/stores?id=${storeId}`);
        return data as StoreType;
    }
    
    const { data: store,isSuccess, isFetching, isError, refetch } = useQuery(`like-store-${storeId}`, fetchStore, {
        enabled: !!storeId,//비동기로 날리는데 id가 있는경우에만 날려라. options의 enabled의미.
        refetchOnWindowFocus: false//기본값은 true인데.다른창가거나 다른프로그램갔다가 가면 항상 새로고침한다. 그걸꺼준다.
    });

    const {data: session} = useSession();

    const toggleLike = async () => {
        if(session?.user && store){
            try {
                const like = await axios.post('/api/likes',{
                    storeId: store?.id
                });

                if(like.status === 201){
                    toast.success('찜했습니다.');
                }else{
                    toast.warn('찜을 취소했습니다.')
                }
                refetch(); //이걸해줘야 F5안눌르고 실시간으로 업데이트됨.
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    return (
        <button type="button" onClick={toggleLike}>
            {store?.likes?.length ? 
                (<AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500"/>)
                : 
                
                (<AiOutlineHeart className="hover:text-red-600 focus:text-red-600"/>) }
        </button>
    )
}