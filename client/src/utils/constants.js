// Application constants

export const STATUS_CHOICES = [
  { value: "Pending", label: "Pending" },
  { value: "Completed", label: "Completed" },
];

export const PRIORITY_CHOICES = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const PRIORITY_COLORS = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};

export const STATUS_COLORS = {
  Pending: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
};
