import React from "react";
import { ArrowUpRight } from "lucide-react";
import cash from "../../assets/cash.svg";
import ticket from "../../assets/ticket.svg";
import user from "../../assets/user.svg";

const DashboardCards = () => {
  const cards = [
    {
      icon:  <img src={user} alt="Total Users Icon" className="w-10 h-10" />,
      title: "Total Users",
      value: "980",
      subInfo: [
        { label: "Active Users", value: "456" },
        { label: "New Sign-Ups per Month", value: "554" },
      ],
    },
    {
      icon:  <img src={ticket} alt="Total Users Icon" className="w-10 h-10" />,
      title: "Total Receipts Processed",
      value: "10,000/month",
      trend: "+6.8%",
      trendColor: "text-green-500",
    },
    {
      icon: <img src={cash} alt="Total Users Icon" className="w-10 h-10" />,
      title: "Total Expenses Tracked",
      value: "$15,000",
      subInfo: [{ label: "Compared to (20 receipts last month)" }],
      trend: "+2.3%",
      trendColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{card.icon}</span>
            <h3 className="text-gray-600 font-semibold">{card.title}</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          {card.subInfo && (
            <div className="mt-3 border-t pt-3 text-gray-600 text-sm">
              {card.subInfo.map((info, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{info.label}</span>
                  {info.value && <span className="font-semibold text-gray-900">{info.value}</span>}
                </div>
              ))}
            </div>
          )}
          {card.trend && (
            <div className={`mt-2 flex items-center ${card.trendColor}`}>
              <ArrowUpRight size={16} className="mr-1" />
              <span>{card.trend}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
