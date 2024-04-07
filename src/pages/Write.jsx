import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { addDiaries } from "../api/diaries";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

const currentDate = new Date();
const formattedDate = formatDate(currentDate);

const Write = () => {
  const [mood, setMood] = useState(1);
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const diaryMutation = useMutation(addDiaries, {
    onSuccess: () => {
      queryClient.invalidateQueries("diaries");
    },
  });

  const handleWriteButtonClick = (e) => {
    e.preventDefault();

    if (!writer || !title || !content || !password) {
      alert("필수 입력값을 확인하세요.");
      return false;
    }
    if (![1, 2, 3, 4, 5].some((item) => item == mood)) {
      alert("오늘 기분을 1~5 중에서 선택하세요.");
      return false;
    }

    diaryMutation.mutate({
      moodCode: mood,
      formattedDate,
      writer,
      title,
      body: content,
      password,
      isDeleted: false,
      createAt: currentDate,
    });

    // 메인으로 이동
    navigate("/");
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleWriterChange = (e) => {
    setWriter(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="mt-32 mx-auto w-full max-w-screen-lg min-w-[360px] px-3">
      {/* <div className="flex flex-col justify-center"> */}
      <h2 className="text-2xl text-gray-800 mt-0 mb-3 text-center">
        Record your diet
      </h2>
      <div className="w-full h-1 mb-10 bg-gradient-to-r from-[#364528] from-5% via-[#D0DBB4] to-[#FEF0C9]"></div>
      <form onSubmit={handleWriteButtonClick}>
        <div className="flex gap-3 mb-5">
          <div className="flex-1">
            <div>
              <label className="block text-gray-800 text-lg">Writer</label>
            </div>
            <div>
              <input
                value={writer}
                onChange={handleWriterChange}
                className="w-full h-16 px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-lg mt-1"
              />
            </div>
          </div>
          <div>
            <div>
              <label className="block text-gray-800 text-lg">Mood</label>
            </div>
            <div>
              <select
                onChange={handleMoodChange}
                className="h-16 px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-lg mt-1 focus:outline-none "
              >
                <option value="1">😄</option>
                <option value="2">😭</option>
                <option value="3">🥰</option>
                <option value="4">😷</option>
                <option value="5">😡</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div>
            <label className="block text-gray-800 text-lg">Title</label>
          </div>
          <div>
            <input
              value={title}
              onChange={handleTitleChange}
              className="w-full h-16 px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-lg mt-1"
            />
          </div>
        </div>
        <div className="mb-5">
          <div>
            <label className="block text-gray-800 text-lg">Content</label>
          </div>
          <div>
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full h-48 px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-lg mt-1"
            />
          </div>
        </div>
        <div className="mb-5">
          <div>
            <label className="block text-gray-800 text-lg">Password</label>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-lg mt-1"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="px-6 py-2 text-white text-md mt-5 bg-green-900 rounded-sm font-semibold">
            Submit
          </button>
        </div>
      </form>
      {/* </div> */}
    </main>
  );
};

export default Write;
