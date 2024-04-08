import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getDiaries } from "../api/diaries";
import HeroMain from "../components/HeroMain";

const Main = () => {
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery("diaries", getDiaries);
  console.log("data", data);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }

  if (isError) {
    return <h1>오류 발생!</h1>;
  }

  const handleDiaryItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <HeroMain />
      <main className="w-full px-3 max-w-screen-lg min-w-[360px] mx-auto pt-10 sm:pt-16 mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 items-center">
          {data.data.reverse().map((item, index) => (
            <>
              <div
                className="font-merriweather w-full h-32 rounded-md bg-gradient-to-br from-[#364528] via-[#D0DBB4] to-[#FEF0C9] p-0.5 text-black hover:cursor-pointer"
                key={index}
                onClick={() => handleDiaryItemClick(item.id)}
              >
                {" "}
                <div className="h-full p-3 rounded-md bg-white">
                  <div className="h-[70%] flex items-center justify-center whitespace-nowrap">
                    <h2 className="text-xl text-ellipsis overflow-hidden">
                      {item.title}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm text-end text-gray-500">
                    {item.formattedDate}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </main>
    </>
  );
};

export default Main;
