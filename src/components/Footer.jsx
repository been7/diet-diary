import { styled } from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <StyledCompanyInfo>
        {" "}
        icons by{" "}
        <a href="https://icons8.com/" target="_blank" rel="noopener noreferrer">
          icons8
        </a>
      </StyledCompanyInfo>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  padding: 20px;
  background-color: #9458ac;
  text-align: center;
`;

const StyledCompanyInfo = styled.p`
  margin: 0;
  font-size: 14px;
  color: #fff;
`;
