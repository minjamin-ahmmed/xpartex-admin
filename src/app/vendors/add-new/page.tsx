"use client";
import React from "react";
import { useForm } from "react-hook-form";

type VendorStatus = "active" | "inactive" | "pending";

interface VendorForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: VendorStatus;
  avatarUrl?: string;
}

const AddVendorPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VendorForm>({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
      status: "active",
      avatarUrl: "",
    },
  });

  const onSubmit = async (data: VendorForm) => {
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));
      console.log("New Vendor data:", data);
      alert("Vendor added successfully!");
      reset();
    } catch {
      alert("Failed to add vendor. Try again.");
    }
  };

  return (
    <div className="max-w-xl rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h1 className="mb-6 text-2xl font-bold text-dark dark:text-white">
        Add New Vendor
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Vendor ID */}
        <div className="mb-5">
          <label
            htmlFor="id"
            className="mb-1 block font-semibold text-dark dark:text-white"
          >
            Vendor ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="id"
            {...register("id", { required: "Vendor ID is required" })}
            className={`w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:text-white ${
              errors.id
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter vendor ID"
            disabled={isSubmitting}
          />
          {errors.id && (
            <p className="mt-1 text-sm text-red-500">{errors.id.message}</p>
          )}
        </div>

        {/* Name */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-1 block font-semibold text-dark dark:text-white"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className={`w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:text-white ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter vendor name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-1 block font-semibold text-dark dark:text-white"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email format",
              },
            })}
            className={`w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:text-white ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter vendor email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="mb-1 block font-semibold text-dark dark:text-white"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?[\d\s\-()]{7,15}$/,
                message: "Invalid phone number format",
              },
            })}
            className={`w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:text-white ${
              errors.phone
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="+1 (555) 123-4567"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Avatar URL */}
        <div className="mb-5">
          <label
            htmlFor="avatarUrl"
            className="mb-1 block font-semibold text-dark dark:text-white"
          >
            Avatar URL (optional)
          </label>
          <input
            type="url"
            id="avatarUrl"
            {...register("avatarUrl", {
              pattern: {
                value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
                message: "Invalid URL format",
              },
            })}
            className={`w-full rounded-md border px-4 py-2 dark:bg-gray-800 dark:text-white ${
              errors.avatarUrl
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="https://example.com/avatar.jpg"
            disabled={isSubmitting}
          />
          {errors.avatarUrl && (
            <p className="mt-1 text-sm text-red-500">
              {errors.avatarUrl.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div className="mb-6">
          <label
            htmlFor="status"
            className="mb-1 block font-semibold text-dark dark:text-white"
          >
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            disabled={isSubmitting}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-md py-3 font-semibold text-white transition-colors ${
            isSubmitting
              ? "cursor-not-allowed bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Vendor"}
        </button>
      </form>
    </div>
  );
};

export default AddVendorPage;
