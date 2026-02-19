import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail, Loader2, Trash2, Plus } from 'lucide-react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Визуальный стиль кнопки',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Размер кнопки',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Кнопка',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const AllVariants: Story = {
  name: 'Все варианты',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="default">По умолчанию</Button>
      <Button variant="secondary">Вторичная</Button>
      <Button variant="outline">Обводка</Button>
      <Button variant="ghost">Призрак</Button>
      <Button variant="destructive">Удалить</Button>
      <Button variant="link">Ссылка</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'Все размеры',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button size="sm">Маленькая</Button>
      <Button size="default">Средняя</Button>
      <Button size="lg">Большая</Button>
      <Button size="icon" aria-label="Добавить">
        <Plus />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  name: 'С иконкой',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>
        <Mail />
        Написать
      </Button>
      <Button variant="outline">
        <Plus />
        Добавить
      </Button>
      <Button variant="destructive">
        <Trash2 />
        Удалить
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  name: 'Загрузка',
  render: () => (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Загрузка...
    </Button>
  ),
}

export const Disabled: Story = {
  name: 'Недоступна',
  args: {
    disabled: true,
    children: 'Недоступно',
  },
}
