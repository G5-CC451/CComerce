import styled from "@emotion/styled";

const SectionContentStyled = styled.div`
  width: ${({ width }) => (width ? width : "100%")} !important;
  height: ${({ height }) => (height ? height : "100%")} !important;
  padding: ${({ padding }) => (padding ? padding : "48px 64px")};
  background: #ffc759;
  z-index: 0;

  &::-webkit-scrollbar {
    width: 1em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

const SectionContent = ({ children, ...restProps }) => {
  return <SectionContentStyled {...restProps}>{children}</SectionContentStyled>;
};

export default SectionContent;
