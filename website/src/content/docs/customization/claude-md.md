---
title: CLAUDE.md Reference
description: Complete reference for configuring Claude Kit behavior through CLAUDE.md.
---

# CLAUDE.md Reference

`CLAUDE.md` is your project's configuration file. It defines your tech stack, conventions, standards, and how Claude should behave when working on your codebase.

## What is CLAUDE.md?

`CLAUDE.md` is the central configuration file that tells Claude:

- **What** your project uses (tech stack, frameworks, tools)
- **How** your project is organized (architecture, file structure)
- **Why** you make certain decisions (conventions, standards)
- **When** to use specific approaches (agent behavior overrides)

It lives at `.claude/CLAUDE.md` in your project root.

## File Structure Overview

```markdown
# Project Name - Project Context

## Overview
[Brief project description]

## Quick Reference
[Command shortcuts and common tasks]

## Tech Stack
[Languages, frameworks, databases, tools]

## Architecture
[Project structure and organization]

## Code Conventions
[Naming, style, file organization]

## Testing Standards
[Coverage, naming, test types]

## Security Standards
[Forbidden patterns, required practices]

## Git Conventions
[Branch naming, commits, PR requirements]

## Agent Behavior Overrides
[Customize how agents work]

## Behavioral Modes
[Available modes and when to use them]

## Command Flags
[Universal flags and options]

## Environment Configuration
[Dev, test, deployment commands]

## External Integrations
[APIs, services, third-party tools]

## Documentation Standards
[What and how to document]
```

## Complete Section-by-Section Reference

### 1. Overview

Introduce your project:

```markdown
## Overview

This is a SaaS platform for team collaboration built with:
- Next.js frontend
- FastAPI backend
- PostgreSQL database
- Deployed on Cloudflare

Team size: 2 developers
Focus: Speed of development with high quality
```

**What to include:**
- Project purpose
- Team size
- Development priorities

### 2. Quick Reference

List commonly used commands:

```markdown
## Quick Reference

### Core Commands

| Command | Description |
|---------|-------------|
| `/feature [desc]` | Full feature development workflow |
| `/fix [error]` | Smart debugging and bug fix |
| `/review [file]` | Comprehensive code review |
| `/test [scope]` | Generate tests |
| `/ship [msg]` | Commit + PR automation |
```

**What to include:**
- Most-used commands
- Project-specific commands
- Quick task shortcuts

### 3. Tech Stack

Define your technology choices:

```markdown
## Tech Stack

<!-- CUSTOMIZATION POINT: Update for your project -->
- **Languages**: Python 3.11, TypeScript 5.0
- **Backend**: FastAPI 0.104, SQLAlchemy
- **Frontend**: Next.js 14, React 18
- **Database**: PostgreSQL 15
- **Testing**: pytest, Playwright, vitest
- **DevOps**: Docker, GitHub Actions, Cloudflare Pages
- **Tools**: pnpm, black, eslint
```

**What to include:**
- All languages and versions
- Frameworks with versions
- Databases and data stores
- Testing tools
- Deployment platforms
- Development tools

**Why this matters:**
Claude uses this to:
- Choose appropriate syntax
- Suggest compatible libraries
- Follow version-specific patterns
- Load relevant skills

### 4. Architecture

Describe your project structure:

```markdown
## Architecture

<!-- CUSTOMIZATION POINT: Describe your project architecture -->

### Backend (Python/FastAPI)
\`\`\`
backend/
├── api/
│   ├── routes/       # API endpoints
│   ├── models/       # SQLAlchemy models
│   └── schemas/      # Pydantic schemas
├── services/         # Business logic
├── utils/            # Shared utilities
└── tests/            # Test files
\`\`\`

### Frontend (Next.js/React)
\`\`\`
frontend/
├── app/              # App router pages
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── features/    # Feature components
├── lib/             # Utilities and API client
└── tests/           # Component tests
\`\`\`

### Architecture Decisions
- **Monorepo**: Backend and frontend in same repo
- **API-First**: Backend exposes REST API
- **Component Library**: Using shadcn/ui for consistency
```

**What to include:**
- Directory structure
- Architecture patterns
- Key design decisions

**Why this matters:**
Claude uses this to:
- Know where to put new files
- Follow your organization patterns
- Suggest appropriate file locations

### 5. Code Conventions

Define coding standards:

