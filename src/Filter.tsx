export type FilterField = {
  type: "text" | "number" | "select" | "date";
  label: string;
  name: string;
  options?: readonly string[];
};

export type FilterProps = {
  fields: readonly FilterField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onClear: () => void;
};

const Filter: React.FC<FilterProps> = ({
  fields,
  values,
  onChange,
  onClear,
}) => {
  return (
    <form className="row g-3 mb-4">
      {fields.map((field) => (
        <div className="col-auto" key={field.name}>
          {field.type === "select" ? (
            <select
              className="form-select"
              value={values[field.name] || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
            >
              <option value="">-- {field.label} --</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              className="form-control"
              placeholder={field.label}
              value={values[field.name] || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}
      <div className="col-auto">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default Filter;
