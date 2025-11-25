import { Link } from "react-router-dom";
import { PRIORITY_COLORS, STATUS_COLORS } from "../../utils/constants";
import Button from "../common/Button";

const TaskCard = ({ task, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              STATUS_COLORS[task.status]
            }`}
          >
            {task.status}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              PRIORITY_COLORS[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>

      <div className="text-sm text-gray-500 mb-4">
        <p>Created: {formatDate(task.created_at)}</p>
        <p>Updated: {formatDate(task.updated_at)}</p>
      </div>

      <div className="flex gap-2">
        <Link to={`/tasks/edit/${task.id}`} className="flex-1">
          <Button variant="primary" className="w-full">
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          onClick={() => onDelete(task.id)}
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
