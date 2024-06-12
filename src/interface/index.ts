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
}

export interface StoreApiResponse{
    data: StoreType[];
    page: number;
    totalCount?: number;
    totalPage?: number;
    pageSize: number;
}