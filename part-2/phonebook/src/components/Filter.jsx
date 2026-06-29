const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={filter} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default Filter;
