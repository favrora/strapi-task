import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

type Props = {
  id?: number
  slug?: string
  image: {
    url?: string
  }
  name?: string
  title?: string
  description?: string
  price?: number
}

function Home() {
  const { productSlug } = useParams<any>()
  const [product, setProduct] = useState<any>([])
  const userCart = useSelector((state: any) => state.user.userCart)

  useEffect(() => {
    fetch(`http://localhost:1337/products?slug=${productSlug}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setProduct(data)
      })
  }, [productSlug])

  return (
    <div className="container">
      {product.map((product: Props) => (
        <div className="row mt-4 mb-4" key={product.id}>
          <div className="col-12 col-md-6">
            <img
              src={`http://localhost:1337${product.image.url}`}
              alt={product.title}
            />
          </div>
          <div className="col-12 col-md-6">
            <h1 className="product-title">
              {product.title} - ${product.price}
            </h1>
            <div className="product-description">{product.description}</div>

            {userCart.includes(product.id) ? (
              <>
                <button className="btn btn-primary mt-3" disabled>
                  Already in cart
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-primary mt-3">Add to cart</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
