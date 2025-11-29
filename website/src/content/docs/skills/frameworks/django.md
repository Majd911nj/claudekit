---
title: Django
description: Django ORM, views, and REST framework patterns
---

The Django skill provides expertise in Django web framework including ORM, class-based views, and Django REST Framework.

## When Activated

- Python web applications
- Admin interfaces
- Django REST Framework APIs
- Working with Django projects

## Core Patterns

### Models

```python
from django.db import models

class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
        ]

    def __str__(self):
        return self.email
```

### Views (Class-based)

```python
from django.views.generic import ListView, DetailView, CreateView

class UserListView(ListView):
    model = User
    template_name = 'users/list.html'
    context_object_name = 'users'
    paginate_by = 20

class UserDetailView(DetailView):
    model = User
    template_name = 'users/detail.html'
    context_object_name = 'user'

class UserCreateView(CreateView):
    model = User
    fields = ['email', 'name']
    template_name = 'users/create.html'
    success_url = '/users/'
```

### Django REST Framework

```python
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'created_at']
        read_only_fields = ['created_at']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def activate(self, request, pk=None):
        user = self.get_object()
        user.is_active = True
        user.save()
        return Response({'status': 'activated'})
```

### URLs

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
```

## Best Practices

1. **Use class-based views for standard CRUD**
2. **Define model methods for business logic**
3. **Use serializers for validation**
4. **Add proper permissions**
5. **Use select_related/prefetch_related for queries**

## Common Pitfalls

### N+1 Queries

```python
# ❌ BAD: N+1 query problem
users = User.objects.all()
for user in users:
    print(user.profile.bio)  # Separate query for each user

# ✅ GOOD: Use select_related
users = User.objects.select_related('profile').all()
for user in users:
    print(user.profile.bio)  # Single query
```

### Missing Migrations

```python
# ❌ BAD: Forgetting migrations
# After changing models, forgetting to:
python manage.py makemigrations
python manage.py migrate

# ✅ GOOD: Always create and run migrations
python manage.py makemigrations
python manage.py migrate
```

### No Validation

```python
# ❌ BAD: Direct model creation
user = User.objects.create(email=request.POST['email'])

# ✅ GOOD: Use serializer for validation
serializer = UserSerializer(data=request.data)
if serializer.is_valid():
    user = serializer.save()
else:
    return Response(serializer.errors, status=400)
```

## Advanced Patterns

### Custom Managers

```python
class ActiveUserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)

class User(models.Model):
    # ...
    objects = models.Manager()
    active = ActiveUserManager()

# Usage
all_users = User.objects.all()
active_users = User.active.all()
```

### Signals

```python
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
```

### Permissions

```python
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    # ...
```

### Pagination

```python
from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class UserViewSet(viewsets.ModelViewSet):
    pagination_class = StandardResultsSetPagination
    # ...
```

## Testing

```python
from django.test import TestCase
from rest_framework.test import APITestCase

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(
            email='test@example.com',
            name='Test User'
        )
        self.assertEqual(user.email, 'test@example.com')

class UserAPITest(APITestCase):
    def test_list_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 200)

    def test_create_user(self):
        data = {'email': 'new@example.com', 'name': 'New User'}
        response = self.client.post('/api/users/', data)
        self.assertEqual(response.status_code, 201)
```

## Related Skills

- [Python](/claudekit/skills/languages/python) - Python language
- [PostgreSQL](/claudekit/skills/databases/postgresql) - Database
- [pytest](/claudekit/skills/testing/pytest) - Testing
- [OpenAPI](/claudekit/skills/api/openapi) - API documentation
