import React, { useEffect, useState } from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard.jsx";
import useData from "../../hooks/useData.js";
import ProductSkeleton from "./ProductSkeleton.jsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination.jsx";

const ProductList = () => {
  const [search, setSearch] = useSearchParams();
  const [sortBy, setSortBy] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);

  const category = search.get("category") || "";
  const page = search.get("page") || 1;
  const searchQuery = search.get("search") || "";

  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        ...(searchQuery && { search: searchQuery }),
        ...(category && { category }),
        page,
        perPage: 8,
      },
    },
    [category, page, searchQuery],
  );

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page });
  };

  // 🔹 Initialize sortedProducts on data load
  useEffect(() => {
    if (data?.products) {
      setSortedProducts(data.products);
    }
  }, [data]);

  // 🔹 Handle sorting
  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];

      if (sortBy === "price desc") {
        setSortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSortedProducts(products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setSortedProducts(
          products.sort((a, b) => b.reviews.rate - a.reviews.rate),
        );
      } else if (sortBy === "rate asc") {
        setSortedProducts(
          products.sort((a, b) => a.reviews.rate - b.reviews.rate),
        );
      } else {
        setSortedProducts(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="product_list_section">
      <header className="header align_center product_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          className="product_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rating HIGH to LOW</option>
          <option value="rate asc">Rating LOW to HIGH</option>
        </select>
      </header>

      <div className="product_list">
        {error && <em className="form_error">{error}</em>}

        {isLoading
          ? skeletons.map((n) => <ProductSkeleton key={n} />)
          : (sortedProducts.length > 0
              ? sortedProducts
              : data?.products || []
            ).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

      {data && (
        <Pagination
          totalPosts={data?.totalProducts ?? 0}
          postsPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductList;
