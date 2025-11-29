---
title: /tdd
description: Test-driven development workflow - write failing tests first, then implement
---

# /tdd - Test-Driven Development Workflow

## Purpose

Start a strict test-driven development (TDD) workflow where you write failing tests first, then implement code to make them pass. Enforces the Red-Green-Refactor cycle with mandatory verification.

## Usage

```bash
/tdd [feature or function description]
```

## Arguments

- `[feature description]` - What you want to build using TDD
- `[function name]` - Specific function to develop with TDD

## How It Works

The `/tdd` command enforces a strict 4-phase TDD workflow:

### Phase 1: Red - Write Failing Tests

1. **Understand Requirements**
   - What should the code do?
   - What are the inputs and outputs?
   - What edge cases exist?
   - What errors should be handled?

2. **Write Tests First**
   ```python
   def test_feature_does_expected_thing():
       """Test the main functionality."""
       result = feature("input")
       assert result == "expected"

   def test_feature_handles_edge_case():
       """Test edge case behavior."""
       result = feature("")
       assert result == "default"

   def test_feature_raises_on_invalid():
       """Test error handling."""
       with pytest.raises(ValueError):
           feature(None)
   ```

3. **Run Tests (Expect Failure)**
   ```bash
   pytest -v  # Should FAIL - feature() doesn't exist yet
   ```

**Non-Negotiable Rule**: NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST

### Phase 2: Green - Make Tests Pass

1. **Implement Minimal Code**
   - Write just enough code to pass tests
   - Don't add extra features
   - Don't optimize prematurely
   - Keep it simple

2. **Run Tests (Expect Success)**
   ```bash
   pytest -v  # Should PASS - all tests green
   ```

3. **Verify Every Claim**
   - Don't say "tests should pass"
   - Run the actual command
   - Read the complete output
   - Verify it matches your claim

### Phase 3: Refactor

1. **Improve Code Quality**
   - Clean up implementation
   - Remove duplication
   - Improve naming
   - Apply patterns

2. **Run Tests (Ensure Still Passing)**
   ```bash
   pytest -v  # Should still PASS
   ```

3. **Keep Tests Green**
   - Never break tests during refactoring
   - If tests fail, revert and try again
   - Tests are your safety net

### Phase 4: Repeat

Add more test cases and repeat the cycle:
1. Write next failing test
2. Make it pass
3. Refactor if needed
4. Commit

## TDD Best Practices

### DO
- ✅ Write one test at a time
- ✅ Run tests after every change
- ✅ Keep red-green-refactor cycles short (minutes, not hours)
- ✅ Commit after each green phase
- ✅ Test behavior, not implementation
- ✅ Start with simplest test cases

### DON'T
- ❌ Write production code before tests
- ❌ Write multiple tests before implementing
- ❌ Skip running tests
- ❌ Keep code that makes tests pass without running them
- ❌ Use vague language like "should work" or "probably passes"

## Strict TDD Rules

Based on `.claude/skills/methodology/test-driven-development/SKILL.md`:

### Rule 1: No Production Code Without Failing Test

**WRONG:**
```
"Let me write the function first, then add tests"
"I'll implement it and test as I go"
```

**RIGHT:**
```
1. Write test that calls feature()
2. Run test - watch it FAIL
3. Write feature() to make test PASS
4. Run test - watch it PASS
```

### Rule 2: If You Already Wrote Code, Delete It

If you accidentally wrote production code before tests:

**WRONG:**
```
"I'll keep this code as reference while writing tests"
"Let me comment it out for now"
```

**RIGHT:**
```
Delete the code completely.
Write the test.
Rewrite the implementation.
```

### Rule 3: Verify Before Claiming

Based on `.claude/skills/methodology/verification-before-completion/SKILL.md`:

Before saying "tests pass":

1. **Identify** the exact command to run tests
2. **Execute** it completely and freshly
3. **Read** the complete output
4. **Verify** output matches your claim
5. **Only then** make the claim

**Forbidden Language:**
- ❌ "should work"
- ❌ "probably fixed"
- ❌ "seems to pass"
- ❌ "tests should pass"

**Required Language:**
- ✅ "Tests pass: [paste output]"
- ✅ "Verified by running: [command]"

## Testing Anti-Patterns to Avoid

Based on `.claude/skills/methodology/testing-anti-patterns/SKILL.md`:

### 1. Testing Mock Behavior

**WRONG:**
```python
def test_sends_email():
    mock_mailer = Mock()
    send_email(mock_mailer, "test@example.com")
    mock_mailer.send.assert_called_once()  # Testing mock, not code!
```

**RIGHT:**
```python
def test_sends_email():
    mailer = FakeMailer()  # Real implementation
    send_email(mailer, "test@example.com")
    assert mailer.sent_emails[0].to == "test@example.com"
```

### 2. Test-Only Methods in Production

**WRONG:**
```python
class User:
    def __init__(self, name):
        self.name = name

    def set_id_for_testing(self, id):  # Only for tests!
        self.id = id
```

**RIGHT:**
```python
class User:
    def __init__(self, name, id=None):
        self.name = name
        self.id = id or generate_id()

# Test uses real constructor
user = User("John", id="test-id-123")
```

### 3. Incomplete Mocks

