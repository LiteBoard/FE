"use client"

import * as React from "react"
import { Button } from "../Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../Popover/Popover"
import { CalendarIcon } from "../Icon"
import { Calendar } from "../Calender/Calendar"

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({ 
  value, 
  onChange, 
  placeholder = "날짜를 선택하세요",
  disabled = false,
  className = ""
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  // 오늘 날짜를 기준으로 과거 날짜와 미래 5년 이후 날짜 비활성화
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const maxDate = new Date()
  maxDate.setFullYear(today.getFullYear() + 5)
  maxDate.setHours(23, 59, 59, 999)

  const disabledDays = {
    before: today,
    after: maxDate
  }

  return (
    <div className={`relative ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-between font-normal ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
          >
            {value ? (
              `${value.getFullYear()}.${String(value.getMonth() + 1).padStart(2, '0')}.${String(value.getDate()).padStart(2, '0')}`
            ) : (
              placeholder
            )}
            <CalendarIcon width={16} height={16} className="text-neutral-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 !z-[9999] bg-white"
          align="start"
          side="bottom"
          sideOffset={4}
          avoidCollisions={true}
        >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            disabled={disabledDays}
            fromYear={today.getFullYear()}
            toYear={today.getFullYear() + 5}
            onSelect={(date) => {
              if (date) {
                onChange(date)
                setOpen(false)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
