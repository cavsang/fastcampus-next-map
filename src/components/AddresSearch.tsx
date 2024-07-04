import {UseFormRegister, FieldErrors, UseFormSetValue} from 'react-hook-form';
import { StoreType } from '@/interface';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useState } from 'react';

interface addressProps{
    register: UseFormRegister<StoreType>;
    errors: FieldErrors<StoreType>;
    setValue: UseFormSetValue<StoreType>;
}

export default function AddresSearch({register,errors, setValue}:addressProps){
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleComplete = (data:any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

    setValue('address', fullAddress); //address 필드에 들어간다.
    //setIsOpen(false); // 주소창은 다시닫아줌.
  };

  

    return (
      <>
         <div className="col-span-full">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                  주소
                </label>
                <div className="mt-2">
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                    <input
                      type="text"
                      {...register("address",{required: true})}
                      className="col-span-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      readOnly
                      placeholder="주소를 검색해주세요."
                    />
                    {/* button의 type=button이없으면 form에서 값이 날라가네.그럼 preventdefault()해주던가 해야함. */}
                    <button type="button" className="bg-blue-700 hover:bg-blue-600 py-1.5 px-2 rounded text-white" onClick={() => {
                        setIsOpen((val) => !val)}
                    }>주소검색</button>

                  </div>

                  
                  {errors?.address?.type === 'required' && (
                      <div className="pt-2 text-xs text-red-600">
                          필수 입력사항 입니다.
                      </div>
                  )}
                </div>
          </div>
          {isOpen && (
            <DaumPostcodeEmbed onComplete={handleComplete}/>
          )}
        </>
    )
}