```markdown
## Code Conventions

### Naming Conventions

| Type | Python | TypeScript |
|------|--------|-----------|
| Files | `snake_case.py` | `kebab-case.ts` |
| Functions | `snake_case` | `camelCase` |
| Classes | `PascalCase` | `PascalCase` |
| Constants | `UPPER_SNAKE` | `UPPER_SNAKE` |
| Components | N/A | `PascalCase.tsx` |

### Code Style

**Python:**
- Follow PEP 8
- Use type hints for all functions
- Docstrings for public APIs (Google style)
- Max line length: 88 (Black default)

**TypeScript:**
- Strict mode enabled
- No `any` types (use `unknown`)
- Prefer interfaces over types
- Use named exports

### File Organization

- One component/class per file
- Group related files in feature directories
- Test files adjacent to source: `component.tsx` + `component.test.tsx`
- Index files for clean imports

### Example File Structure
\`\`\`
features/auth/
├── components/
│   ├── LoginForm.tsx
│   └── LoginForm.test.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts
└── index.ts              # Export public API
\`\`\`
```

**What to include:**
- Naming conventions for all types
- Style guide rules
- File organization patterns
- Import/export conventions

**Why this matters:**
Claude uses this to:
- Name files consistently
- Follow your style preferences
- Organize code like your team does

### 6. Testing Standards

Set testing requirements:

```markdown
## Testing Standards

### Coverage Requirements
- **Minimum coverage**: 80%
- **Critical paths**: 95% (auth, payments, data processing)
- **New features**: Must include tests

### Test Naming

**Python (pytest):**
\`\`\`python
def test_[function]_[scenario]_[expected]():
    # Example: test_create_user_with_valid_data_succeeds
\`\`\`

**TypeScript (vitest):**
\`\`\`typescript
describe('[Component]', () => {
  it('should [behavior] when [scenario]', () => {
    // Example: should display error when email is invalid
  });
});
\`\`\`

### Test Types

1. **Unit Tests** (Required)
   - All business logic functions
   - All utility functions
   - Test file naming: `*.test.ts` or `test_*.py`

2. **Integration Tests** (Required)
   - API endpoints
   - Database operations
   - External service integrations

3. **E2E Tests** (For Critical Flows)
   - User authentication
   - Payment processing
   - Core user journeys

### Test Organization

**Python:**
\`\`\`
tests/
├── unit/
├── integration/
└── e2e/
\`\`\`

**TypeScript:**
\`\`\`
src/
├── component.tsx
└── component.test.tsx    # Tests adjacent to code
\`\`\`

### Test Best Practices

- **Arrange-Act-Assert** pattern
- Use fixtures/factories for test data
- Mock external dependencies
- Keep tests independent
- Test edge cases and errors
```

**What to include:**
- Coverage requirements
- Test naming conventions
- Required test types
- Test organization
- Testing best practices

**Why this matters:**
Claude uses this to:
- Generate appropriate tests
- Meet coverage requirements
- Follow your test patterns

### 7. Security Standards

Define security requirements:

```markdown
## Security Standards

### Forbidden Patterns

**Never allow these in code:**
- ❌ Hardcoded secrets or API keys
- ❌ `eval()` or dynamic code execution
- ❌ SQL string concatenation
- ❌ TypeScript `any` types
- ❌ Disabled security headers
- ❌ Raw user input in HTML
- ❌ Unvalidated redirects

### Required Practices

**Always enforce these:**
- ✅ Input validation on all user inputs
- ✅ Output encoding for rendered content
- ✅ Authentication on protected endpoints
- ✅ Rate limiting on public APIs
- ✅ Secrets via environment variables only
- ✅ HTTPS only (no HTTP)
- ✅ CSRF protection on state-changing operations
- ✅ SQL parameterized queries only

### Security Checklist

Before merging code:
- [ ] No secrets in code or commits
- [ ] All inputs validated
- [ ] All outputs encoded
- [ ] Authentication/authorization implemented
- [ ] Rate limiting configured
- [ ] HTTPS enforced
- [ ] Dependencies up to date (no critical CVEs)

### Security Review

**When to trigger security review:**
- Authentication/authorization changes
- Payment processing
- User data handling
- File uploads
- External API integration

**How to request:**
\`\`\`
/review --persona=security src/auth/
\`\`\`
```

**What to include:**
- Forbidden code patterns
- Required security practices
- Security review triggers
- Vulnerability prevention

