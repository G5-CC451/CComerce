import React, { useState, useEffect } from "react";
// Business logic
import { getCategories } from "@/functions/category";
// Components
import SectionContainer from "@/components/molecules/cards/Section/SectionContainer";
import SectionTitle from "@/components/molecules/cards/Section/SectionTitle";
import SectionCardItem from "@/components/molecules/cards/Section/SectionCardItem";
import SectionContent from "@/components/molecules/cards/Section/SectionContent";
// Mock
import { categories as mockCategories } from "@/fakeAPI";

const CategorySidebar = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // getCategories().then((c) => {
    //   setCategories(c.data);
    //   setLoading(false);
    // });
  }, []);

  return (
    <SectionContainer height="530px">
      <SectionTitle width="278px">CATEGORÍAS</SectionTitle>
      <SectionContent
        padding="0px 16px"
        height="460px"
        style={{
          marginTop: "40px",
          overflow: "hidden scroll",
        }}
      >
        {categories.length > 0 &&
          categories.map((category, idx) => (
            <SectionCardItem
              onClick={() => {
                console.log(`category-${String(idx + 1)}`, category.name);
              }}
              key={`category-${String(idx + 1)}`}
              width={380}
              height={64}
              cardNumber={{
                diameter: 40,
                value: idx + 1,
              }}
              cardContent={{
                margin: "auto 0",
                content: category.name,
              }}
            />
          ))}
      </SectionContent>
    </SectionContainer>
  );
};

export default CategorySidebar;
