import { useRouter } from "next/router";

import { getProductsBySlug } from "../../common/shopUtils";
import { capitalizeFirstLetter } from "../../common/utils";
import LayoutOne from "../../components/layouts/LayoutOne";
import ProductDetailOne from "../../components/productDetail/ProductDetailOne";
import productData from "../../data/product.json";

export default function pid() {
  const router = useRouter();
  const { slug } = router.query;
  console.log("🚀 ~ file: [slug].js ~ line 12 ~ pid ~ slug", slug);
  const foundProduct = getProductsBySlug(productData, slug);

  return (
    <LayoutOne
      title={foundProduct && capitalizeFirstLetter(foundProduct.name)}
      clearSpaceTop
    >
      {/* {foundProduct && <ProductDetailOne data={foundProduct} />} */}
    </LayoutOne>
  );
}
