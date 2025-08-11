"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  customerName: string;
  orderDate: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  shippingStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

const AddNewOrder: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      paymentStatus: "Pending",
      shippingStatus: "Processing",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert("Order created!\n" + JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div className="max-w-xl rounded bg-white p-6 shadow dark:bg-gray-800">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Add New Order
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Name */}
        <div>
          <label
            htmlFor="customerName"
            className="mb-1 block font-medium text-gray-700 dark:text-gray-300"
          >
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            id="customerName"
            {...register("customerName", {
              required: "Customer name is required",
            })}
            className={`w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.customerName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter customer name"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.customerName.message}
            </p>
          )}
        </div>

        {/* Order Date */}
        <div>
          <label
            htmlFor="orderDate"
            className="mb-1 block font-medium text-gray-700 dark:text-gray-300"
          >
            Order Date <span className="text-red-500">*</span>
          </label>
          <input
            id="orderDate"
            type="date"
            {...register("orderDate", { required: "Order date is required" })}
            className={`w-full rounded border px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
              errors.orderDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.orderDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.orderDate.message}
            </p>
          )}
        </div>

        {/* Payment Status */}
        <div>
          <label
            htmlFor="paymentStatus"
            className="mb-1 block font-medium text-gray-700 dark:text-gray-300"
          >
            Payment Status
          </label>
          <select
            id="paymentStatus"
            {...register("paymentStatus")}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Shipping Status */}
        <div>
          <label
            htmlFor="shippingStatus"
            className="mb-1 block font-medium text-gray-700 dark:text-gray-300"
          >
            Shipping Status
          </label>
          <select
            id="shippingStatus"
            {...register("shippingStatus")}
            className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="hover:bg-primary-dark w-full rounded bg-primary px-6 py-3 text-lg font-semibold text-white disabled:opacity-60"
        >
          Add New Order
        </button>
      </form>
    </div>
  );
};

export default AddNewOrder;
