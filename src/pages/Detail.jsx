import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
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

  const { data } = useQuery("diaries", getDiaries);

  const diary = data.data.find((item) => item.id == params.id);

  const handleDeleteButton = () => {
    delMutate(params.id);
  };

  const handleFixButton = () => {
    navigate(`/fix/${params.id}`);
  };

  return (
    <StyledMain>
      <StyledTitle>{diary.title}</StyledTitle>
      <StyledDate>{diary.createdAt}</StyledDate>
      <StyledMood>Mood: {diary.moodCode}</StyledMood>
      <StyledContent>{diary.body}</StyledContent>
      <button onClick={handleFixButton}>수정</button>
      <button onClick={handleDeleteButton}>삭제</button>
    </StyledMain>
  );
};

export default Detail;

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

const StyledMood = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #293241;
`;

const StyledContent = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #293241;
`;
