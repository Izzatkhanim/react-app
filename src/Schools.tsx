import React, { useState, useEffect } from "react";
import Filter, { FilterField } from "./Filter";
import Alert from "./Alert";

const mockData = [
  { name: "Sunrise School", openedAfter: "2010-01-01", region: "North" },
  { name: "Hilltop School", openedAfter: "2005-06-15", region: "South" },
];

function Schools() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [data, setData] = useState<typeof mockData>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  const fields: readonly FilterField[] = [
    { type: "text", label: "School Name", name: "name" },
    { type: "date", label: "Opened After", name: "openedAfter" },
    {
      type: "select",
      label: "Region",
      name: "region",
      options: ["North", "South", "West"] as const,
    },
  ];

  const filterData = (query: Record<string, string>) => {
    const filtered = mockData.filter((s) => {
      return Object.entries(query).every(([key, value]) => {
        if (!value) return true;
        if (key === "name")
          return s.name.toLowerCase().includes(value.toLowerCase());
        if (key === "region") return s.region === value;
        if (key === "openedAfter") return s.openedAfter >= value;
        return true;
      });
    });
    setData(filtered);
  };

  const handleChange = (name: string, value: string) => {
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    filterData(updated);
  };

  const handleClear = () => {
    setFilters({});
    filterData({});
  };

  const handleDelete = (index: number) => {
    setPendingDelete(index);
    setShowAlert(true);
  };

  const confirmDelete = () => {
    if (pendingDelete !== null) {
      const newData = [...data];
      newData.splice(pendingDelete, 1);
      setData(newData);
    }
    setShowAlert(false);
    setPendingDelete(null);
  };

  const cancelDelete = () => {
    setShowAlert(false);
    setPendingDelete(null);
  };

  useEffect(() => {
    filterData({});
  }, []);

  return (
    <div>
      <h3>Schools</h3>
      <Filter
        fields={fields}
        values={filters}
        onChange={handleChange}
        onClear={handleClear}
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Opened After</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, idx) => (
            <tr key={idx}>
              <td>{s.name}</td>
              <td>{s.openedAfter}</td>
              <td>{s.region}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(idx)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAlert && (
        <Alert
          message="Are you sure you want to delete this school?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Schools;
