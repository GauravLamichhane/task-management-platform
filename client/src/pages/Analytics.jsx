import { useState, useEffect } from "react";
import taskService from "../services/taskService";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await taskService.getSummary();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loader size="large" text="Loading analytics..." />
      </div>
    );
  }

  const stats = [
    {
      label: "Total Tasks",
      value: summary?.total_tasks || 0,
      color: "bg-blue-500",
      icon: "📋",
    },
    {
      label: "Completed",
      value: summary?.completed || 0,
      color: "bg-green-500",
      icon: "✅",
    },
    {
      label: "Pending",
      value: summary?.pending || 0,
      color: "bg-yellow-500",
      icon: "⏳",
    },
    {
      label: "High Priority",
      value: summary?.high_priority || 0,
      color: "bg-red-500",
      icon: "🔥",
    },
    {
      label: "Medium Priority",
      value: summary?.medium_priority || 0,
      color: "bg-orange-500",
      icon: "⚡",
    },
    {
      label: "Low Priority",
      value: summary?.low_priority || 0,
      color: "bg-green-500",
      icon: "🌱",
    },
  ];

  const completionRate =
    summary?.total_tasks > 0
      ? ((summary.completed / summary.total_tasks) * 100).toFixed(1)
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div
                className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}
              >
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Completion Rate */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Completion Rate</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className="bg-green-500 h-6 rounded-full transition-all duration-500 flex items-center justify-center text-white text-sm font-medium"
                style={{ width: `${completionRate}%` }}
              >
                {completionRate > 10 && `${completionRate}%`}
              </div>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            {completionRate}%
          </span>
        </div>
        <p className="text-gray-600 mt-2">
          {summary?.completed} out of {summary?.total_tasks} tasks completed
        </p>
      </Card>

      {/* Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Status Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Pending</span>
              <span className="text-2xl font-bold text-blue-600">
                {summary?.pending || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Completed</span>
              <span className="text-2xl font-bold text-green-600">
                {summary?.completed || 0}
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Priority Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="font-medium">High Priority</span>
              <span className="text-2xl font-bold text-red-600">
                {summary?.high_priority || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">Medium Priority</span>
              <span className="text-2xl font-bold text-yellow-600">
                {summary?.medium_priority || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Low Priority</span>
              <span className="text-2xl font-bold text-green-600">
                {summary?.low_priority || 0}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
