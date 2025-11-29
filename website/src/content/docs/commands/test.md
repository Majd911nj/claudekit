---
title: /test
description: Generate comprehensive tests including unit tests, integration tests, and edge cases
---

# /test - Test Generation Command

## Purpose

Generate comprehensive tests for specified code including unit tests, integration tests, and edge cases. Analyzes your code to create test suites that catch bugs and verify behavior.

## Usage

```bash
/test [file path | function name | 'coverage' | 'all']
```

## Arguments

- `[file path]` - Generate tests for specific file or pattern
- `[function name]` - Generate tests for specific function
- `coverage` - Analyze and improve test coverage
- `all` - Run all tests and report results

## How It Works

The `/test` command has two main modes:

### Mode 1: File/Function Testing

1. **Analyze Target Code**
   - Reads the code to understand functionality
   - Identifies inputs, outputs, and side effects
   - Notes dependencies to mock
   - Finds existing tests for patterns

2. **Design Test Cases**
   - **Happy Path**: Normal operation with valid inputs
   - **Edge Cases**: Boundary values, empty inputs, limits
   - **Error Cases**: Invalid inputs, exceptions
   - **Integration Points**: External dependencies

3. **Generate Tests**
   - Follows project testing conventions
   - Uses appropriate mocking strategies
   - Writes clear, descriptive test names
   - Includes setup and teardown

4. **Run and Verify**
   ```bash
   # Python
   pytest [test_file] -v

   # TypeScript
   pnpm test [test_file]
   ```

### Mode 2: Coverage Analysis

1. **Run Coverage Report**
   ```bash
   # Python
   pytest --cov=src --cov-report=term-missing

   # TypeScript
   pnpm test --coverage
   ```

2. **Identify Gaps**
   - Finds untested functions
   - Identifies untested branches
   - Notes missing edge cases

3. **Generate Missing Tests**
   - Prioritizes by risk
   - Focuses on critical paths
   - Adds edge case coverage

## Test Templates

### Python (pytest)

```python
import pytest
from unittest.mock import Mock, patch
from src.module import function_under_test

class TestFunctionUnderTest:
    """Tests for function_under_test."""

    def test_with_valid_input_returns_expected(self):
        """Test that valid input produces expected output."""
        result = function_under_test("valid_input")
        assert result == "expected_output"

    def test_with_empty_input_returns_default(self):
        """Test that empty input returns default value."""
        result = function_under_test("")
        assert result == "default"

    def test_with_invalid_input_raises_error(self):
        """Test that invalid input raises ValueError."""
        with pytest.raises(ValueError, match="Invalid input"):
            function_under_test(None)

    @pytest.mark.parametrize("input_val,expected", [
        ("a", "result_a"),
        ("b", "result_b"),
        ("c", "result_c"),
    ])
    def test_parametrized_inputs(self, input_val, expected):
        """Test multiple input variations."""
        assert function_under_test(input_val) == expected

    @patch('src.module.external_service')
    def test_with_mocked_dependency(self, mock_service):
        """Test with mocked external dependency."""
        mock_service.call.return_value = "mocked_result"
        result = function_under_test("input")
        assert result == "expected_with_mock"
        mock_service.call.assert_called_once_with("input")
```

### TypeScript (vitest)

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { functionUnderTest } from './module';

