'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signUp } from '@/lib/auth/auth-client'

export default function SignUpPage() {

  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault()

    setLoading(true)
    setError('')

    try {

      const result = await signUp.email({
        name,
        email,
        password,
      })

      if (result.error) {

        setError(result.error.message ?? 'Failed to create account')

      } else {

        router.push('/admin/dashboard')
      }

    } catch (err) {

      setError('Something went wrong')

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">

      <Card className="w-full max-w-md rounded-3xl border-stone-200 shadow-sm">

        <CardHeader className="space-y-2">

          <CardTitle className="text-3xl font-semibold tracking-tight">
            Create Admin Account
          </CardTitle>

          <CardDescription className="text-stone-500">
            Set up your MatFlow studio admin account
          </CardDescription>

        </CardHeader>

        <form onSubmit={handleSubmit}>

          <CardContent className="space-y-5">

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">

              <Label htmlFor="name">
                Name
              </Label>

              <Input
                id="name"
                type="text"
                placeholder="Andy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 rounded-xl"
              />

            </div>

            {/* Email */}
            <div className="space-y-2">

              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="andy@matflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl"
              />

            </div>

            {/* Password */}
            <div className="space-y-2">

              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="h-11 rounded-xl"
              />

            </div>

          </CardContent>

          <CardFooter className="mt-6">

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

          </CardFooter>

        </form>

      </Card>

    </div>
  )
}