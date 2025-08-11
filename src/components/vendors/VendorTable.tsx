import { SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  avatarUrl?: string;
}

const vendors: Vendor[] = [
  {
    id: "V001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    avatarUrl: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: "V002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    status: "pending",
    avatarUrl: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: "V003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 555-5555",
    status: "inactive",
    avatarUrl: "https://i.pravatar.cc/40?img=3",
  },
];

const VendorTable: React.FC = () => {
  return (
    <div className="grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
          Vendor Management
        </h2>
        <Link href={"/vendors/add-new"}>
          <button className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90 dark:bg-primary dark:text-white">
            + Add New Vendor
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-800">
            <tr className="text-center uppercase text-gray-600 dark:text-gray-300 [&>th]:text-center">
              <th className="min-w-[100px] border-b border-gray-200 px-4 py-3 !text-left dark:border-gray-700">
                SL No
              </th>
              <th className="min-w-[100px] border-b border-gray-200 px-4 py-3 !text-left dark:border-gray-700">
                Vendor ID
              </th>
              <th className="min-w-[180px] border-b border-gray-200 px-4 py-3 !text-left dark:border-gray-700">
                Name
              </th>
              <th className="min-w-[150px] border-b border-gray-200 px-4 py-3 !text-left dark:border-gray-700">
                Email
              </th>
              <th className="min-w-[130px] border-b border-gray-200 px-4 py-3 !text-left dark:border-gray-700">
                Phone
              </th>
              <th className="min-w-[100px] border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                Status
              </th>
              <th className="min-w-[140px] border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor, idx) => (
              <tr
                key={vendor.id}
                className={`text-center text-base font-medium text-dark transition-colors duration-300 dark:text-white ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                  1
                </td>
                <td className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                  {vendor.id}
                </td>

                <td className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                  <img
                    src={vendor.avatarUrl ?? "/default-avatar.png"}
                    alt={`${vendor.name} avatar`}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span>{vendor.name}</span>
                </td>

                <td className="max-w-xs truncate border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                  {vendor.email}
                </td>

                <td className="border-b border-gray-200 px-4 py-3 text-left dark:border-gray-700">
                  {vendor.phone}
                </td>

                <td className="border-b border-gray-200 px-4 py-3 capitalize dark:border-gray-700">
                  <span
                    className={`inline-block rounded px-2 py-1 text-sm font-semibold ${
                      vendor.status === "active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400"
                        : vendor.status === "inactive"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>

                <td className="flex items-center justify-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                  <button className="hover:text-primary-dark text-primary transition-colors">
                    <SquarePen size={20} />
                  </button>
                  <button className="text-red-600 transition-colors hover:text-red-800">
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <td
                colSpan={6}
                className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Total Vendors:{" "}
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-blue-800 dark:bg-blue-900 dark:text-blue-400">
                  {vendors.length}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default VendorTable;
