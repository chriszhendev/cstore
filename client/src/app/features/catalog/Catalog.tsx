import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { Product } from "../../models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
