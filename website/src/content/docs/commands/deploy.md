---
title: /deploy
description: Deploy your application to staging or production with comprehensive safety checks
---

# /deploy

Safe, automated deployments with built-in validation, health checks, and rollback capabilities.

## Purpose

Handles deployment workflow including:
- Pre-deployment validation
- Build verification
- Security scanning
- Environment-specific deployment
- Post-deployment health checks
- Monitoring and rollback

Ensures safe deployments with comprehensive checks at every stage.

## Usage

```bash
/deploy [environment]
```

## Arguments

| Argument | Description |
|----------|-------------|
| `staging` | Deploy to staging environment |
| `production` | Deploy to production (requires confirmation) |
| `preview` | Deploy to preview/ephemeral environment |

## Workflow

### Pre-Deploy Checks

Before any deployment, the command validates:

#### 1. Build Verification

**Python projects:**
```bash
python -m build
python -m pytest
```

**Node.js projects:**
```bash
pnpm build
pnpm test
```

**Validation:**
- [ ] Build completes successfully
- [ ] No build warnings
- [ ] Build artifacts are generated
- [ ] Output size is reasonable

#### 2. Run Tests

Executes full test suite:

```bash
# Python
pytest -v --cov=src --cov-report=term

# Node.js
pnpm test
pnpm test:e2e
```

**Requirements:**
- [ ] All tests pass
- [ ] Coverage meets threshold (80%+)
- [ ] No skipped tests
- [ ] E2E tests pass

#### 3. Security Scan

Checks for vulnerabilities:

**Node.js:**
```bash
npm audit --audit-level=high
pnpm audit --audit-level=high
```

**Python:**
```bash
pip-audit
safety check
```

**Validation:**
- [ ] No high/critical vulnerabilities
- [ ] Dependencies are up to date
- [ ] No known security issues

#### 4. Environment Verification

**Staging:**
- [ ] Staging branch is up to date
- [ ] No merge conflicts
- [ ] Environment variables configured

**Production:**
- [ ] Production branch matches main/master
- [ ] All PRs merged and approved
- [ ] Release notes prepared
- [ ] Rollback plan ready

### Deploy Process

#### Staging Deployment

Automated deployment to staging:

```bash
# Build for staging
pnpm build:staging

# Deploy to staging environment
# (Implementation depends on your hosting)
```

**Common platforms:**

**Vercel:**
```bash
vercel deploy --prod=false
```

**Cloudflare Pages:**
```bash
wrangler pages deploy dist --project-name=app-staging
```

**AWS:**
```bash
aws deploy create-deployment \
  --application-name my-app \
  --deployment-group-name staging
```

**Heroku:**
```bash
git push heroku-staging main
```

#### Production Deployment

**Requires explicit confirmation:**

```
⚠️  Production Deployment
This will deploy to production environment.

Environment: production
Version: v1.2.3
Commits: 15 new commits since last deploy

Continue? (yes/no):
```

**After confirmation:**

```bash
# Tag release
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3

# Build for production
pnpm build:production

# Deploy
# (Platform-specific deployment)
```

### Post-Deploy Validation

After deployment, automated checks run:

#### 1. Health Checks

```bash
# Check application health
curl https://app.example.com/health

# Expected response:
{
  "status": "healthy",
  "version": "v1.2.3",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### 2. Smoke Tests

Essential functionality tests:

- [ ] Homepage loads
- [ ] API endpoints respond
- [ ] Authentication works
- [ ] Database connection active
- [ ] Critical features functional

#### 3. Monitor Logs

Watch for errors:

```bash
# Check recent logs
# (Platform-specific log viewing)

# Look for:
# - Error patterns
# - Performance issues
# - Unexpected warnings
```

## Examples

### Deploy to Staging

```bash
/deploy staging
```

**Output:**
```markdown
## Deployment Started

**Environment**: staging
**Version**: main@abc1234
**Time**: 2024-01-15 10:30:00 UTC

### Pre-Deploy Checks
- [x] Build successful
- [x] Tests passing (127 tests)
- [x] Security scan clean
- [x] Environment variables verified

### Deploying...
- [x] Build artifacts created
- [x] Uploading to staging
- [x] Deployment complete

### Post-Deploy Checks
- [x] Health check passed
- [x] Smoke tests passed
- [x] No errors in logs

## Deployment Complete

**URL**: https://staging.example.com
**Status**: Healthy
**Response Time**: 234ms

