import React from "react";
import { Users, CheckCircle, XCircle, Clock } from "lucide-react";

type ColorType = "green" | "red" | "yellow" | "blue";

const colorClasses: Record<ColorType, string> = {
  green: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900",
  red: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900",
  yellow:
    "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900",
  blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900",
};

const VendorStatsCard: React.FC = () => {
  const stats: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: ColorType;
  }[] = [
    {
      title: "Total Vendors",
      value: 20,
      icon: <Users className="h-6 w-6" />,
      color: "blue",
    },
    {
      title: "Active Vendors",
      value: 12,
      icon: <CheckCircle className="h-6 w-6" />,
      color: "green",
    },
    {
      title: "Inactive Vendors",
      value: 5,
      icon: <XCircle className="h-6 w-6" />,
      color: "red",
    },
    {
      title: "Pending Vendors",
      value: 3,
      icon: <Clock className="h-6 w-6" />,
      color: "yellow",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {stats.map(({ title, value, icon, color }) => (
        <div
          key={title}
          className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClasses[color]}`}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p
              className={`mt-1 text-3xl font-semibold ${colorClasses[color]
                .split(" ")
                .filter((c) => c.startsWith("text-"))
                .join(" ")}`}
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorStatsCard;
