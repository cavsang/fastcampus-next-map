import {atom} from 'recoil';
import { LocationType, StoreType, SearchType } from '@/interface';

export const mapState = atom({
    key: 'map',
    default: null,
    dangerouslyAllowMutability:true
});


export const currentStoreState = atom<StoreType | null>({
    key: 'store',
    default: null
});


const DEFAULT_LAT = '37.497625203';
const DEFAULT_LNG = '127.03088379';
const DEFAULT_ZOOM = 3;

export const locationState = atom<LocationType | null>({
    key: 'location',
    default: {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG,
        zoom: DEFAULT_ZOOM
    }
});

export const searchState = atom<SearchType | null>({
    key:'search',
    default:null
});

