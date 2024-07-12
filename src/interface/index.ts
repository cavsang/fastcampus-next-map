export interface StoreType{
    id: number;
    phone?: string;
    storeType?: string;
    category?: string;
    name?: string;
    lng?: string;
    lat?: string;
    address?: string;
    foodCertifyName?: string;
    likes?: LikeInterface[];
}

interface LikeInterface{
    id: number;
    storeId: number;
    userId: number;
}

export interface StoreApiResponse{
    data: StoreType[];
    page: number;
    totalCount?: number;
    totalPage?: number;
    pageSize: number;
}

export interface LocationType{
    lat?: string;
    lng?: string;
    zoom?: number;
}

export interface SearchType{
    q?:string,
    district?:string
}