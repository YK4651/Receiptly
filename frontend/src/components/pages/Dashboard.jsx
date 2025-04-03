import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../common/DateRangePicker";
import { fetchReceipts } from "../../api/receipts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import LineChart from "./Reports/Charts/LineChart";
import DoughnutChart from "./Reports/Charts/DoughnutChart";
import GaugeChart from "./Reports/Charts/GaugeChart";
import BarChart from "./Reports/Charts/BarChart";
import HelpToolTip from "../common/HelpToolTip";
import {
  burnRateMessage,
  runwayMessage,
  grossMarginMessage,
} from "../common/ToolTipMessage";
import GetStartedBanner from "../common/GetStartedBanner";
import DashboardCards from "../common/DashboardCards";
import Button from "../common/Button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Dashboard = () => {
  const [showGetStarted, setShowGetStarted] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Financial");
  const navigate = useNavigate();

  const handleSkip = () => {
    setShowGetStarted(false);
  };

  const handleCompleteProfile = () => {
    navigate("/settings");
  };

  const categoryCharts = {
    Financial: [
      { title: "Runway", component: <GaugeChart />, message: runwayMessage() },
      {
        title: "Gross Margin",
        component: <DoughnutChart />,
        message: grossMarginMessage(),
      },
      {
        title: "Burn Rate",
        component: <LineChart />,
        message: burnRateMessage(),
      },
    ],
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="flex items-center justify-between pb-0">
        {/* <span className="text-gray-600 text-lg">{currentDate}</span> */}
        <DateRangePicker />
        <Button to="/receipts" style={{
          backgroundColor: "#2E39E6",
          border: "1px solid #2E39E6",
          marginBottom: "2rem",
          float: "right",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = "#2E39E6";
          e.target.style.borderColor = "#2E39E6";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#2E39E6";
          e.target.style.color = "white"; 
          e.target.style.borderColor = "#2E39E6";
        }}>Upload New Receipt</Button>
      </div>
      {showGetStarted && (
        <GetStartedBanner
          onSkip={handleSkip}
          onCompleteProfile={handleCompleteProfile}
        />
      )}
      <DashboardCards />
      <div id="report-container" className="p-4 bg-white w-full">
        <div className="grid grid-cols-2 gap-4">
          {categoryCharts[selectedCategory]?.map((chart, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-xl ${
                chart.component.type === BarChart ? "col-span-2" : ""
              } ${chart.component.type === LineChart ? "col-span-2" : ""}`}
            >
              <h3 className="text-md bg-gray-200/40 p-3 pl-6">
                <span className="align-[4px]">{chart.title}</span>
                <HelpToolTip message={`${chart.message}`} />
              </h3>
              <div className="px-4 py-8">{chart.component}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;