import { STATUS_CHOICES, PRIORITY_CHOICES } from "../../utils/constants";
import Input from "../common/Input";
import Button from "../common/Button";

const TaskFilters = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="-mb-4">
          <Input
            label="Search"
            type="text"
            name="search"
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            placeholder="Search by title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">All Status</option>
            {STATUS_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            name="priority"
            value={filters.priority}
            onChange={(e) => onFilterChange("priority", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">All Priorities</option>
            {PRIORITY_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button variant="outline" onClick={onReset} className="w-full h-10">
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
