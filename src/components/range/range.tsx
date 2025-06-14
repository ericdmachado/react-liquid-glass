export function Range({
  defaultValue,
  onChange,
}: {
  defaultValue?: number;
  onChange: (value: string) => void;
}) {
  return (
    <div className="range">
      <div className="text">{defaultValue?.toFixed(0)}</div>
      <input
        type="range"
        className="range"
        min="0"
        max="100"
        defaultValue={defaultValue}
        onChange={(e) => {
          const value = e.target.value;
          onChange(value);
        }}
      />
    </div>
  );
}
