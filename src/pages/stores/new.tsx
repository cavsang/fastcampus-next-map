import {useForm} from 'react-hook-form';
import {CATEGORY_ARR,FOOD_CERTIFY_ARR,STORE_TYPE_ARR} from '@/data/store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function StoreNew() {

    const {register, handleSubmit, formState:{errors}} = useForm();
    
    const router = useRouter();


  return (
    <form className="px-4 md:max-w-4xl mx-auto py-8" onSubmit={handleSubmit( async (data) => {
      try {
        const result = await axios.post('/api/stores',data);
        console.log(result);

        if(result.status === 200){
          toast.success('맛집등록');
          router.replace(`/stores/${result?.data?.id}`);
        }else{
          toast.error('맛집등록 실패!');
        }

      } catch (e) {
        toast.error(e);
      }
    })}>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">맛집 등록</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">아래항목을 입력해서 맛집을 등록해주세요.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                가게명
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name",{required:true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {errors?.name?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                        필수 입력사항 입니다.
                    </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                카테고리
              </label>
              <div className="mt-2">
                <select
                  {...register("category",{required:true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    <option value="">카테고리 선택</option>
                  {CATEGORY_ARR.map((category) => (
                        <option value={category} key={category}>{category}</option>
                  ))}
                </select>
                 {errors?.category?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                        필수 입력사항 입니다.
                    </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                연락처
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("phone",{required:true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.phone?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                        필수 입력사항 입니다.
                    </div>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                주소(다음 api)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("address",{required: true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="foodCertifyName" className="block text-sm font-medium leading-6 text-gray-900">
                식품인증구분
              </label>
              <div className="mt-2">
                <select
                  {...register("foodCertifyName",{required:true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {FOOD_CERTIFY_ARR.map((food) => (
                        <option value={food} key={food}>{food}</option>
                  ))}
                </select>
                {errors?.foodCertifyName?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                        필수 입력사항 입니다.
                    </div>
                )}
              </div>
            </div>



            <div className="sm:col-span-2">
              <label htmlFor="storeType" className="block text-sm font-medium leading-6 text-gray-900">
                업종구분
              </label>
              <div className="mt-2">
                <select
                  {...register("storeType",{required:true})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {STORE_TYPE_ARR.map((store) => (
                        <option value={store} key={store}>{store}</option>
                  ))}
                </select>
                {errors?.storeType?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">
                        필수 입력사항 입니다.
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          뒤로가기
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          제출하기
        </button>
      </div>
    </form>
  )
}