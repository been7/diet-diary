import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addDiaries } from "../api/diaries";

const Write = () => {
  const [mood, setMood] = useState(1);
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

    if (!title || !content || !password) {
      alert("필수 입력값을 확인하세요.");
      return false;
    }
    if (![1, 2, 3, 4, 5].some((item) => item == mood)) {
      alert("오늘 기분을 1~5 중에서 선택하세요.");
      return false;
    }

    diaryMutation.mutate({
      moodCode: mood,
      title,
      body: content,
      password,
      isDeleted: false,
      createAt: new Date().toString(),
    });

    // 메인으로 이동동
    navigate("/");
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
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

  // useEffect(() => {
  //   console.log("mood", mood);
  // }, [mood]);

  return (
    <StyledMain>
      <StyledTitle>Write Diary</StyledTitle>
      <StyledDate>July 7, 2023</StyledDate>
      <form onSubmit={handleWriteButtonClick}>
        <StyledMoodLabel htmlFor="moodSelect">Mood:</StyledMoodLabel>
        <StyledMoodSelect id="moodSelect" onChange={handleMoodChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </StyledMoodSelect>
        <StyledTitleLabel htmlFor="titleTextInput">Title</StyledTitleLabel>
        <StyledTitleInput value={title} onChange={handleTitleChange} />
        <StyledContentLabel htmlFor="contentTextarea">
          Content
        </StyledContentLabel>
        <StyledContentTextarea
          id="contentTextarea"
          value={content}
          onChange={handleContentChange}
        />

        <StyledPasswordLabel htmlFor="passwordInput">
          Password:
        </StyledPasswordLabel>
        <StyledPasswordInput
          type="password"
          id="passwordInput"
          value={password}
          onChange={handlePasswordChange}
        />
        <button>제출</button>
      </form>
    </StyledMain>
  );
};

export default Write;

const StyledMain = styled.main`
  flex: 1;
  padding: 20px;
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  font-size: 24px;
  color: #293241;
`;

const StyledDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;

const StyledMoodLabel = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #293241;
`;

const StyledMoodSelect = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const StyledContentLabel = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #293241;
`;

const StyledContentTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
`;

const StyledTitleLabel = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #293241;
`;

const StyledTitleInput = styled.textarea`
  width: 100%;
  height: 20px;
  padding: 10px;
  font-size: 16px;
`;

const StyledPasswordLabel = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #293241;
`;

const StyledPasswordInput = styled.input`
  padding: 10px;
  font-size: 16px;
`;
