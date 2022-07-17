import styled from "@emotion/styled";

const SectionTitleStyled = styled.div`
  width: ${({ width }) => (width ? width : "369px")};
  height: ${({ height }) => (height ? height : "45px")};
  color: #000000;
  background-color: #ff9e6d;
  border: 4px solid #fee60c;
  border-radius: 20px;
  font-family: Lemon;
  font-size: 30px;
  line-height: 39px;
  position: absolute;
  margin-top: -16px;
  margin-left: 16px;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

const SectionTitle = ({ children, ...restProps }) => {
  return <SectionTitleStyled {...restProps}>{children}</SectionTitleStyled>;
};

export default SectionTitle;
