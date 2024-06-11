
export default function Loading(){
    return (
    <>
        <div className="w-full h-20 animate-pulse bg-gray-200 rounded-md"></div>
        {[...Array(10)].map((i, index) => (
            <div className="w-full h-20 animate-pulse bg-gray-200 rounded-md" key={index}></div>
        ))}
    </>
    );
}