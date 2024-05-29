import {useRouter} from 'next/router';

export default function StoreDetailPage(){

    const router = useRouter();
    const {id} =  router.query;

    return (
        <div>
            <h1>Store Detail id : {id}</h1>
        </div>
    )

}