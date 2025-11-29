---
title: Next.js
description: Next.js App Router, Server Components, and full-stack patterns
---

The Next.js skill provides expertise in Next.js with App Router, Server Components, Server Actions, and full-stack development patterns.

## When Activated

- React applications with SSR/SSG
- Full-stack applications
- App Router patterns
- Working in `app/` directory

## Core Patterns

### App Router Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── loading.tsx         # Loading UI
├── error.tsx           # Error UI
├── api/
│   └── users/
│       └── route.ts    # API route
└── users/
    ├── page.tsx        # Users page
    └── [id]/
        └── page.tsx    # User detail
```

### Server Components

```tsx
// app/users/page.tsx - Server Component (default)
async function UsersPage() {
  const users = await db.users.findMany();

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Client Components

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

### API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const users = await db.users.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const user = await db.users.create({ data });
  return NextResponse.json(user, { status: 201 });
}
```

### Server Actions

```tsx
// app/actions.ts
'use server';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  await db.users.create({ data: { name } });
  revalidatePath('/users');
}

// app/users/new/page.tsx
import { createUser } from '@/app/actions';

export default function NewUserPage() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <button type="submit">Create</button>
    </form>
  );
}
```

### Dynamic Routes

```tsx
// app/users/[id]/page.tsx
interface PageProps {
  params: { id: string };
}

export default async function UserPage({ params }: PageProps) {
  const user = await db.users.findUnique({
    where: { id: params.id }
  });

  if (!user) {
    notFound();
  }

  return <div>{user.name}</div>;
}
```

### Layouts

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>{/* Navigation */}</nav>
        <main>{children}</main>
        <footer>{/* Footer */}</footer>
      </body>
    </html>
  );
}
```

## Best Practices

1. **Use Server Components by default**
2. **Add 'use client' only when needed**
3. **Colocate data fetching with components**
4. **Use loading.tsx for suspense boundaries**
5. **Implement proper error boundaries**

## Common Pitfalls

### Using Hooks in Server Components

```tsx
// ❌ BAD: Hooks in Server Component
export default async function Page() {
  const [state, setState] = useState(0); // Error!
  return <div>{state}</div>;
}

// ✅ GOOD: Mark as Client Component
'use client';

export default function Page() {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
}
```

### Large Client Bundles

```tsx
// ❌ BAD: Entire page as Client Component
'use client';

export default function Page() {
  const [count, setCount] = useState(0);
  const data = await fetchData(); // Can't use await in Client Component

  return (
    <div>
      <HeavyComponent />
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </div>
  );
}

// ✅ GOOD: Extract interactive parts only
export default async function Page() {
  const data = await fetchData(); // Server Component can await

  return (
    <div>
      <HeavyComponent data={data} /> {/* Server Component */}
      <Counter /> {/* Small Client Component */}
    </div>
  );
}

// Counter.tsx
'use client';
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Missing Loading States

```tsx
// ❌ BAD: No loading state
export default async function Page() {
  const data = await slowFetch();
  return <div>{data}</div>;
}

// ✅ GOOD: Add loading.tsx
// app/page.tsx
export default async function Page() {
  const data = await slowFetch();
  return <div>{data}</div>;
}

// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

### Not Revalidating After Mutations

```tsx
// ❌ BAD: No revalidation
'use server';
export async function createUser(data: FormData) {
  await db.users.create({ data: getData(data) });
  // Page still shows old data
}

// ✅ GOOD: Revalidate path
'use server';
export async function createUser(data: FormData) {
  await db.users.create({ data: getData(data) });
  revalidatePath('/users');
  redirect('/users');
}
```

## Data Fetching Patterns

### Parallel Data Fetching

```tsx
export default async function Page() {
  // Fetch in parallel
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
  ]);

  return (
    <div>
      <UserList users={users} />
      <PostList posts={posts} />
    </div>
  );
}
```

### Sequential Data Fetching

```tsx
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id);
  const posts = await fetchUserPosts(user.id); // Depends on user

  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}
```

### Streaming with Suspense

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
      <FastComponent />
    </div>
  );
}

async function SlowComponent() {
  const data = await slowFetch();
  return <div>{data}</div>;
}
```

## Caching and Revalidation

### Time-Based Revalidation

```tsx
// Revalidate every hour
export const revalidate = 3600;

export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
  return <div>{JSON.stringify(data)}</div>;
}
```

### On-Demand Revalidation

```tsx
// app/actions.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createPost(data: FormData) {
  await db.posts.create({ data: getData(data) });
  revalidatePath('/posts');
  // or
  revalidateTag('posts');
}
```

## Metadata

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'View user profile information',
};

export default function Page() {
  return <div>Profile</div>;
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const user = await fetchUser(params.id);

  return {
    title: `${user.name}'s Profile`,
    description: `Profile page for ${user.name}`,
  };
}
```

## Integration with Other Skills

### With React

See [React skill](/claudekit/skills/frameworks/react) for component patterns and hooks.

### With TypeScript

Full TypeScript integration:
```tsx
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const user = await fetchUser(params.id);
  return NextResponse.json(user);
}
```

## Related Skills

- [React](/claudekit/skills/frameworks/react) - Component patterns
- [TypeScript](/claudekit/skills/languages/typescript) - Type safety
- [Tailwind CSS](/claudekit/skills/frontend/tailwind) - Styling
- [PostgreSQL](/claudekit/skills/databases/postgresql) - Database
