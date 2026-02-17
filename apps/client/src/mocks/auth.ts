import type { User } from '@/types/user'

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'KM',
    email: 'km@family.app',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=KM',
  },
  {
    id: '2',
    name: 'ZD',
    email: 'zd@family.app',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=ZD',
  },
]

export async function mockGoogleLogin(userId?: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (userId) {
    const user = MOCK_USERS.find((u) => u.id === userId)
    if (user) return user
  }

  return MOCK_USERS[0]
}

export { MOCK_USERS }
