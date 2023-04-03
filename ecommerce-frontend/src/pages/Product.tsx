import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { changeCart } from "../reducers/userSlice"
import Cookie from "js-cookie"
import axios from "axios"

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
  const dispatch = useDispatch()
  const { productSlug } = useParams<any>()
  const [product, setProduct] = useState<any>([])
  const userId = useSelector((state: any) => state.user.userId)
  const userCart = useSelector((state: any) => state.user.userCart)
  const token = Cookie.get("token")

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

  function addProductToCart(productId) {
    let arr = [...userCart]
    arr.push(productId)

    console.log(arr)

    axios({
      method: "put",
      url: `http://localhost:1337/users/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        cart: {
          products: arr,
        },
      },
    }).then(() => {
      dispatch(changeCart(arr))
    })
  }

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
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => addProductToCart(product.id)}
                >
                  Add to cart
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
