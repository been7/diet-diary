import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleWriteButtonClick = () => {
    navigate("/write");
  };
  return (
    <StyledHeader>
      <StyledLogo src="/fork.png" alt="Logo" onClick={handleLogoClick} />
      <StyledWriteButton onClick={handleWriteButtonClick}>
        일기쓰기
      </StyledWriteButton>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #886297;
`;

const StyledLogo = styled.img`
  cursor: pointer;
  width: 30px;
`;

const StyledWriteButton = styled.button`
  padding: 10px 20px;
  background-color: #d998d6;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #81a4c2;
  }
`;
