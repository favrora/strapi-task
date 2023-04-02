import React, { useState, useEffect } from "react"
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
  const token = Cookie.get("token");

  useEffect(() => {
    fetch("http://localhost:1337/products")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log(data)
        setProducts(data)
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:1337/users/me?populate=role", { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response: any) => {
        return response // .json()
      })
      .then((data) => {
        console.log(data)
      })
  }, [token])

  return (
    <div className="container">
      <div className="row mb-3">
        <h1>Products</h1>

        {products.map((product: Props) => (
          <div className="col-12 col-sm-6 col-md-4" key={product.id}>
            <a className="card-link" href={`/product/${product.slug}`}>
              <div className="card">
                <div
                  className="card-img-top"
                  style={{
                    backgroundImage: `url(http://localhost:1337${product.image.url})`,
                  }}
                ></div>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
