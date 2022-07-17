import React from "react";
import Link from "next/link";
// Components
import { Col, Layout, Row } from "antd";
import PublicBasic from "@/components/templates/public/Basic";
import SectionCardItem from "@/components/molecules/cards/Section/SectionCardItem";
import SectionContent from "@/components/molecules/cards/Section/SectionContent";
// Mock
import { cart } from "@/fakeAPI/cart";

const { Content } = Layout;

const Cart = () => {
  const showCartItems = () => (
    <SectionContent
      padding="24px 0px"
      width="675px"
      height="803px"
      style={{
        margin: "24px 16px",
        overflow: "hidden scroll",
      }}
    >
      {cart.map((product, idx) => (
        <SectionCardItem
          key={product.slug}
          id={product.slug}
          onClick={() => console.log(product.slug)}
          width={632}
          height={130}
          margin="16px"
          cardNumber={{
            diameter: 40,
            value: idx + 1,
          }}
          cardContent={{
            margin: "auto 0",
            content: (
              <div>
                <div style={{ textAlign: "left", fontWeight: "bold" }}>
                  {product.title}
                </div>
                <div style={{ textAlign: "left" }}>{product.description}</div>
                <div style={{ textAlign: "right" }}>Cant: {product.count}</div>
              </div>
            ),
          }}
        />
      ))}
    </SectionContent>
  );

  const subtotal = cart.reduce(
    (prevVal, currVal) => prevVal + currVal.count * currVal.price,
    0.0
  );

  const igv = subtotal * 0.18;

  const desct = 100.0;

  const total = subtotal + igv - desct;

  return (
    <PublicBasic>
      <Layout style={{ background: "transparent" }}>
        <Content
          style={{
            padding: "16px",
            margin: "16px 0",
            minHeight: 330,
          }}
        >
          <h2>Carrito de compras</h2>
          <Row gutter={24} style={{ marginTop: "32px" }}>
            <Col span={16}>
              {!cart.length ? (
                <p>
                  No hay productos en el carrito de compras.{" "}
                  <Link href="/shop">Continue comprando.</Link>
                </p>
              ) : (
                showCartItems()
              )}
            </Col>
            <Col span={8}>
              <div
                style={{
                  width: "577px",
                  height: "442px",
                  background: "#D9D9D9",
                  border: "1px solid #FFC759",
                  borderRadius: "20px",
                  marginTop: "48px",
                  padding: "32px",
                }}
              >
                <Row gutter={16}>
                  <Col span={16}>
                    <h2>Total artículos:</h2>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <h2>
                      {cart.reduce(
                        (prevVal, currVal) => prevVal + currVal.count,
                        0
                      )}
                    </h2>
                  </Col>
                </Row>
                <hr />
                <Row gutter={16}>
                  <Col span={16}>
                    <h4>Sub total:</h4>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <h4>{subtotal.toFixed(2)}</h4>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <h4>I.G.V. (18%):</h4>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <h4>{igv.toFixed(2)}</h4>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={16}>
                    <h4>Descuento:</h4>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <h4>{desct.toFixed(2)}</h4>
                  </Col>
                </Row>
                <hr />
                <h2>Total:</h2>
                <Row
                  gutter={16}
                  style={{
                    width: "411px",
                    height: "67px",
                    background: "#FF9E6D",
                    border: "3px solid #FFC759",
                    borderRadius: "18px",
                    fontSize: "36px",
                    margin: "auto",
                    padding: "0 20px",
                  }}
                >
                  <Col span={4}>S/ </Col>
                  <Col span={20} style={{ textAlign: "right" }}>
                    <b>{total.toFixed(2)}</b>
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  margin: "auto",
                  marginTop: "60px",
                  width: "302px",
                  height: "95px",
                  background: "#D9D9D9",
                  opacity: "0.8",
                  border: "1px solid #FFC759",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "20px",
                  fontSize: "40px",
                  lineHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#000000",
                  cursor: "pointer",
                }}
              >
                PAGAR
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </PublicBasic>
  );
};

export default Cart;
