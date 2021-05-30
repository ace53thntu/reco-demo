import _ from "lodash";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import slugify from "slugify";

import { FEATURE_IDS } from "../common/defines";
import useProductData from "../common/useProductData";
import LayoutOne from "../components/layouts/LayoutOne";
import Banners from "../components/shop/Banners";
import ShopLayout from "../components/shop/ShopLayout";
import productData from "../data/product.json";

export default function Home() {
  const router = useRouter();
  const globalState = useSelector((state) => state.globalReducer);

  const data = useProductData(
    productData,
    globalState.category,
    router.query.q
  );

  const [products, setProducts] = React.useState([]);

  const init = React.useCallback(async () => {
    const res = await window.AicactusSDK.getFeatureById(
      FEATURE_IDS.topProducts,
      "top"
    );
    if (res?.data?.results?.data?.length) {
      const data = res.data.results.data;
      setProducts(
        data.map((item) => ({
          ...item,
          slug: slugify(item.name, {
            replacement: "-",
            remove: undefined,
            lower: true,
            strict: false,
            locale: "vi",
          }),
          thumbImage: [item.cdn_link, item.cdn_link],
          images: [item.cdn_link],
        }))
      );
    }
  }, []);

  React.useEffect(() => {
    let timer = setTimeout(() => {
      init();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutOne title="Home">
      <Banners />
      <ShopLayout
        fiveColumn
        shopSidebarResponsive={{ xs: 24, lg: 4 }}
        shopContentResponsive={{ xs: 24, lg: 20 }}
        productResponsive={{ xs: 12, sm: 8, md: 6 }}
        productPerPage={15}
        // data={[...data]}
        data={[...products]}
      />
    </LayoutOne>
  );
}