### Next Steps
1. Test the staging deployment
2. Verify all features work
3. Deploy to production when ready
```

### Deploy to Production

```bash
/deploy production
```

**Interactive confirmation:**
```markdown
⚠️  Production Deployment

**Environment**: production
**Version**: v1.2.3
**Branch**: main

### Changes Since Last Deploy
- feat(auth): add OAuth2 support (#123)
- fix(api): handle null users (#124)
- perf(db): optimize queries (#125)

**15 commits** | **5 PRs** | **3 contributors**

### Pre-Deploy Checklist
- [x] All tests passing
- [x] Security scan clean
- [x] Changelog updated
- [x] Team notified

Continue with production deployment? (yes/no): yes
```

**After confirmation:**
```markdown
## Deployment Started

**Environment**: production
**Version**: v1.2.3
**Time**: 2024-01-15 14:30:00 UTC

### Pre-Deploy Checks
- [x] Build successful
- [x] Tests passing (127 tests)
- [x] Security scan clean
- [x] Release tagged

### Deploying...
- [x] Build artifacts created
- [x] Uploading to production
- [x] Deployment complete
- [x] Cache invalidated

### Post-Deploy Checks
- [x] Health check passed
- [x] Smoke tests passed
- [x] Performance metrics normal
- [x] No errors in logs

## Deployment Complete

**URL**: https://example.com
**Version**: v1.2.3
**Status**: Healthy
**Response Time**: 189ms

### Monitoring
- [ ] Watch error rates (5 min)
- [ ] Monitor performance (15 min)
- [ ] Check user feedback

### Rollback Plan
If issues occur:
```bash
/deploy rollback v1.2.2
```
```

### Deploy to Preview

For preview deployments (PR previews):

```bash
/deploy preview
```

Creates ephemeral environment for testing:

```markdown
## Preview Deployment

**Environment**: preview-pr-123
**Branch**: feature/new-ui
**URL**: https://preview-pr-123.example.com

### Status
- [x] Deployed successfully
- [x] Ready for testing

**Expires**: 7 days
```

## Output

Standard deployment output includes:

```markdown
## Deployment Complete

**Environment**: staging
**Version**: v1.2.3
**URL**: https://staging.example.com

### Checks
- [x] Build successful
- [x] Tests passing
- [x] Security scan clean
- [x] Health check passed

### Metrics
- **Build Time**: 2m 34s
- **Deploy Time**: 1m 12s
- **Total Time**: 3m 46s
- **Response Time**: 234ms

### Next Steps
1. Test deployment
2. Monitor logs
3. Verify functionality
```

## Rollback

If deployment issues occur:

```bash
/deploy rollback [version]
```

**Example:**
```bash
/deploy rollback v1.2.2
```

Reverts to previous version with zero-downtime.

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--skip-tests` | Skip test execution | `/deploy staging --skip-tests` |
| `--force` | Skip confirmations (dangerous!) | `/deploy production --force` |
| `--dry-run` | Simulate deployment | `/deploy production --dry-run` |
| `--tag=[version]` | Specify release tag | `/deploy production --tag=v1.3.0` |

## Environment Configuration

Configure deployment settings in `CLAUDE.md`:

```markdown
## Deployment

### Staging
- **URL**: https://staging.example.com
- **Platform**: Vercel
- **Branch**: main
- **Auto-deploy**: Yes

### Production
- **URL**: https://example.com
- **Platform**: Vercel
- **Branch**: main
- **Auto-deploy**: No (manual approval)
- **Confirmation**: Required

### Checks
- Required: tests, security scan, build
- Optional: performance benchmarks
```

## Related Commands

- [/ship](/claudekit/commands/ship/) - Commit and create PR
- [/test](/claudekit/commands/test/) - Run tests
- [/changelog](/claudekit/commands/changelog/) - Generate release notes

## Tips

**Test on staging first**: Always deploy to staging before production.

**Use dry-run**: Preview what will happen with `--dry-run` flag.

**Monitor after deploy**: Watch logs and metrics for at least 15 minutes after production deploys.

**Have a rollback plan**: Know how to quickly revert if issues occur.

**Automate staging**: Let staging deploy automatically, but keep production manual.

**Tag releases**: Use semantic versioning for production releases.

**Update changelog**: Keep changelog current with each production deployment.

**Notify team**: Alert team before production deployments.
