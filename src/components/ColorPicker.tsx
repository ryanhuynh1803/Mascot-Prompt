import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  id: string
  label: string
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export const ColorPicker = ({ id, label, value, onValueChange, className }: ColorPickerProps) => {
  const [inputValue, setInputValue] = React.useState(value)
  const [isValid, setIsValid] = React.useState(true)

  React.useEffect(() => {
    setInputValue(value)
    setIsValid(true)
  }, [value])

  const validateHexColor = (color: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(color)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase()
    setInputValue(newValue)
    
    // Real-time validation feedback
    if (newValue === '' || validateHexColor(newValue)) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const handleInputBlur = () => {
    if (validateHexColor(inputValue)) {
      onValueChange(inputValue)
      setIsValid(true)
    } else if (inputValue === '') {
      // Allow empty values
      onValueChange('')
      setIsValid(true)
    } else {
      // Reset to original value if invalid
      setInputValue(value)
      setIsValid(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 rounded-lg border overflow-hidden shrink-0 shadow-sm">
          <input
            type="color"
            value={value || '#FFFFFF'}
            onChange={(e) => onValueChange(e.target.value.toUpperCase())}
            className="absolute top-[-10px] left-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] cursor-pointer"
            id={`${id}-picker`}
            title={`Chọn ${label.toLowerCase()}`}
          />
          <div
            className="w-full h-full transition-colors"
            style={{ backgroundColor: value || '#FFFFFF' }}
          />
        </div>
        <Input
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex-1 font-mono rounded-md", // Added rounded-md here
            !isValid && "border-destructive focus:border-destructive"
          )}
          placeholder="#FFFFFF"
          maxLength={7}
        />
      </div>
      {!isValid && (
        <p className="text-xs text-destructive">
          Vui lòng nhập mã màu hex hợp lệ (ví dụ: #FF0000)
        </p>
      )}
    </div>
  )
}