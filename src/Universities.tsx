import React, { useState, useEffect } from "react";
import Filter, { FilterField } from "./Filter";
import Alert from "./Alert";

const mockData = [
  {
    name: "Oxford University",
    year: "1096",
    region: "West",
    foundedAfter: "1000-01-01",
    corpora: ["Corpus A", "Corpus B", "Corpus C"],
  },
  {
    name: "Stanford University",
    year: "1885",
    region: "West",
    foundedAfter: "1800-01-01",
    corpora: ["Corpus X", "Corpus Y"],
  },
];

function Universities() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [data, setData] = useState<typeof mockData>([]);
  const [selectedCorpora, setSelectedCorpora] = useState<string[] | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);

  const fields: readonly FilterField[] = [
    { type: "text", label: "University Name", name: "name" },
    { type: "number", label: "Established Year", name: "year" },
    { type: "date", label: "Founded After", name: "foundedAfter" },
    {
      type: "select",
      label: "Region",
      name: "region",
      options: ["North", "South", "West"] as const,
    },
  ];

  const filterData = (query: Record<string, string>) => {
    const filtered = mockData.filter((u) => {
      return Object.entries(query).every(([key, value]) => {
        if (!value) return true;
        if (key === "name")
          return u.name.toLowerCase().includes(value.toLowerCase());
        if (key === "year") return u.year === value;
        if (key === "region") return u.region === value;
        if (key === "foundedAfter") return u.foundedAfter >= value;
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
      <h3>Universities</h3>
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
            <th>Year</th>
            <th>Region</th>
            <th>Corpus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((uni, idx) => (
            <tr key={idx}>
              <td>{uni.name}</td>
              <td>{uni.year}</td>
              <td>{uni.region}</td>
              <td>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => setSelectedCorpora(uni.corpora)}
                >
                  <i className="bi bi-eye"></i>
                </button>
              </td>
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

      {selectedCorpora && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Corpora List</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedCorpora(null)}
                ></button>
              </div>
              <div className="modal-body">
                <ul>
                  {selectedCorpora.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedCorpora(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAlert && (
        <Alert
          message="Are you sure you want to delete this university?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Universities;
