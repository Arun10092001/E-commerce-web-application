import React from 'react'

import config from '../../config.json'
import './ProductSidebar.css'
import LinkwithIcon from '../Navbar/LinkwithIcon'
import useData from "../../hooks/useData"

const ProductSidebar = () => {
  const{data: categories, error} = useData("/category")

  return (
    <aside className='product_sidebar'>
        <h2>Category</h2>

        <div className="category_links">
          {error && <em>{error}</em>}
          {categories && categories.map(category => 
          <LinkwithIcon
          key={category._id}
          id={category._id}
          title={category.name}
          link={`/products?category=${category.name}`}
          emoji={`${config.backendURL}/category/${category.image}`}
          sidebar={true}
          />)}
        </div>
    </aside>
  )
}

export default ProductSidebar