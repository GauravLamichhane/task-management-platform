import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import taskService from "../../services/taskService";
import TaskCard from "../../components/tasks/TaskCard";
import TaskFilters from "../../components/tasks/TaskFilters";
import Pagination from "../../components/tasks/Pagination";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    page: 1,
  });
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: filters.page,
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
      };

      const response = await taskService.getTasks(params);
      setTasks(response.results);
      setPagination({
        count: response.count,
        next: response.next,
        previous: response.previous,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
      page: 1, // Reset to first page on filter change
    });
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      status: "",
      priority: "",
      page: 1,
    });
  };

  const handlePageChange = (page) => {
    setFilters({
      ...filters,
      page,
    });
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task");
      }
    }
  };

  const totalPages = Math.ceil(pagination.count / 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
        <Link to="/tasks/create">
          <Button variant="primary">+ Create New Task</Button>
        </Link>
      </div>

      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {loading ? (
        <Loader size="large" text="Loading tasks..." />
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No tasks found</p>
          <Link to="/tasks/create">
            <Button variant="primary">Create Your First Task</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
