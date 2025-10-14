import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

const ProductSkeleton = () => {
  return (
    <div className="product_card">
      <div className="product_image">
        <Skeleton height={200} width="100%" />
      </div>
      <div className="product_details">
        <Skeleton height={21} width="40%" className="product_price" />
        <Skeleton height={18} width="80%" className="product_title" style={{ marginTop: "6px" }} />
        <div 
        className="product_info" style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
          <Skeleton height={30} width={80} className="product_rating" />
          <Skeleton height={16} width={40} className="product_review_count" style={{ marginLeft: "10px" }} />
        </div>
        <Skeleton circle={true} height={40} width={40} className="add_to_cart" />
      </div>
    </div>
  )
}

export default ProductSkeleton