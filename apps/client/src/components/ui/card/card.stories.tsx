import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, CreditCard, User } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Button } from '../button/button'
import { Badge } from '../badge/badge'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    animated: {
      control: 'boolean',
      description: 'Анимация появления (fade-in + slide-up)',
    },
  },
  args: {
    animated: true,
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  name: 'Простая карточка',
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Заголовок карточки</CardTitle>
        <CardDescription>Описание карточки с дополнительной информацией</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Основное содержимое карточки. Здесь может быть любой контент.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Действие</Button>
      </CardFooter>
    </Card>
  ),
}

export const Profile: Story = {
  name: 'Профиль',
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base">Мария Иванова</CardTitle>
            <CardDescription>Администратор</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button size="sm" variant="outline" className="flex-1">
          Сообщение
        </Button>
        <Button size="sm" className="flex-1">
          Профиль
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Notification: Story = {
  name: 'Уведомление',
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Новое событие</CardTitle>
          </div>
          <Badge>Новое</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          День рождения Алексея — 25 февраля. Не забудьте поздравить!
        </p>
      </CardContent>
    </Card>
  ),
}

export const Payment: Story = {
  name: 'Оплата',
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Семейный бюджет</CardTitle>
        </div>
        <CardDescription>Совместные расходы за февраль</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Продукты</span>
          <span className="font-medium">12 500 ₽</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Развлечения</span>
          <span className="font-medium">3 200 ₽</span>
        </div>
        <div className="border-t pt-2 flex justify-between text-sm font-semibold">
          <span>Итого</span>
          <span>15 700 ₽</span>
        </div>
      </CardContent>
    </Card>
  ),
}

export const WithoutAnimation: Story = {
  name: 'Без анимации',
  args: { animated: false },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Статичная карточка</CardTitle>
        <CardDescription>animated={'{false}'} — без fade-in</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Эта карточка появляется мгновенно, без анимации.
        </p>
      </CardContent>
    </Card>
  ),
}
