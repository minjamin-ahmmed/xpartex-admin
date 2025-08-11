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

const initialNews = [
  {
    id: 1,
    title: "New Feature Released",
    author: "Admin",
    date: "2025-08-10",
    status: "Published",
  },
  {
    id: 2,
    title: "Maintenance Scheduled",
    author: "Support",
    date: "2025-08-05",
    status: "Draft",
  },
];


const PAGE_SIZE = 5;

const NewsPage = () => {
  const [news, setNews] = useState(initialNews);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // Filtering and searching
  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.author.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / PAGE_SIZE);
  const paginatedNews = filteredNews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: number) => {
    setNews((prev) => prev.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  const handleEdit = (id: number) => {
    alert(`Edit news with id: ${id}`);
    setOpenMenu(null);
  };

  // Summary cards
  const totalNews = news.length;
  const publishedNews = news.filter((n) => n.status === "Published").length;
  const draftNews = news.filter((n) => n.status === "Draft").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">News</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Total News</span>
          <span className="text-3xl font-bold text-blue-600">{totalNews}</span>
        </div>
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Published</span>
          <span className="text-3xl font-bold text-green-600">{publishedNews}</span>
        </div>
        <div className="rounded-xl bg-white shadow p-5 flex flex-col items-center border border-gray-100">
          <span className="text-lg font-semibold">Draft</span>
          <span className="text-3xl font-bold text-yellow-600">{draftNews}</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search news..."
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
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Filter</button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow border border-gray-100 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedNews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">No news found.</TableCell>
              </TableRow>
            ) : (
              paginatedNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {item.status}
                    </span>
                  </TableCell>
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

export default NewsPage;
