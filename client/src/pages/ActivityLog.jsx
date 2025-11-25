import { useState, useEffect } from "react";
import auditService from "../services/auditService";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import Pagination from "../components/tasks/Pagination";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await auditService.getLogs({ page: currentPage });
        setLogs(response.results);
        setPagination({
          count: response.count,
          next: response.next,
          previous: response.previous,
        });
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [currentPage]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionColor = (action) => {
    if (action.includes("Created")) return "bg-green-100 text-green-800";
    if (action.includes("Updated")) return "bg-blue-100 text-blue-800";
    if (action.includes("Deleted")) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const getActionIcon = (action) => {
    if (action.includes("Created")) return "➕";
    if (action.includes("Updated")) return "✏️";
    if (action.includes("Deleted")) return "🗑️";
    return "📝";
  };

  const totalPages = Math.ceil(pagination.count / 20);

  if (loading && logs.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loader size="large" text="Loading activity logs..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Activity Log</h1>

      {logs.length === 0 ? (
        <Card>
          <p className="text-gray-600 text-center py-8">
            No activity logs found
          </p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {logs.map((log) => (
              <Card key={log.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{getActionIcon(log.action)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getActionColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(log.timestamp)}
                      </span>
                    </div>

                    <div className="text-gray-700 mt-2">
                      <p className="font-medium">
                        User:{" "}
                        <span className="text-blue-600">{log.user_email}</span>
                      </p>
                      {log.task_title && (
                        <p className="font-medium">
                          Task:{" "}
                          <span className="text-gray-800">
                            {log.task_title}
                          </span>
                        </p>
                      )}
                    </div>

                    {log.changed_data && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                          View Details
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-50 rounded text-xs overflow-x-auto">
                          {(() => {
                            try {
                              // Try to parse if it's a JSON string
                              const parsed =
                                typeof log.changed_data === "string"
                                  ? JSON.parse(log.changed_data)
                                  : log.changed_data;
                              return JSON.stringify(parsed, null, 2);
                            } catch (err) {
                              // If parsing fails, log and show the raw data
                              console.error(
                                "Failed parsing changed_data:",
                                err
                              );
                              return log.changed_data;
                            }
                          })()}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ActivityLog;
