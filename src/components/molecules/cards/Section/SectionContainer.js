import styled from "@emotion/styled";

const SectionContainerStyled = styled.div`
  width: ${({ width }) => (width ? width : "100%")} !important;
  height: ${({ height }) => (height ? height : "100%")} !important;
  margin: ${({ margin }) => (margin ? margin : "0 24px 0 0")};
  padding: ${({ padding }) => (padding ? padding : "0")};
  background: #ffc759;
  border: 4px solid #fee60c;
  z-index: 0;
`;

const SectionContainer = ({ children, ...rest }) => {
  return <SectionContainerStyled {...rest}>{children}</SectionContainerStyled>;
};

export default SectionContainer;
