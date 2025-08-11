import React from "react";
import { Box, CheckCircle, XCircle, Tag } from "lucide-react";

interface Stat {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
}

const ProductCard: React.FC = () => {
  // Replace these with your real data
  const stats: Stat[] = [
    {
      title: "Total Products",
      value: 120,
      icon: <Box size={24} />,
      bgColor: "bg-indigo-600",
    },
    {
      title: "In Stock",
      value: 90,
      icon: <CheckCircle size={24} />,
      bgColor: "bg-green-600",
    },
    {
      title: "Out of Stock",
      value: 30,
      icon: <XCircle size={24} />,
      bgColor: "bg-red-600",
    },
    {
      title: "Categories",
      value: 8,
      icon: <Tag size={24} />,
      bgColor: "bg-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-4">
      {stats.map(({ title, value, icon, bgColor }) => (
        <div
          key={title}
          className="flex items-center space-x-4 rounded bg-white p-5 shadow"
        >
          <div className={`rounded-full p-3 text-white ${bgColor}`}>{icon}</div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
