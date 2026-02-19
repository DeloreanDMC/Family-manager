import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Trash2, LogOut } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { Button } from '../button/button'
import { Input } from '../input/input'

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  name: 'Информационный',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Открыть диалог</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>О Family Manager</DialogTitle>
          <DialogDescription>
            Приложение для управления семейными задачами, подарками и планами.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Версия 0.0.1 — разработка в процессе. Спасибо за использование!
        </p>
      </DialogContent>
    </Dialog>
  ),
}

export const Confirm: Story = {
  name: 'Подтверждение удаления',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 />
            Удалить запись
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить запись?</DialogTitle>
            <DialogDescription>
              Это действие нельзя отменить. Запись будет удалена навсегда.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const Form: Story = {
  name: 'Форма',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Добавить подарок</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новый подарок</DialogTitle>
          <DialogDescription>
            Добавьте подарок в вишлист. Нажмите сохранить, когда закончите.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gift-name" className="text-sm font-medium">
              Название
            </label>
            <Input id="gift-name" placeholder="Книга «Атомные привычки»" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gift-link" className="text-sm font-medium">
              Ссылка
            </label>
            <Input id="gift-link" type="url" placeholder="https://..." />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="gift-price" className="text-sm font-medium">
              Цена (₽)
            </label>
            <Input id="gift-price" type="number" placeholder="1 500" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Logout: Story = {
  name: 'Выход из аккаунта',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <LogOut />
            Выйти
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выйти из аккаунта?</DialogTitle>
            <DialogDescription>
              Вы будете перенаправлены на страницу входа.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Остаться
            </Button>
            <Button onClick={() => setOpen(false)}>Выйти</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}
