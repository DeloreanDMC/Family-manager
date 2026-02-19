import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search as SearchIcon, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input } from './input'
import { Button } from '../button/button'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
      description: 'HTML тип поля',
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'text',
    placeholder: 'Введите текст...',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  name: 'По умолчанию',
}

export const WithLabel: Story = {
  name: 'С лейблом',
  render: (args) => (
    <div className="flex flex-col gap-1.5 w-72">
      <label htmlFor="name" className="text-sm font-medium leading-none">
        Имя
      </label>
      <Input id="name" {...args} placeholder="Иван Иванов" />
      <p className="text-xs text-muted-foreground">Введите ваше полное имя</p>
    </div>
  ),
}

export const Email: Story = {
  name: 'Email',
  args: {
    type: 'email',
    placeholder: 'mail@example.com',
  },
  render: (args) => (
    <div className="flex flex-col gap-1.5 w-72">
      <label className="text-sm font-medium">Email</label>
      <Input {...args} />
    </div>
  ),
}

export const Password: Story = {
  name: 'Пароль с переключателем',
  render: () => {
    const [show, setShow] = useState(false)
    return (
      <div className="flex flex-col gap-1.5 w-72">
        <label className="text-sm font-medium">Пароль</label>
        <div className="relative">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="••••••••"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    )
  },
}

export const Search: Story = {
  name: 'Поиск',
  render: () => (
    <div className="relative w-72">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Поиск..." className="pl-9" />
    </div>
  ),
}

export const WithButton: Story = {
  name: 'С кнопкой',
  render: () => (
    <div className="flex w-80 gap-2">
      <Input placeholder="Введите email..." type="email" />
      <Button>Подписаться</Button>
    </div>
  ),
}

export const Disabled: Story = {
  name: 'Недоступен',
  args: {
    disabled: true,
    placeholder: 'Нельзя редактировать',
  },
}

export const WithError: Story = {
  name: 'С ошибкой',
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <label className="text-sm font-medium">Email</label>
      <Input
        type="email"
        defaultValue="неверный-email"
        className="border-destructive focus-visible:ring-destructive"
      />
      <p className="text-xs text-destructive">Введите корректный email адрес</p>
    </div>
  ),
}
