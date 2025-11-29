---
title: React
description: React component patterns, hooks, and state management
---

The React skill provides expertise in React component patterns, hooks, context, and modern React best practices.

## When Activated

- Building React components
- Using React hooks
- Component state management
- Working with `.jsx` or `.tsx` files containing React

## Core Patterns

### Functional Components

```tsx
interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

export function UserCard({ user, onSelect }: UserCardProps) {
  return (
    <div className="card" onClick={() => onSelect?.(user)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

### Hooks

```tsx
// useState
const [count, setCount] = useState(0);

// useEffect
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, [dependency]);

// useMemo
const expensive = useMemo(() => compute(data), [data]);

// useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### Custom Hooks

```tsx
function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUser(id)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading };
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const { user, loading } = useUser(userId);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}
```

### Context Pattern

```tsx
const UserContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be within UserProvider');
  return context;
}
```

## Best Practices

1. **Keep components small and focused**
2. **Use TypeScript for props**
3. **Memoize expensive computations**
4. **Clean up effects properly**
5. **Lift state up when needed**

## Common Pitfalls

### Missing Dependencies in Hooks

```tsx
// ❌ BAD: Missing dependency
useEffect(() => {
  fetchData(userId);
}, []); // userId not in dependencies

// ✅ GOOD: All dependencies included
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

### State Updates on Unmounted Components

```tsx
// ❌ BAD: No cleanup
useEffect(() => {
  fetchUser(id).then(setUser);
}, [id]);

// ✅ GOOD: Cleanup function
useEffect(() => {
  let cancelled = false;

  fetchUser(id).then(user => {
    if (!cancelled) setUser(user);
  });

  return () => {
    cancelled = true;
  };
}, [id]);
```

### Prop Drilling

```tsx
// ❌ BAD: Passing props through many levels
<App>
  <Layout user={user}>
    <Header user={user}>
      <UserMenu user={user} />
    </Header>
  </Layout>
</App>

// ✅ GOOD: Use context
<UserProvider value={user}>
  <App>
    <Layout>
      <Header>
        <UserMenu />  {/* Gets user from context */}
      </Header>
    </Layout>
  </App>
</UserProvider>
```

### Not Memoizing Callbacks

```tsx
// ❌ BAD: New function every render
<Child onUpdate={(data) => handleUpdate(id, data)} />

// ✅ GOOD: Memoized callback
const handleUpdate = useCallback((data) => {
  updateData(id, data);
}, [id]);

<Child onUpdate={handleUpdate} />
```

## Component Patterns

### Compound Components

```tsx
function Tabs({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }: { children: ReactNode }) {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = function Tab({ index, children }: { index: number; children: ReactNode }) {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <button
      className={activeTab === index ? 'active' : ''}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
    <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
  </Tabs.List>
</Tabs>
```

### Render Props

```tsx
interface DataLoaderProps<T> {
  url: string;
  children: (data: T | null, loading: boolean) => ReactNode;
}

function DataLoader<T>({ url, children }: DataLoaderProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading)}</>;
}

// Usage
<DataLoader<User> url="/api/user">
  {(user, loading) => (
    loading ? <Spinner /> : <UserProfile user={user} />
  )}
</DataLoader>
```

## Integration with Frameworks

### With Next.js

See [Next.js skill](/claudekit/skills/frameworks/nextjs) for server components and App Router patterns.

### With Testing

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('should increment count on click', async () => {
  render(<Counter />);

  const button = screen.getByRole('button', { name: /increment/i });
  await userEvent.click(button);

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

## Related Skills

- [TypeScript](/claudekit/skills/languages/typescript) - Type safety
- [Next.js](/claudekit/skills/frameworks/nextjs) - Full-stack React
- [Tailwind CSS](/claudekit/skills/frontend/tailwind) - Styling
- [vitest](/claudekit/skills/testing/vitest) - Testing