**WRONG:**
```typescript
const mockDb = {
  findUser: vi.fn()
  // Missing other methods that will be called!
};
```

**RIGHT:**
```typescript
const mockDb: Database = {
  findUser: vi.fn(),
  saveUser: vi.fn(),
  deleteUser: vi.fn(),
  // All methods implemented
};
```

## Example TDD Session

### Input
```bash
/tdd "Create a password validator that checks strength"
```

### Output

```markdown
## TDD Session: Password Validator

### Phase 1: RED - Write Failing Test

Created `tests/test_password_validator.py`:

```python
import pytest
from src.password_validator import validate_password

def test_validates_strong_password():
    """Test that strong password passes validation."""
    result = validate_password("StrongP@ss123")
    assert result is True

def test_rejects_short_password():
    """Test that short password fails."""
    with pytest.raises(ValueError, match="too short"):
        validate_password("weak")

def test_rejects_password_without_numbers():
    """Test that password without numbers fails."""
    with pytest.raises(ValueError, match="must contain number"):
        validate_password("NoNumbers!")
```

Running tests:
```bash
$ pytest tests/test_password_validator.py -v

test_password_validator.py::test_validates_strong_password FAILED
  ModuleNotFoundError: No module named 'src.password_validator'
```

✅ Tests FAIL as expected (module doesn't exist)

---

### Phase 2: GREEN - Make Tests Pass

Created `src/password_validator.py`:

```python
import re

MIN_LENGTH = 8

def validate_password(password: str) -> bool:
    """
    Validate password strength.

    Args:
        password: Password to validate

    Returns:
        True if password is strong

    Raises:
        ValueError: If password doesn't meet requirements
    """
    if len(password) < MIN_LENGTH:
        raise ValueError(f"Password too short (minimum {MIN_LENGTH})")

    if not re.search(r'\d', password):
        raise ValueError("Password must contain number")

    if not re.search(r'[A-Z]', password):
        raise ValueError("Password must contain uppercase letter")

    if not re.search(r'[!@#$%^&*]', password):
        raise ValueError("Password must contain special character")

    return True
```

Running tests:
```bash
$ pytest tests/test_password_validator.py -v

test_password_validator.py::test_validates_strong_password PASSED
test_password_validator.py::test_rejects_short_password PASSED
test_password_validator.py::test_rejects_password_without_numbers PASSED

====== 3 passed in 0.12s ======
```

✅ All tests PASS

---

### Phase 3: REFACTOR - Improve Code

Extracted validation rules into separate functions:

```python
import re
from typing import List

MIN_LENGTH = 8
REQUIRED_PATTERNS = [
    (r'\d', "number"),
    (r'[A-Z]', "uppercase letter"),
    (r'[!@#$%^&*]', "special character"),
]

def validate_password(password: str) -> bool:
    """Validate password strength."""
    check_length(password)
    check_required_patterns(password)
    return True

def check_length(password: str) -> None:
    """Check password meets minimum length."""
    if len(password) < MIN_LENGTH:
        raise ValueError(f"Password too short (minimum {MIN_LENGTH})")

def check_required_patterns(password: str) -> None:
    """Check password contains required character types."""
    for pattern, name in REQUIRED_PATTERNS:
        if not re.search(pattern, password):
            raise ValueError(f"Password must contain {name}")
```

Running tests:
```bash
$ pytest tests/test_password_validator.py -v

====== 3 passed in 0.11s ======
```

✅ Tests still PASS after refactoring

---

### Phase 4: REPEAT - Add More Tests

Added edge case test:

```python
def test_rejects_empty_password():
    """Test that empty password fails."""
    with pytest.raises(ValueError, match="too short"):
        validate_password("")
```

```bash
$ pytest tests/test_password_validator.py -v

====== 4 passed in 0.13s ======
```

✅ New test passes immediately (covered by existing implementation)

---

### Cycle Summary
- **Red**: 3 tests written, all failed initially ✅
- **Green**: Implementation created, all tests pass ✅
- **Refactor**: Extracted helper functions, tests still pass ✅
- **Repeat**: Added edge case test ✅

### Final Stats
- Tests: 4 (all passing)
- Coverage: 100%
- Lines of code: 28
- Complexity: Low (simple functions)
```

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--strict` | Extra strict TDD enforcement | `--strict` |
| `--framework=[fw]` | Specify test framework | `--framework=vitest` |
| `--format=[fmt]` | Output format (concise/detailed) | `--format=concise` |

### Flag Examples

```bash
# Strict TDD with verbose output
/tdd --strict --format=detailed "user authentication"

# TDD with specific framework
/tdd --framework=jest "form validation"
```

## Deliverables

After a TDD session, you receive:

1. **Test File** - Complete test suite written first
2. **Implementation** - Minimal code that passes tests
3. **Verification** - Proof that tests failed then passed
4. **Refactored Code** - Clean, well-structured implementation
5. **Coverage Report** - Typically 100% for TDD code

## Related Commands

- [/test](/claudekit/commands/test) - Generate tests for existing code
- [/feature](/claudekit/commands/feature) - Full feature workflow
- [/fix](/claudekit/commands/fix) - Fix bugs with regression tests
- [/refactor](/claudekit/commands/refactor) - Refactor while keeping tests green
