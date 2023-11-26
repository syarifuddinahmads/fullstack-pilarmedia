'use client'
import { useEffect, useState } from "react";
import { Product } from "@/lib/type";
import Api from "@/lib/axios";
import Header from "@/components/header.components";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Products = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; 

    if (!session) {
      router.replace('/login');
    }
  }, [session, status, router]);

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    product_id:0,
    product_name: "",
    product_description: "",
    product_price: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await Api.getProducts();
      console.table(response.data);
      setProducts(response.data.data);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await Api.createProduct(newProduct);
      clearForm();
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await Api.deleteProduct(productId);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(false);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setNewProduct({
      product_id:product.product_id,
      product_name: product.product_name,
      product_description: product.product_description,
      product_price: Number(product.product_price),
    });
  };

  const handleUpdateProduct = async () => {
    try {
      if (selectedProduct) {
        await Api.updateProduct({
          product_id: selectedProduct.product_id,
          product_name: newProduct.product_name,
          product_description: newProduct.product_description,
          product_price: newProduct.product_price,
          sales: []
        });
        setIsEditing(false);
        clearForm();
        fetchProducts();
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    clearForm();
  };

  const clearForm = () => {
    setNewProduct({
      product_id:0,
      product_name: "",
      product_description: "",
      product_price: 0,
    });
  };

  return (
    <div>
       <Header/>
      <h1>Product Page</h1>
      <div>
        <h2>Create New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.product_name}
          onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={newProduct.product_description}
          onChange={(e) => setNewProduct({ ...newProduct, product_description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.product_price}
          onChange={(e) => setNewProduct({ ...newProduct, product_price: +e.target.value })}
        />
        {isEditing ? (
          <>
            <button onClick={handleUpdateProduct}>Update Product</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleCreateProduct}>Create Product</button>
        )}
      </div>
      <div>
        <h2>Product List</h2>
        <ul>
          {Array.isArray(products) &&
            products.map((product) => (
              <li key={product.product_id}>
                {product.product_name} - {product.product_description} - ${product.product_price}
                <button onClick={() => handleDeleteProduct(product.product_id)}>Delete</button>
                <button onClick={() => handleViewDetails(product)}>View Details</button>
                <button onClick={() => handleEditProduct(product)}>Edit</button>
              </li>
            ))}
        </ul>
      </div>
      {selectedProduct && (
        <div>
          <h2>Product Details</h2>
          <p>Name: {selectedProduct.product_name}</p>
          <p>Description: {selectedProduct.product_description}</p>
          <p>Price: ${selectedProduct.product_price}</p>
        </div>
      )}
    </div>
  );
};

export default Products;