describe('functionUnderTest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return expected output for valid input', () => {
    const result = functionUnderTest('valid_input');
    expect(result).toBe('expected_output');
  });

  it('should return default for empty input', () => {
    const result = functionUnderTest('');
    expect(result).toBe('default');
  });

  it('should throw error for invalid input', () => {
    expect(() => functionUnderTest(null)).toThrow('Invalid input');
  });

  it.each([
    ['a', 'result_a'],
    ['b', 'result_b'],
    ['c', 'result_c'],
  ])('should handle input %s correctly', (input, expected) => {
    expect(functionUnderTest(input)).toBe(expected);
  });

  it('should work with mocked dependency', async () => {
    vi.mock('./external-service', () => ({
      call: vi.fn().mockResolvedValue('mocked_result'),
    }));

    const result = await functionUnderTest('input');
    expect(result).toBe('expected_with_mock');
  });
});
```

### React Component (Testing Library)

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserForm } from './UserForm';

describe('UserForm', () => {
  it('should render form fields', () => {
    render(<UserForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should call onSubmit with form data', async () => {
    const onSubmit = vi.fn();
    render(<UserForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John',
        email: 'john@example.com',
      });
    });
  });

  it('should show validation error for invalid email', async () => {
    render(<UserForm onSubmit={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid' },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });
});
```

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--coverage` | Generate coverage-focused tests | `--coverage` |
| `--type=[type]` | Test type to generate | `--type=integration` |
| `--format=[fmt]` | Output format (concise/detailed) | `--format=concise` |
| `--framework=[fw]` | Specify test framework | `--framework=vitest` |
| `--tdd` | Generate TDD-style with failing tests first | `--tdd` |
| `--edge-cases` | Focus on edge case coverage | `--edge-cases` |

### Test Types

| Type | Description |
|------|-------------|
| `unit` | Isolated function tests (default) |
| `integration` | Multi-component tests |
| `e2e` | End-to-end workflow tests |
| `snapshot` | Snapshot tests for UI |
| `property` | Property-based testing |

### Framework Options

| Framework | Language |
|-----------|----------|
| `pytest` | Python |
| `vitest` | TypeScript/JavaScript |
| `jest` | JavaScript |
| `playwright` | E2E (any) |

### Flag Examples

```bash
# Analyze and improve coverage
/test --coverage src/services/

# Generate integration tests
/test --type=integration src/api/users.ts

# TDD mode: failing tests first
/test --tdd src/utils/validator.ts

# Edge case focused testing
/test --edge-cases --framework=pytest src/models/user.py
```

## Examples

### Generate Tests for File

**Input:**
```bash
/test src/services/auth.ts
```

**Output:**
```markdown
## Tests Generated

### Target
`src/services/auth.ts` - AuthService class

### Tests Created
- `src/services/auth.test.ts`

### Test Cases
1. `login_with_valid_credentials_returns_token` - Happy path
2. `login_with_invalid_password_throws_error` - Error case
3. `login_with_nonexistent_user_throws_error` - Error case
4. `refresh_token_with_valid_token_returns_new_token` - Happy path
5. `refresh_token_with_expired_token_throws_error` - Edge case
6. `logout_invalidates_session` - Happy path

### Coverage Impact
- Before: 65%
- After: 88%
- New lines covered: 42

### Run Tests
```bash
pytest src/services/auth.test.ts -v
```

### Notes
- Mocked database calls using pytest-mock
- Added edge case for token expiration
- Consider adding integration tests for full auth flow
```

### Coverage Analysis

**Input:**
```bash
/test coverage
```

**Output:**
1. Runs coverage report
2. Identifies untested files/functions
3. Generates tests for gaps
4. Prioritizes by criticality
5. Shows before/after coverage metrics

### Generate Integration Tests

**Input:**
```bash
/test --type=integration src/api/
```

**Output:**
1. Identifies API endpoints
2. Creates end-to-end request tests
3. Mocks external dependencies
4. Tests error responses
5. Verifies status codes and payloads

## Deliverables

After running `/test`, you receive:

1. **Test File(s)** - Complete test suite with:
   - Happy path tests
   - Edge case tests
   - Error scenario tests
   - Mocked dependencies

2. **Coverage Report** - Before/after metrics showing improvement

3. **Run Commands** - Exact commands to execute tests

4. **Notes** - Testing strategy and recommendations

## Related Commands

- [/tdd](/claudekit/commands/tdd) - Test-driven development workflow
- [/feature](/claudekit/commands/feature) - Includes test generation
- [/fix](/claudekit/commands/fix) - Includes regression tests
- [/review](/claudekit/commands/review) - Reviews test quality
