import React from "react";
// Components
import { Carousel, Col, Row } from "antd";
import SectionContainer from "@/components/molecules/cards/Section/SectionContainer";
import SectionTitle from "@/components/molecules/cards/Section/SectionTitle";
import SectionCardItem from "@/components/molecules/cards/Section/SectionCardItem";
import SectionContent from "@/components/molecules/cards/Section/SectionContent";
// Mock
import { recommendations as mockRecommendationsSliders } from "@/fakeAPI";

const Recommendations = () => {
  return (
    <SectionContainer width="100%" id="Recommendations">
      <SectionTitle>RECOMENDACIONES</SectionTitle>
      <Carousel autoplay autoplaySpeed={10000}>
        {mockRecommendationsSliders.map(
          (mockRecommendationsSlider, idxSlider) => (
            <SectionContent key={idxSlider} padding="35px 64px">
              {mockRecommendationsSlider.map((recommendationsRow, idxRow) => (
                <Row key={idxRow} gutter={[16, 24]}>
                  {recommendationsRow.map((mockRecommendationsCol, idxCol) => {
                    const val =
                      idxSlider *
                        mockRecommendationsSlider.length *
                        recommendationsRow.length +
                      idxRow * recommendationsRow.length +
                      idxCol +
                      1;
                    return (
                      <Col key={idxCol} className="gutter-row" span={12}>
                        <SectionCardItem
                          id={`Recommendation-${val}`}
                          onClick={() => console.log(`Recommendation-${val}`)}
                          margin="16px auto"
                          cardNumber={{
                            diameter: 40,
                            value: val,
                          }}
                          cardContent={mockRecommendationsCol}
                        />
                      </Col>
                    );
                  })}
                </Row>
              ))}
            </SectionContent>
          )
        )}
      </Carousel>
    </SectionContainer>
  );
};

export default Recommendations;
