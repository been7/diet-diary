import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { delDiaries, getDiaries } from "../api/diaries";

const Detail = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 삭제
  const { mutate: delMutate } = useMutation(delDiaries, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["diaries"]);
      navigate("/");
    },
  });

  const { data, isLoading } = useQuery("diaries", getDiaries);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const diary = data.data.find((item) => item.id == params.id);

  if (!diary) {
    return <div>Diary not found</div>; // diary가 없는 경우 처리
  }

  const handleDeleteButton = () => {
    const diary = data.data.find((item) => item.id == params.id);

    Swal.fire({
      title: "삭제 하시겠습니까?",
      input: "password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonColor: "#7f1d1d",
      cancelButtonColor: "#14532d",
      confirmButtonText: "승인",
      cancelButtonText: "취소",
      reverseButtons: true,
      inputValidator: (value) => {
        if (!value) {
          return "비밀번호를 입력해주세요!";
        } else if (value !== diary.password) {
          return "비밀번호가 다릅니다!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value === diary.password) {
        delMutate(params.id);
      }
    });
  };

  const handleFixButton = () => {
    const diary = data.data.find((item) => item.id == params.id);

    Swal.fire({
      title: "수정하려면 비밀번호를 입력하세요.",
      input: "password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonColor: "#7f1d1d",
      cancelButtonColor: "#14532d",
      confirmButtonText: "승인",
      cancelButtonText: "취소",
      reverseButtons: true,
      inputValidator: (value) => {
        if (!value) {
          return "비밀번호를 입력해주세요!";
        } else if (value !== diary.password) {
          return "비밀번호가 다릅니다!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value === diary.password) {
        navigate(`/fix/${params.id}`);
      }
    });
  };

  const getMood = () => {
    const moodCode = diary.moodCode == undefined || null ? "" : diary.moodCode;
    switch (+moodCode) {
      case 1:
        return "😄";
      case 2:
        return "😭";
      case 3:
        return "🥰";
      case 4:
        return "😷";
      case 5:
        return "😡";
      default:
        return "😄";
    }
  };

  return (
    <main className="mt-32 mx-auto w-full max-w-screen-lg min-w-[360px] px-3 box-border">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <h2 className="order-last sm:order-first text-2xl text-gray-800  mt-3 mb-0 sm:mb-3 sm:mt-0 truncate">
          {diary.title}
        </h2>
        <div className="flex items-center gap-3 justify-end ">
          <p className="text-gray-500">{diary.writer},</p>
          <p>{getMood()}</p>
          <p className="text-gray-500">{diary.formattedDate}</p>
        </div>
      </div>
      <div className="w-full h-1 mb-10 bg-gradient-to-r from-[#364528] from-5% via-[#D0DBB4] to-[#FEF0C9]"></div>
      <p>{diary.body}</p>
      <div className="flex justify-end gap-3">
        <button
          className="px-6 py-2 text-white text-md mt-5 bg-green-900 rounded-sm font-semibold"
          onClick={handleFixButton}
        >
          Edit
        </button>
        <button
          className="px-6 py-2 text-white text-md mt-5 bg-red-900 rounded-sm font-semibold"
          onClick={handleDeleteButton}
        >
          Delete
        </button>
      </div>
    </main>
  );
};

export default Detail;
