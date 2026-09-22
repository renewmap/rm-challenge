interface CheckboxOptionProps<T extends string> {
  checked: boolean
  label: string
  value: T
  onToggle: (value: T) => void
}

export function CheckboxOption<T extends string>({
  checked,
  label,
  value,
  onToggle,
}: CheckboxOptionProps<T>) {
  return (
    <label className="multi-select-option">
      <input
        checked={checked}
        onChange={() => onToggle(value)}
        type="checkbox"
      />
      {label}
    </label>
  )
}
