"use client";
import React, { useState } from "react";

type VendorStatus = "active" | "inactive" | "pending";

interface VendorForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: VendorStatus;
  avatarUrl: string;
}

const initialForm: VendorForm = {
  id: "",
  name: "",
  email: "",
  phone: "",
  status: "active",
  avatarUrl: "",
};

const AddVendorPage: React.FC = () => {
  const [form, setForm] = useState<VendorForm>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof VendorForm, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof VendorForm, string>> = {};

    if (!form.id.trim()) newErrors.id = "Vendor ID is required";
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone))
      newErrors.phone = "Invalid phone number format";

    // avatarUrl optional, but if provided, validate URL format
    if (form.avatarUrl.trim()) {
      try {
        new URL(form.avatarUrl);
      } catch {
        newErrors.avatarUrl = "Invalid URL format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Clear error on input change for that field
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate async submission e.g. API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("New Vendor data:", form);

      alert("Vendor added successfully!");

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      alert("Failed to add vendor. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h1 className="mb-6 text-2xl font-bold text-dark dark:text-white">
        Add New Vendor
      </h1>

      <form onSubmit={handleSubmit} noValidate>
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
            name="id"
            id="id"
            value={form.id}
            onChange={handleChange}
            className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.id ? "border-red-500" : ""
            }`}
            placeholder="Enter vendor ID"
            disabled={isSubmitting}
          />
          {errors.id && (
            <p className="mt-1 text-sm text-red-500">{errors.id}</p>
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
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Enter vendor name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
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
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter vendor email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
            name="phone"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="+1 (555) 123-4567"
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
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
            name="avatarUrl"
            id="avatarUrl"
            value={form.avatarUrl}
            onChange={handleChange}
            className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${
              errors.avatarUrl ? "border-red-500" : ""
            }`}
            placeholder="https://example.com/avatar.jpg"
            disabled={isSubmitting}
          />
          {errors.avatarUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.avatarUrl}</p>
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
            name="status"
            id="status"
            value={form.status}
            onChange={handleChange}
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
