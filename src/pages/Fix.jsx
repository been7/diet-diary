import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fixDiaries, getDiaries } from "../api/diaries";

const Fix = () => {
  const { data } = useQuery("diaries", getDiaries);
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const filteredDiary = data.data.find((item) => {
    return item.id == params.id;
  });

  const [mood, setMood] = useState(filteredDiary.moodCode);
  const [writer, setWriter] = useState(filteredDiary.writer);
  const [title, setTitle] = useState(filteredDiary.title);
  const [content, setContent] = useState(filteredDiary.body);
  const [password, setPassword] = useState("");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dayOfWeek = currentDate.toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  const nowDate = `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;

  const diaryMutation = useMutation(fixDiaries, {
    onSuccess: () => {
      queryClient.invalidateQueries("diaries");
    },
  });

  const handleFixButtonClick = (e) => {
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
      id: filteredDiary.id,
      moodCode: mood,
      writer,
      title,
      body: content,
      password,
      isDeleted: false,
      createAt: new Date().toString(),
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
    <main className="mt-32 mx-auto w-[1000px] px-3">
      <h2 className="text-2xl text-gray-800 mt-0 mb-3 text-center">
        Fix Diary
      </h2>
      <div className="w-full h-1 mb-10 bg-gradient-to-r from-[#364528] from-5% via-[#D0DBB4] to-[#FEF0C9]"></div>
      <form onSubmit={handleFixButtonClick}>
        {" "}
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
    </main>
  );
};

export default Fix;