**Why this matters:**
Claude uses this to:
- Reject insecure code patterns
- Suggest secure alternatives
- Flag security concerns early

### 8. Git Conventions

Define Git workflow:

```markdown
## Git Conventions

### Branch Naming

- `feature/[ticket]-[description]` — New features
- `fix/[ticket]-[description]` — Bug fixes
- `hotfix/[description]` — Emergency fixes
- `chore/[description]` — Maintenance tasks
- `docs/[description]` — Documentation only

**Examples:**
- `feature/AUTH-123-add-oauth`
- `fix/PAY-456-cart-calculation`
- `hotfix/critical-security-patch`

### Commit Messages

Follow conventional commits:

\`\`\`
type(scope): subject

body (optional)

footer (optional)
\`\`\`

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `style` — Formatting, no code change
- `refactor` — Code restructure, no behavior change
- `test` — Adding/updating tests
- `chore` — Build, tools, dependencies

**Examples:**
\`\`\`
feat(auth): add OAuth login support

fix(payment): correct tax calculation for EU customers

docs(api): update authentication examples

refactor(db): extract query builder to separate module
\`\`\`

### PR Requirements

All PRs must have:
- [ ] Descriptive title and description
- [ ] Linked issue/ticket number
- [ ] All tests passing
- [ ] Code review approval (min 1)
- [ ] No merge conflicts
- [ ] Updated documentation (if applicable)

### PR Template

\`\`\`markdown
## Description
[What does this PR do?]

## Related Issue
Fixes #[issue number]

## Changes
- Change 1
- Change 2

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests passing
- [ ] Manually tested

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
\`\`\`
```

**What to include:**
- Branch naming pattern
- Commit message format
- PR requirements
- PR template

**Why this matters:**
Claude uses this to:
- Name branches correctly
- Write proper commit messages
- Create compliant PRs

### 9. Agent Behavior Overrides

Customize how built-in agents work:

```markdown
## Agent Behavior Overrides

<!-- CUSTOMIZATION POINT: Override default agent behaviors -->

### Planner Agent
- **Task Size**: 15-60 minutes (not 2-5 minutes)
- **Always Include**: Testing requirements for each task
- **Flag**: External dependencies and third-party APIs
- **Format**: Checklist with acceptance criteria

### Code-Reviewer Agent
- **Priority**: Security first, then performance, then style
- **Strictness**: Enforce strict typing (no `any`)
- **Coverage**: Flag any code without tests
- **Style**: Auto-fix formatting issues, don't just comment

### Tester Agent
- **Framework**: pytest for Python, vitest for TypeScript
- **Coverage**: Minimum 80%, target 90%
- **Focus**: Edge cases and error scenarios required
- **Integration**: Always include at least one integration test

### Debugger Agent
- **First Step**: Always check logs before proposing fixes
- **Reproduce**: Attempt to reproduce before fixing
- **Tests**: Add regression test for every bug fix
- **Root Cause**: Find root cause, not just symptoms

### Docs-Manager Agent
- **Level**: Write for intermediate developers
- **Format**: Markdown with code examples
- **Required**: API docs for all public functions
- **Examples**: Include at least one example per function
```

**What to include:**
- Which agents to customize
- Specific behavior changes
- Priorities and preferences

**Why this matters:**
Overrides default agent behavior to match your team's workflow.

### 10. Behavioral Modes

Configure available modes:

```markdown
## Behavioral Modes

<!-- CUSTOMIZATION POINT: Configure default mode -->

Modes adjust communication style, output format, and problem-solving approach.

| Mode | Description | Best For |
|------|-------------|----------|
| `default` | Balanced standard behavior | General tasks |
| `brainstorm` | Creative exploration | Design, ideation |
| `token-efficient` | Compressed output | Cost savings |
| `deep-research` | Thorough analysis | Investigation |
| `implementation` | Code-focused | Executing plans |
| `review` | Critical analysis | Code review |
| `pair-programming` | Interactive, explanatory | Learning |

### Mode Activation

\`\`\`bash
/mode brainstorm              # Switch mode for session
/feature --mode=implementation # Override for single command
\`\`\`

Mode files: `.claude/modes/`

### Custom Modes

We've added these custom modes:
- `emergency-debug` — Fast production debugging
- `documentation` — Documentation-focused writing
```

**What to include:**
- Available modes
- When to use each
- Custom modes added

### 11. Command Flags

