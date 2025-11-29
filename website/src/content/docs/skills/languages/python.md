---
title: Python
description: Modern Python development with type hints, async, and best practices
---

The Python skill provides expertise in modern Python development including type hints, async patterns, dataclasses, and Pythonic idioms.

## When Activated

- Working with Python files (`.py`)
- Writing Python scripts or applications
- Using Python frameworks (Django, FastAPI, Flask)
- Data processing and automation

## Core Patterns

### Type Hints

```python
from typing import Optional, List, Dict, Union
from collections.abc import Callable

def process_items(
    items: List[str],
    callback: Callable[[str], None],
    config: Optional[Dict[str, Any]] = None
) -> List[str]:
    """Process items with optional callback."""
    return [callback(item) for item in items]
```

### Async/Await

```python
import asyncio
from typing import List

async def fetch_data(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def fetch_all(urls: List[str]) -> List[dict]:
    return await asyncio.gather(*[fetch_data(url) for url in urls])
```

### Context Managers

```python
from contextlib import contextmanager

@contextmanager
def managed_resource():
    resource = acquire_resource()
    try:
        yield resource
    finally:
        release_resource(resource)

# Usage
with managed_resource() as r:
    r.do_something()
```

### Dataclasses

```python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class User:
    id: int
    email: str
    name: str
    created_at: datetime = field(default_factory=datetime.now)

    def __post_init__(self):
        self.email = self.email.lower()
```

### Pydantic Models

```python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=8)

    class Config:
        str_strip_whitespace = True
```

## Best Practices

1. **Use type hints for all public functions**
2. **Use dataclasses or Pydantic for data models**
3. **Prefer context managers for resource management**
4. **Use async for I/O-bound operations**
5. **Follow PEP 8 style guidelines**

## Common Pitfalls

### Mutable Default Arguments

```python
# ❌ BAD: Mutable default
def add_item(item, items=[]):
    items.append(item)
    return items

# ✅ GOOD: Use None and initialize
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Not Closing Resources

```python
# ❌ BAD: Manual resource management
file = open('data.txt')
data = file.read()
file.close()

# ✅ GOOD: Use with statement
with open('data.txt') as file:
    data = file.read()
```

### Blocking in Async

```python
# ❌ BAD: Blocking call in async function
async def process():
    result = expensive_cpu_work()  # Blocks event loop
    return result

# ✅ GOOD: Run in thread pool
async def process():
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, expensive_cpu_work)
    return result
```

### Catching Bare Exceptions

```python
# ❌ BAD: Catching everything
try:
    risky_operation()
except:
    handle_error()

# ✅ GOOD: Specific exceptions
try:
    risky_operation()
except (ValueError, TypeError) as e:
    handle_error(e)
```

## Integration with Frameworks

### With FastAPI

See [FastAPI skill](/claudekit/skills/frameworks/fastapi) for API development patterns.

### With Django

See [Django skill](/claudekit/skills/frameworks/django) for web application patterns.

### With pytest

See pytest skill for testing patterns.

## Related Skills

- [FastAPI](/claudekit/skills/frameworks/fastapi) - REST API development
- [Django](/claudekit/skills/frameworks/django) - Web applications
- [pytest](/claudekit/skills/testing/pytest) - Testing framework
- [PostgreSQL](/claudekit/skills/databases/postgresql) - Database integration
