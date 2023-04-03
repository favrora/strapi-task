import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Cookie from "js-cookie"
import axios from "axios"

type Props = {
  id: number
  slug: string
  image: {
    url: string
  }
  name: string
  title: string
  description: string
  price: number
}

function Home() {
  const [products, setProducts] = useState([])
  const userId = useSelector((state: any) => state.user.userId)
  const userCart = useSelector((state: any) => state.user.userCart)
  const token = Cookie.get("token")

  useEffect(() => {
    axios
      .get("http://localhost:1337/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response: any) => {
        return response // .json()
      })
      .then((data) => {
        console.log(data)
        setProducts(data.data.cart.products)
      })
  }, [token])

  function removeFromCart(productId) {
    let arr = userCart
    arr = arr.filter((x) => x !== productId)

    axios({
      method: "put",
      url: `http://localhost:1337/users/${userId}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        cart: {
          products: arr,
        },
      },
    })
      .then((response: any) => {
        return response // .json()
      })
      .then((data) => {
        console.log(data)
      })
  }

  return (
    <div className="container">
      <div className="row mb-3">
        <h1>Your Cart ({userCart.length} items)</h1>

        <div className="card">
          {products.map((product: Props) => (
            <div className="col-12" key={product.id}>
              <div className="d-flex justify-content-between">
                <a href={`/product/${product.slug}`}>
                  <h5 className="card-title">{product.title}</h5>
                </a>

                <div>${product.price}</div>

                <div
                  className="product-remove"
                  onClick={() => removeFromCart(product.id)}
                >
                  <img src="/remove.png" alt="Remove from cart icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
