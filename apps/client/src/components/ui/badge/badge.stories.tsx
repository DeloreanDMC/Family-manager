import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Визуальный стиль бейджа',
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Бейдж',
    variant: 'default',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const AllVariants: Story = {
  name: 'Все варианты',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge variant="default">Основной</Badge>
      <Badge variant="secondary">Вторичный</Badge>
      <Badge variant="destructive">Ошибка</Badge>
      <Badge variant="outline">Обводка</Badge>
    </div>
  ),
}

export const InContext: Story = {
  name: 'В контексте',
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">День рождения</span>
        <Badge>Сегодня</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Покупки</span>
        <Badge variant="secondary">3 задачи</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Просрочено</span>
        <Badge variant="destructive">2</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">В архиве</span>
        <Badge variant="outline">Архив</Badge>
      </div>
    </div>
  ),
}

export const StatusBadges: Story = {
  name: 'Статусы',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Активно</Badge>
      <Badge variant="secondary">В процессе</Badge>
      <Badge variant="outline">Ожидание</Badge>
      <Badge variant="destructive">Отменено</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  name: 'Размеры через className',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge className="text-[10px] px-1.5 py-0">XS</Badge>
      <Badge>SM (по умолчанию)</Badge>
      <Badge className="text-sm px-3 py-1 rounded-md">MD</Badge>
    </div>
  ),
}