Document universal flags:

```markdown
## Command Flags

<!-- CUSTOMIZATION POINT: Set default flag values -->

All commands support combinable flags for flexible customization.

### Universal Flags

| Flag | Description | Values |
|------|-------------|--------|
| `--mode=[mode]` | Behavioral mode | default, brainstorm, token-efficient |
| `--depth=[1-5]` | Thoroughness level | 1=quick, 5=exhaustive |
| `--format=[fmt]` | Output format | concise, detailed, json |
| `--save=[path]` | Save output to file | File path |
| `--checkpoint` | Create state checkpoint | Boolean |

### Persona Flags

| Flag | Description |
|------|-------------|
| `--persona=security` | Security-focused analysis |
| `--persona=performance` | Performance-focused analysis |
| `--persona=architecture` | Architecture-focused analysis |

### Examples

\`\`\`bash
/review --persona=security --depth=5 src/auth/
/plan --mode=brainstorm --save=plans/design.md "feature"
/fix --format=concise "error message"
\`\`\`
```

### 12. Environment Configuration

Document development commands:

```markdown
## Environment Configuration

<!-- CUSTOMIZATION POINT: Update for your environments -->

### Development

**Python Backend:**
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

**Node.js Frontend:**
\`\`\`bash
cd frontend
pnpm install
pnpm dev
\`\`\`

### Testing

**Backend:**
\`\`\`bash
pytest -v --cov=src
pytest --cov=src --cov-report=html  # Coverage report
\`\`\`

**Frontend:**
\`\`\`bash
pnpm test              # Unit tests
pnpm test:coverage     # With coverage
pnpm test:e2e          # E2E tests
\`\`\`

### Deployment

**Staging:**
\`\`\`bash
pnpm build
pnpm deploy:staging
\`\`\`

**Production:**
\`\`\`bash
pnpm build
pnpm deploy:production
# Requires manual approval in GitHub Actions
\`\`\`

### Environment Variables

Required variables:

**Backend (.env):**
\`\`\`
DATABASE_URL=postgresql://user:pass@localhost/db
SECRET_KEY=your-secret-key
API_BASE_URL=http://localhost:8000
\`\`\`

**Frontend (.env.local):**
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENV=development
\`\`\`
```

**What to include:**
- Setup commands for each environment
- Test commands
- Deployment procedures
- Required environment variables

### 13. External Integrations

Document external services:

```markdown
## External Integrations

<!-- CUSTOMIZATION POINT: Add your integrations -->

### APIs

**GitHub API**
- Used for: Issue tracking, PR automation
- Auth: Personal access token in `GITHUB_TOKEN`
- Rate limit: 5000 requests/hour

**Stripe API**
- Used for: Payment processing
- Auth: Secret key in `STRIPE_SECRET_KEY`
- Environment: Use test keys in development

### Services

**Database: PostgreSQL**
- Host: `DATABASE_URL` environment variable
- Migrations: `pnpm migrate`
- Backups: Automated daily at 2 AM UTC

**Cache: Redis** (optional)
- Used for: Session storage, rate limiting
- Host: `REDIS_URL` environment variable

**Storage: Cloudflare R2**
- Used for: User uploads, static assets
- Auth: Access key in `R2_ACCESS_KEY`

### Third-Party Libraries

**Critical dependencies:**
- `next-auth` — Authentication
- `prisma` — Database ORM
- `zod` — Validation
- `swr` — Data fetching

**Update policy:**
- Security patches: Apply immediately
- Minor versions: Monthly review
- Major versions: Quarterly planning
```

**What to include:**
- External APIs and auth
- Database and storage services
- Key dependencies
- Update policies

### 14. Documentation Standards

Define documentation requirements:

