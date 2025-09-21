"use client"

import * as React from "react"
import { Button } from "../Button"
import { CalendarIcon } from "../Icon"
import { Calendar } from "../Calender/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover"

import { DateRange } from "react-day-picker"

interface DateRangePickerProps {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  renderTrigger?: (
    value: DateRange | undefined,
    formatRange: () => string,
    open: boolean,
    setOpen: (open: boolean) => void
  ) => React.ReactNode
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "기간을 선택하세요",
  disabled = false,
  className = "",
  renderTrigger,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [isSelectingStartDate, setIsSelectingStartDate] = React.useState(true)

  // 오늘 날짜 기준 제한
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const maxDate = new Date()
  maxDate.setFullYear(today.getFullYear() + 5)
  maxDate.setHours(23, 59, 59, 999)

  const disabledDays = {
    before: today,
    after: maxDate,
  }

  // 선택된 범위를 문자열로 표시
  const formatRange = () => {
    if (!value?.from) return placeholder
    const fromStr = `${value.from.getMonth() + 1}월 ${value.from.getDate()}일`

    if (!value.to) return `${fromStr} ~`

    const toStr = `${value.to.getMonth() + 1}월 ${value.to.getDate()}일`

    return `${fromStr} ~ ${toStr}`
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      // 캘린더가 열릴 때 상태 초기화
      if (value?.from && value?.to) {
        setIsSelectingStartDate(true)
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          {renderTrigger ? (
            <div>{renderTrigger(value, formatRange, open, setOpen)}</div>
          ) : (
            <Button
              variant="outline"
              className={`w-full justify-between font-normal ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={disabled}
            >
              {formatRange()}
              <CalendarIcon width={16} height={16} className="text-neutral-500" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 !z-[9999] bg-white"
          align="start"
          side="bottom"
          sideOffset={4}
          avoidCollisions={true}
        >
          <Calendar
            mode="range"
            selected={value}
            captionLayout="dropdown"
            disabled={disabledDays}
            fromYear={today.getFullYear()}
            toYear={today.getFullYear() + 5}
            onSelect={(range) => {
              // 완전한 범위가 이미 선택된 상태에서 새로운 날짜를 클릭하면 시작일부터 다시 선택
              if (value?.from && value?.to && range?.from && !range?.to) {
                setIsSelectingStartDate(true)
                onChange({ from: range.from, to: undefined })
                return
              }

              // 첫 번째 날짜 선택 (시작일)
              if (!range?.from || (range?.from && !range?.to)) {
                setIsSelectingStartDate(false)
              }

              // 두 번째 날짜 선택 (종료일) - 캘린더는 닫지 않음
              if (range?.from && range?.to) {
                setIsSelectingStartDate(true)
              }

              onChange(range)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
