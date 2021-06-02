import { Breadcrumb, Col, Row } from "antd";
import React from "react";

import { FEATURE_IDS } from "../../common/defines";
import Container from "../other/Container";
import ProductDetailContentOne from "./productDetailContent/ProductDetailContentOne";
import ProductDetailImageOne from "./productDetailImage/ProductDetailImageOne";
import ProductDetailTabOne from "./productDetailTab/ProductDetailTabOne";

function ProductDetailLayoutOne({ data }) {
  const [adsBanners, setAdsBanners] = React.useState([]);

  const init = React.useCallback(async () => {
    const res = await window.AicactusSDK.getFeatureById(
      FEATURE_IDS.rightCanvas,
      "canvas",
      {
        width: 450,
        height: 170,
        background_color: "#FFFFFF",
      }
    );
    if (res?.data?.results?.data?.length) {
      setAdsBanners(res.data.results.data);
    }
  }, []);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      init();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="product-detail-one">
      <div className="product-detail-one-top">
        <Container>
          <Breadcrumb className="product-detail-breadcrumb" separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={70}>
            <Col span={24} md={12}>
              <ProductDetailImageOne imageData={data.thumbImage} />
            </Col>
            <Col span={24} md={10}>
              <ProductDetailContentOne data={data} quantityControllerNoRound />
            </Col>
            <Col span={24} md={2}>
              {adsBanners.map((item, index) => (
                <a
                  className="banner-item"
                  href={item.href}
                  target="_blank"
                  key={item.id}
                >
                  <img src={item.link} alt="banner" />
                </a>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="product-detail-one-bottom">
        <ProductDetailTabOne />
      </div>
    </div>
  );
}

export default React.memo(ProductDetailLayoutOne);
