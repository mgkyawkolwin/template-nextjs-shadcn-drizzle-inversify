import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface SelectWithLabelProps {
    label: string;
}


export function SelectWithLabel({label} : SelectWithLabelProps) {
  return (
    <div className="flex gap-2">
        <Label>{label}</Label>
        <Select defaultValue="all">
            <SelectTrigger className="w-auto min-h-4 border-gray-300">
                <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent className="">
                <SelectGroup>
                <SelectItem value="all">ALL</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="12pax">12 Pax</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
  )
}