```markdown
## Documentation Standards

### Code Documentation

**Python:**
- Public functions: Google-style docstrings required
- Complex logic: Inline comments
- Type hints: Required for all functions

\`\`\`python
def calculate_total(items: list[Item], discount: float = 0.0) -> float:
    """
    Calculate total price with optional discount.

    Args:
        items: List of items to calculate total for.
        discount: Discount percentage (0.0 to 1.0).

    Returns:
        Total price after discount.

    Raises:
        ValueError: If discount is not between 0 and 1.
    """
\`\`\`

**TypeScript:**
- Public functions: JSDoc required
- Components: Props interface with comments
- Complex logic: Inline comments

\`\`\`typescript
/**
 * Calculate total price with optional discount.
 *
 * @param items - Items to calculate total for
 * @param discount - Discount percentage (0 to 1)
 * @returns Total price after discount
 * @throws {RangeError} If discount not between 0 and 1
 */
function calculateTotal(items: Item[], discount = 0): number {
\`\`\`

### API Documentation

- OpenAPI/Swagger specs required
- Update with every API change
- Include request/response examples
- Document error responses

### Project Documentation

**README.md:**
- Quick start guide
- Prerequisites
- Setup instructions
- Common commands

**CONTRIBUTING.md:**
- How to contribute
- Code review process
- Testing requirements

**CHANGELOG.md:**
- Keep updated with each release
- Follow Keep a Changelog format
- Group changes by type (Added, Changed, Fixed)
```

**What to include:**
- Code documentation format
- API documentation requirements
- Project documentation files
- Update requirements

## Complete CLAUDE.md Example

Here's a complete, real-world example:

```markdown
# Acme SaaS - Project Context

## Overview

Team collaboration platform with real-time features.
- Team: 2 developers
- Stack: Next.js + FastAPI + PostgreSQL
- Deploy: Cloudflare Pages + Cloudflare Workers

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: FastAPI, Python 3.11, SQLAlchemy
- **Database**: PostgreSQL 15
- **Testing**: pytest, Playwright, vitest
- **DevOps**: Docker, GitHub Actions, Cloudflare

## Code Conventions

### Naming
- Files: `kebab-case.ts`, `snake_case.py`
- Functions: `camelCase` (TS), `snake_case` (Python)
- Classes: `PascalCase`

### Style
- TypeScript: Strict mode, no `any`
- Python: PEP 8, type hints required
- Max line length: 88 (Black)

## Testing Standards

- Coverage minimum: 80%
- Test naming: `test_[function]_[scenario]_[expected]`
- Required: Unit tests for all business logic

## Security Standards

### Forbidden
- No hardcoded secrets
- No SQL concatenation
- No `any` types

### Required
- Input validation
- Authentication on protected routes
- Rate limiting

## Agent Behavior Overrides

### Tester Agent
- Framework: pytest (Python), vitest (TypeScript)
- Coverage: 80% minimum
- Focus: Edge cases required

### Code-Reviewer Agent
- Enforce strict typing
- Security-first reviews
- Flag missing tests

## Environment Configuration

### Development
\`\`\`bash
pnpm install
pnpm dev
\`\`\`

### Testing
\`\`\`bash
pnpm test
\`\`\`
```

## CUSTOMIZATION POINTS

Throughout `CLAUDE.md`, you'll find `<!-- CUSTOMIZATION POINT -->` comments. These mark sections you should customize:

```markdown
## Tech Stack

<!-- CUSTOMIZATION POINT: Update for your project -->
- **Languages**: Your languages here
```

Always customize:
- Tech Stack
- Architecture
- Code Conventions
- Testing Standards
- Agent Behavior Overrides
- Environment Configuration

## Best Practices

### 1. Start Simple

Begin with basics:
- Tech stack
- Basic conventions
- Required testing

Add complexity as needed.

### 2. Keep It Updated

Update `CLAUDE.md` when:
- Adding new technologies
- Changing conventions
- Updating standards
- Learning what works

### 3. Be Specific

```markdown
# Vague: Don't do this
- Write good tests
- Follow best practices

# Specific: Do this
- Unit tests for all business logic (80% coverage)
- Integration tests for all API endpoints
- E2E tests for critical user flows
```

### 4. Use Examples

```markdown
## Commit Messages

Format: `type(scope): subject`

Examples:
- `feat(auth): add OAuth login`
- `fix(cart): correct tax calculation`
```

## Next Steps

- [Customization Overview](/claudekit/customization/overview/) — Start here
- [Creating Commands](/claudekit/customization/creating-commands/) — Add custom workflows
- [Creating Modes](/claudekit/customization/creating-modes/) — Define behaviors
- [Creating Skills](/claudekit/customization/creating-skills/) — Add knowledge

## Getting Help

- See the [template CLAUDE.md](https://github.com/yourusername/claudekit/blob/main/.claude/CLAUDE.md) in the repo
- Check [example configurations](https://github.com/yourusername/claudekit/tree/main/examples) for different project types
- Ask in [discussions](https://github.com/yourusername/claudekit/discussions)
