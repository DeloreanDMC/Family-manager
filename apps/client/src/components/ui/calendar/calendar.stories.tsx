import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Calendar } from './calendar'

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  name: 'По умолчанию',
  render: () => {
    const [date, setDate] = useState<Date>()
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selected) => setDate(selected)}
      />
    )
  },
}

export const WithMultipleMonths: Story = {
  name: 'Два месяца',
  render: () => {
    const [date, setDate] = useState<Date>()
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selected) => setDate(selected)}
        numberOfMonths={2}
      />
    )
  },
}

export const WithDisabledWeekends: Story = {
  name: 'Без выходных',
  render: () => {
    const [date, setDate] = useState<Date>()
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selected) => setDate(selected)}
        disabled={(d) => d.getDay() === 0 || d.getDay() === 6}
      />
    )
  },
}

export const WithDisabledPast: Story = {
  name: 'Только будущие даты',
  render: () => {
    const [date, setDate] = useState<Date>()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selected) => setDate(selected)}
        disabled={(d) => d < today}
      />
    )
  },
}

export const DropdownCaption: Story = {
  name: 'Выбор месяца и года',
  render: () => {
    const [date, setDate] = useState<Date>()
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selected) => setDate(selected)}
        captionLayout="dropdown"
      />
    )
  },
}

export const WithPreselected: Story = {
  name: 'С выбранной датой',
  render: () => {
    const [date, setDate] = useState<Date>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={(selected) => setDate(selected ?? new Date())}
      />
    )
  },
}
