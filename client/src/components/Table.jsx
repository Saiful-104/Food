// src/components/Table.jsx
import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const Table = ({ 
  columns, 
  data, 
  onSort, 
  sortField, 
  sortOrder,
  onEdit,
  onDelete,
  onView,
  actions = true 
}) => {
  const renderSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-neutral-400" />;
    return sortOrder === 'asc' ? 
      <FaSortUp className="text-primary-500" /> : 
      <FaSortDown className="text-primary-500" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-700">
            {columns.map((column) => (
              <th
                key={column.key}
                className="text-left py-4 px-4 font-semibold text-sm"
              >
                {column.sortable ? (
                  <button
                    onClick={() => onSort(column.key)}
                    className="flex items-center space-x-1 hover:text-primary-500"
                  >
                    <span>{column.label}</span>
                    {renderSortIcon(column.key)}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
            {actions && <th className="text-left py-4 px-4 font-semibold text-sm">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row._id || index}
              className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
            >
              {columns.map((column) => (
                <td key={column.key} className="py-4 px-4">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {actions && (
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors text-blue-500"
                        title="View"
                      >
                        <FaEye />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors text-green-500"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors text-red-500"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;