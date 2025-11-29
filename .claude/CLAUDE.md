# Claude Kit - Project Context Template

## Overview

This is a comprehensive Claude Kit for Claude Code, designed to accelerate development workflows for small teams (1-3 developers) working with Python and JavaScript/TypeScript multi-stack projects.

## Quick Reference

| Command | Description |
|---------|-------------|
| `/feature [desc]` | Full feature development workflow |
| `/fix [error]` | Smart debugging and bug fix |
| `/review [file]` | Comprehensive code review |
| `/test [scope]` | Generate tests |
| `/ship [msg]` | Commit + PR automation |
| `/plan [task]` | Task decomposition |
| `/doc [target]` | Documentation generation |
| `/deploy [env]` | Deployment workflow |

## Tech Stack

<!-- CUSTOMIZATION POINT: Update for your project -->
- **Languages**: Python, TypeScript, JavaScript
- **Backend Frameworks**: FastAPI, Django, NestJS, Express
- **Frontend Frameworks**: Next.js, React
- **Databases**: PostgreSQL, MongoDB
- **Testing**: pytest, vitest, Jest, Playwright
- **DevOps**: Docker, GitHub Actions, Cloudflare

## Architecture

<!-- CUSTOMIZATION POINT: Describe your project architecture -->
```
src/
├── api/          # API endpoints
├── services/     # Business logic
├── models/       # Data models
├── utils/        # Utilities
└── tests/        # Test files
```

## Code Conventions

### Naming Conventions

| Type | Python | TypeScript/JavaScript |
|------|--------|----------------------|
| Files | `snake_case.py` | `kebab-case.ts` |
| Functions | `snake_case` | `camelCase` |
| Classes | `PascalCase` | `PascalCase` |
| Constants | `UPPER_SNAKE` | `UPPER_SNAKE` |
| Components | N/A | `PascalCase.tsx` |

### Code Style

- **Python**: Follow PEP 8, use type hints, docstrings for public APIs
- **TypeScript**: Strict mode enabled, no `any` types, use interfaces
- **JavaScript**: ESLint + Prettier, prefer `const` over `let`

### File Organization

- One component/class per file
- Group related files in feature directories
- Keep test files adjacent to source files or in `tests/` directory

## Testing Standards

### Coverage Requirements
- Minimum coverage: 80%
- Critical paths: 95%

### Test Naming
- **Python**: `test_[function]_[scenario]_[expected]`
- **TypeScript**: `describe('[Component]', () => { it('should [behavior]') })`

### Test Types
1. **Unit tests**: All business logic functions
2. **Integration tests**: API endpoints, database operations
3. **E2E tests**: Critical user flows

## Security Standards

### Forbidden Patterns
- No hardcoded secrets or API keys
- No `eval()` or dynamic code execution
- No SQL string concatenation (use parameterized queries)
- No `any` types in TypeScript
- No disabled security headers

### Required Practices
- Input validation on all user inputs
- Output encoding for all rendered content
- Authentication on all protected endpoints
- Rate limiting on public APIs
- Secrets via environment variables only

## Git Conventions

### Branch Naming
- `feature/[ticket]-[description]`
- `fix/[ticket]-[description]`
- `hotfix/[description]`
- `chore/[description]`

### Commit Messages
```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### PR Requirements
- Descriptive title and description
- Linked to issue/ticket
- All tests passing
- Code review approved
- No merge conflicts

## Agent Behavior Overrides

<!-- CUSTOMIZATION POINT: Override default agent behaviors -->

### Planner Agent
- Break tasks into chunks of 15-60 minutes
- Always identify testing requirements
- Flag external dependencies

### Code-Reviewer Agent
- Enforce strict typing
- Security-first reviews
- Check for test coverage

### Tester Agent
- Prefer pytest for Python, vitest for TypeScript
- Generate edge case tests
- Include error scenario tests

### Debugger Agent
- Check logs first
- Reproduce before fixing
- Add regression tests

## Environment Configuration

<!-- CUSTOMIZATION POINT: Update for your environments -->

### Development
```bash
# Python
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Node.js
pnpm install
pnpm dev
```

### Testing
```bash
# Python
pytest -v --cov=src

# Node.js
pnpm test
pnpm test:coverage
```

### Deployment
```bash
# Build
pnpm build

# Deploy
pnpm deploy:staging
pnpm deploy:production
```

## External Integrations

<!-- CUSTOMIZATION POINT: Add your integrations -->

### APIs
- GitHub API for issue tracking
- Slack for notifications (optional)

### Services
- Database: PostgreSQL / MongoDB
- Cache: Redis (optional)
- Storage: S3 / Cloudflare R2

## Documentation Standards

### Code Documentation
- Public functions: Docstrings required
- Complex logic: Inline comments
- APIs: OpenAPI/Swagger specs

### Project Documentation
- README.md: Quick start guide
- CONTRIBUTING.md: Contribution guidelines
- CHANGELOG.md: Version history

## Troubleshooting

### Common Issues

**Python import errors**
```bash
export PYTHONPATH="${PYTHONPATH}:${PWD}"
```

**Node modules issues**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Database connection**
- Check `.env` file for correct credentials
- Ensure database service is running

---

## Kit Version

- **Claude Kit Version**: 1.0.0
- **Last Updated**: 2025-01-27
- **Compatible with**: Claude Code 1.0+
