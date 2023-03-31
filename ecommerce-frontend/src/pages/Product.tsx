import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { getProducts } from "../utils/api"

type Props = {
  id?: number
  slug?: string
  image?: string
  name?: string
  title?: string
  description?: string
}

function Home() {
  const [product, setProduct] = useState<any>([]);

  useEffect(() => {
    fetch("http://localhost:1337/products?slug=product-1")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setProduct(data);
      })
  }, []);

  return (
    <div className="container">
       <div className="row mb-3">

        {product.map((product: Props) => (
          <div className="col-12 col-sm-6 col-md-4" key={product.id}>
            {product.title}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;