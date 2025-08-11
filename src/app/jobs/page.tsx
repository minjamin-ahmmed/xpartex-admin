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

const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    status: "Open",
    posted: "2025-08-01",
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    status: "Closed",
    posted: "2025-07-15",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    status: "Open",
    posted: "2025-07-20",
  },
];


const PAGE_SIZE = 5;

const JobsPage = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // Filtering and searching
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || job.department.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || job.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);
  const paginatedJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    setOpenMenu(null);
  };

  const handleEdit = (id: number) => {
    alert(`Edit job with id: ${id}`);
    setOpenMenu(null);
  };

  // Summary cards
  const totalJobs = jobs.length;
  const openJobs = jobs.filter((j) => j.status === "Open").length;
  const closedJobs = jobs.filter((j) => j.status === "Closed").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Total Jobs</span>
          <span className="text-3xl font-bold text-blue-600">{totalJobs}</span>
        </div>
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Open</span>
          <span className="text-3xl font-bold text-green-600">{openJobs}</span>
        </div>
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Closed</span>
          <span className="text-3xl font-bold text-red-600">{closedJobs}</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
            className="border rounded-lg px-3 py-2 focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Filter</button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow border border-gray-100 overflow-x-auto overflow-visible">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">No jobs found.</TableCell>
              </TableRow>
            ) : (
              paginatedJobs.map((job) => (
                <TableRow key={job.id} className="overflow-visible">
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${job.status === "Open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell>{job.posted}</TableCell>
                  <TableCell className="text-right relative overflow-visible">
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><circle cx="4" cy="10" r="2"/><circle cx="10" cy="10" r="2"/><circle cx="16" cy="10" r="2"/></svg>
                    </button>
                    {openMenu === job.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => handleEdit(job.id)}
                        >Edit</button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          onClick={() => handleDelete(job.id)}
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

export default JobsPage;
