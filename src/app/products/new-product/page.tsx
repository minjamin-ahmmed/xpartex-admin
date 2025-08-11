"use client";

import React from "react";
import { useForm } from "react-hook-form";

type ProductFormValues = {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "available" | "out_of_stock" | "discontinued";
};

const AddNewProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      status: "available",
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    const newProduct = {
      id: Date.now(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    console.log("Product added:", newProduct);
    alert(`Product "${data.name}" added successfully!`);

    reset(); // reset form after submit
  };

  return (
    <div className="max-w-md rounded bg-white p-6 shadow dark:bg-gray-800">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
            Product Name
          </label>
          <input
            {...register("name", { required: "Product name is required" })}
            className={`w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <input
            {...register("category", { required: "Category is required" })}
            className={`w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
            Price ($)
          </label>
          <input
            type="number"
            step={0.01}
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
            className={`w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
            Stock Quantity
          </label>
          <input
            type="number"
            {...register("stock", {
              required: "Stock is required",
              min: { value: 0, message: "Stock cannot be negative" },
            })}
            className={`w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.stock ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-500">{errors.stock.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="mb-1 block font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="available">Available</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>

        <button
          type="submit"
          className="hover:bg-primary-dark w-full rounded bg-primary px-6 py-2 font-medium text-white"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
