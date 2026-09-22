import { useEffect, useRef, useState } from 'react'
import { CheckboxOption } from './CheckboxOption'
import './MultiSelect.css'

export interface MultiSelectOption<T extends string> {
  label: string
  value: T
}

interface MultiSelectProps<T extends string> {
  label: string
  options: MultiSelectOption<T>[]
  selectedValues: T[]
  onChange: (selectedValues: T[]) => void
}

export function MultiSelect<T extends string>({
  label,
  options,
  selectedValues,
  onChange,
}: MultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleValue = (value: T) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((selectedValue) => selectedValue !== value))
      return
    }

    onChange([...selectedValues, value])
  }

  const buttonLabel =
    selectedValues.length > 0 ? `${label} (${selectedValues.length})` : label

  return (
    <div className="multi-select" ref={containerRef}>
      <button
        aria-expanded={isOpen}
        className="multi-select-trigger"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {buttonLabel}
        <span aria-hidden="true" className="multi-select-chevron">
          <svg focusable="false" viewBox="0 0 16 16">
            <path
              d="M1.75 5.25 8 11.5 14.25 5.25"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="multi-select-menu">
          {options.map((option) => (
            <CheckboxOption
              checked={selectedValues.includes(option.value)}
              key={option.value}
              label={option.label}
              onToggle={toggleValue}
              value={option.value}
            />
          ))}

          {selectedValues.length > 0 && (
            <button
              className="multi-select-clear"
              onClick={() => onChange([])}
              type="button"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  )
}
