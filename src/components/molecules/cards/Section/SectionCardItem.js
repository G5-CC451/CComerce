import React from "react";
import styled from "@emotion/styled";

const SectionItem = styled.div`
  width: ${({ width }) => (width ? `${width}px` : "470px")};
  height: ${({ height }) => (height ? `${height}px` : "194px")};
  margin: ${({ margin }) => (margin ? margin : "8px")};
  background: #d9d9d9;
  border: 4px solid #000000;
  border-radius: 15px;
  color: #000000;
  font-size: 24px;
  text-align: center;
  display: flex;
`;

const SectionItemNumber = styled.div`
  width: ${({ diameter }) => (diameter ? `${diameter}px` : "48px")};
  height: ${({ diameter }) => (diameter ? `${diameter}px` : "48px")};
  font-size: ${({ diameter }) => (diameter ? `${diameter / 1.6}px` : "28px")};
  background-color: #ff9e6d;
  color: #000000;
  border-radius: 50%;
  font-weight: 500;

  margin: 8px;
  z-index: 1;
`;

const SectionCardItem = ({
  cardContent: { margin, content },
  cardNumber: { diameter, value },
  ...rest
}) => {
  return (
    <SectionItem {...rest}>
      <SectionItemNumber diameter={diameter}>{value}</SectionItemNumber>
      <div style={{ margin: margin, width: "90%" }}>{content}</div>
    </SectionItem>
  );
};

export default SectionCardItem;
