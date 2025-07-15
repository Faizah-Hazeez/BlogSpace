// components/columns.js
"use client";

export const columns = [
  {
    accessorKey: "createdAt",
    header: "Time",
  },
  {
    accessorKey: "name",
    header: "Author",
  },
  {
    accessorKey: "isApproved",
    header: "Status",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "content",
    header: "Comment",
  },
];
