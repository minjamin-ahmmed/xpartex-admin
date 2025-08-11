"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const initialFreelancers = [
  {
    id: 1,
    name: "John Doe",
    active: true,
    field: "Web Development",
    done: 12,
    inProgress: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    active: false,
    field: "Graphic Design",
    done: 8,
    inProgress: 1,
  },
];


const PAGE_SIZE = 5;

const FreelancersPage = () => {
  const [freelancers, setFreelancers] = useState(initialFreelancers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // Filtering and searching
  const filteredFreelancers = freelancers.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.field.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || (filter === "Active" && item.active) || (filter === "Inactive" && !item.active);
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredFreelancers.length / PAGE_SIZE);
  const paginatedFreelancers = filteredFreelancers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: number) => {
    setFreelancers((prev) => prev.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  const handleEdit = (id: number) => {
    alert(`Edit freelancer with id: ${id}`);
    setOpenMenu(null);
  };

  // Summary cards
  const totalFreelancers = freelancers.length;
  const activeFreelancers = freelancers.filter((f) => f.active).length;
  const inactiveFreelancers = freelancers.filter((f) => !f.active).length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Freelancers</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Total Freelancers</span>
          <span className="text-3xl font-bold text-blue-600">{totalFreelancers}</span>
        </div>
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Active</span>
          <span className="text-3xl font-bold text-green-600">{activeFreelancers}</span>
        </div>
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Inactive</span>
          <span className="text-3xl font-bold text-red-600">{inactiveFreelancers}</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search freelancers..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="border rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Filter</button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow border border-gray-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Name</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Done</TableHead>
              <TableHead>In Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFreelancers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">No freelancers found.</TableCell>
              </TableRow>
            ) : (
              paginatedFreelancers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.active ? "Yes" : "No"}
                    </span>
                  </TableCell>
                  <TableCell>{item.field}</TableCell>
                  <TableCell>{item.done}</TableCell>
                  <TableCell>{item.inProgress}</TableCell>
                  <TableCell className="text-right relative">
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><circle cx="4" cy="10" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="16" cy="10" r="2"/></svg>
                    </button>
                    {openMenu === item.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleEdit(item.id)}
                        >Edit</button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          onClick={() => handleDelete(item.id)}
                        >Delete</button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >Prev</button>
        <span className="font-medium">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >Next</button>
      </div>
    </div>
  );
};

export default FreelancersPage;
