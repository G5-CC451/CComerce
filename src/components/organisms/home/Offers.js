import React from "react";
// Components
import { Carousel, Col, Row } from "antd";
import SectionContainer from "@/components/molecules/cards/Section/SectionContainer";
import SectionTitle from "@/components/molecules/cards/Section/SectionTitle";
import SectionCardItem from "@/components/molecules/cards/Section/SectionCardItem";
import SectionContent from "@/components/molecules/cards/Section/SectionContent";
// Mock
import { offers as mockOffers } from "@/fakeAPI";

const Offers = () => {
  return (
    <SectionContainer width="100%" id="Offers">
      <SectionTitle width="295px">OFERTAS</SectionTitle>
      <Carousel autoplay autoplaySpeed={6000}>
        {mockOffers.map((mockOfferRow, idxRow) => (
          <SectionContent
            key={`OfferRow-${idxRow}`}
            id={`OfferRow-${idxRow}`}
            padding="64px"
          >
            <Row gutter={16}>
              {mockOfferRow.map((offer, idxCol) => (
                <Col key={idxCol.toString()} className="gutter-row" span={8}>
                  <SectionCardItem
                    id={`Offer-${offer.cardNumber.value}`}
                    onClick={() =>
                      console.log(`Offer-${offer.cardNumber.value}`)
                    }
                    margin="auto"
                    cardNumber={offer.cardNumber}
                    cardContent={offer.cardContent}
                  />
                </Col>
              ))}
            </Row>
          </SectionContent>
        ))}
      </Carousel>
    </SectionContainer>
  );
};

export default Offers;
