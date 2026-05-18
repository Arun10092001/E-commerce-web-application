import React from "react";

import "./FeaturedProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData";

const FeaturedProducts = () => {
  const { data, error, isLoading } = useData("/products/featured");
  const products = data || [];

  return (
    <section className="featured_products">
      <h2>Featured Products</h2>

      {error && <em className="form_error">{error}</em>}

      <div className="align_center feat_pro_list">
        {isLoading
          ? Array.from({ length: 3 }, (_, index) => (
              <ProductCard
                key={index}
                product={{
                  images: [""],
                  title: "",
                  price: 0,
                  reviews: { rate: 0, counts: 0 },
                  stock: 0,
                }}
              />
            ))
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
