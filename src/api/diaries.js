import axios from "axios";

// 조회
const getDiaries = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
  return response;
};

// 작성
const addDiaries = async (newDiary) => {
  await axios.post(`${process.env.REACT_APP_API_URL}`, newDiary);
};

// 삭제
const delDiaries = async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
};

// 수정
const fixDiaries = async (newDiary) => {
  await axios.patch(
    `${process.env.REACT_APP_API_URL}/${newDiary.id}`,
    newDiary
  );
};

export { addDiaries, delDiaries, fixDiaries, getDiaries };
