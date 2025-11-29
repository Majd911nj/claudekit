---
title: FastAPI
description: FastAPI async patterns, Pydantic validation, and OpenAPI documentation
---

The FastAPI skill provides expertise in building REST APIs with Python, async patterns, Pydantic validation, and automatic OpenAPI documentation.

## When Activated

- Building REST APIs with Python
- Async web applications
- OpenAPI/Swagger documentation needed
- Working with FastAPI framework

## Core Patterns

### Route Definition

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel

app = FastAPI()

class UserCreate(BaseModel):
    email: str
    name: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate):
    # Create user logic
    return UserResponse(id=1, **user.model_dump())

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

### Dependency Injection

```python
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

@app.get("/users")
async def list_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    return result.scalars().all()
```

### Router Organization

```python
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
async def list_users():
    pass

@router.post("/")
async def create_user(user: UserCreate):
    pass

# In main.py
app.include_router(router)
```

### Request Validation

```python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    age: int = Field(ge=0, le=150)

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "name": "John Doe",
                "age": 30
            }
        }
```

### Error Handling

```python
from fastapi import HTTPException, status
from fastapi.responses import JSONResponse

class UserNotFoundError(Exception):
    pass

@app.exception_handler(UserNotFoundError)
async def user_not_found_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": "User not found"}
    )

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = await find_user(user_id)
    if not user:
        raise UserNotFoundError()
    return user
```

### Background Tasks

```python
from fastapi import BackgroundTasks

def send_email(email: str, message: str):
    # Send email logic
    pass

@app.post("/users")
async def create_user(
    user: UserCreate,
    background_tasks: BackgroundTasks
):
    new_user = await create_user_in_db(user)
    background_tasks.add_task(send_email, user.email, "Welcome!")
    return new_user
```

## Best Practices

1. **Use Pydantic models for request/response validation**
2. **Organize routes with APIRouter**
3. **Use dependency injection for services**
4. **Return proper HTTP status codes**
5. **Add OpenAPI descriptions and examples**

## Common Pitfalls

### Blocking I/O in Async

```python
# ❌ BAD: Blocking call in async function
@app.get("/users")
async def list_users():
    users = blocking_db_call()  # Blocks event loop
    return users

# ✅ GOOD: Use async libraries
@app.get("/users")
async def list_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    return result.scalars().all()
```

### Missing Response Models

```python
# ❌ BAD: No response model
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    return await get_user_by_id(user_id)

# ✅ GOOD: Define response model
@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    return await get_user_by_id(user_id)
```

### Not Using HTTPException

```python
# ❌ BAD: Returning error dict
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = await find_user(user_id)
    if not user:
        return {"error": "Not found"}  # Returns 200!
    return user

# ✅ GOOD: Raise HTTPException
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = await find_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

## Advanced Patterns

### Middleware

```python
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

### Authentication

```python
from fastapi import Security, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> User:
    token = credentials.credentials
    user = await verify_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

@app.get("/profile")
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user
```

### CORS

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://example.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Testing

```python
from fastapi.testclient import TestClient

client = TestClient(app)

def test_create_user():
    response = client.post(
        "/users",
        json={"email": "test@example.com", "name": "Test"}
    )
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"

def test_get_nonexistent_user():
    response = client.get("/users/999")
    assert response.status_code == 404
```

## Related Skills

- [Python](/claudekit/skills/languages/python) - Python language
- [Pydantic](/claudekit/skills/languages/python) - Data validation
- [PostgreSQL](/claudekit/skills/databases/postgresql) - Database
- [pytest](/claudekit/skills/testing/pytest) - Testing
