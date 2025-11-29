---
title: /changelog
description: Auto-generate changelog entries from git commits with proper categorization
---

# /changelog

Automatically generate beautiful, user-friendly changelogs from your git commit history.

## Purpose

Creates changelog entries by:
- Analyzing git commit messages
- Categorizing changes by type
- Generating user-friendly descriptions
- Linking to PRs and issues
- Following [Keep a Changelog](https://keepachangelog.com/) format

Perfect for release notes, version documentation, and keeping users informed.

## Usage

```bash
/changelog [version or range]
```

**Generate for latest changes:**
```bash
/changelog
```

**Generate for specific version:**
```bash
/changelog v1.2.0
```

**Generate since last tag:**
```bash
/changelog since:v1.1.0
```

## Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `[version]` | Version number for release | `v1.2.0`, `2.0.0` |
| `since:[tag]` | Changes since specific tag | `since:v1.1.0` |
| `[date]` | Changes since date | `since:2024-01-01` |
| (none) | Changes since last tag | `/changelog` |

## Workflow

### Step 1: Analyze Commits

Retrieves commits in the specified range:

```bash
# Since last tag
git describe --tags --abbrev=0
git log [last-tag]..HEAD --oneline

# Or custom range
git log v1.1.0..HEAD --oneline
```

### Step 2: Categorize Changes

Groups commits by type:

| Category | Commit Types | Description |
|----------|-------------|-------------|
| **Added** | `feat` | New features |
| **Changed** | `refactor`, `perf` | Improvements, changes |
| **Fixed** | `fix` | Bug fixes |
| **Removed** | `remove` | Removed features |
| **Security** | `security` | Security fixes |
| **Deprecated** | `deprecate` | Deprecations |

### Step 3: Generate User-Friendly Descriptions

Transforms technical commits into readable descriptions:

**Commit:**
```
feat(auth): add OAuth2 support for Google and GitHub providers
```

**Changelog entry:**
```
- OAuth2 authentication support for Google and GitHub (#123)
```

### Step 4: Link References

Automatically links:
- Pull requests: `(#123)`
- Issues: References `Closes #456` → Links to #456
- Commits: Links to full commit hash

## Examples

### Generate Latest Version

```bash
/changelog v1.2.0
```

**Output:**
```markdown
## [1.2.0] - 2024-01-15

### Added
- OAuth2 authentication support for Google and GitHub (#123)
- Dark mode theme switching (#125)
- Export data feature for user profiles (#127)
- Real-time notifications using WebSockets (#130)

### Changed
- Improved database query performance by 40% (#124)
- Updated user interface with modern design (#126)
- Migrated from REST to GraphQL for better flexibility (#129)

### Fixed
- Null pointer crash in user profile endpoint (#122)
- Memory leak in WebSocket connections (#128)
- Timezone display issues in date formatting (#131)

### Security
- Patched XSS vulnerability in comment system (#132)
- Updated authentication token generation (#133)
```

### Generate Since Last Tag

```bash
/changelog
```

Automatically finds last tag and generates changelog from there:

```markdown
## [Unreleased]

### Added
- New export functionality (#142)

### Fixed
- Bug in date picker component (#143)
```

### Generate Since Specific Tag

```bash
/changelog since:v1.1.0
```

```markdown
## [1.2.0] - 2024-01-15

Changes since v1.1.0 (released 2023-12-01)

### Added
- Feature A (#140)
- Feature B (#141)

### Changed
- Improvement A (#145)

### Fixed
- Bug A (#146)
- Bug B (#147)

**Full Changelog**: https://github.com/org/repo/compare/v1.1.0...v1.2.0
```

### Generate Since Date

```bash
/changelog since:2024-01-01
```

```markdown
## Changes Since 2024-01-01

### Added
- Features added this month

### Fixed
- Bugs fixed this month
```

### Full Release Example

Major version release with breaking changes:

```bash
/changelog v2.0.0
```

```markdown
## [2.0.0] - 2024-01-15

### ⚠️ BREAKING CHANGES
- Authentication API changed from v1 to v2 (#150)
- Database schema updated - migration required (#151)
- Minimum Node.js version now 18+ (#152)

### Added
- New GraphQL API with comprehensive schema (#153)
- Advanced search with filters and sorting (#154)
- User roles and permissions system (#155)

### Changed
- Complete UI redesign with improved UX (#156)
- Migrated to TypeScript for better type safety (#157)
- Updated all dependencies to latest versions (#158)

### Fixed
- Multiple security vulnerabilities patched (#159)
- Performance issues under high load (#160)

### Removed
- Legacy REST API endpoints (deprecated in v1.5) (#161)
- Internet Explorer support (#162)

### Migration Guide
See [MIGRATION.md](./MIGRATION.md) for upgrade instructions.

**Full Changelog**: https://github.com/org/repo/compare/v1.9.0...v2.0.0
```

## Changelog Format

Follows [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Features in development

## [1.2.0] - 2024-01-15

### Added
- New features in this version

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security patches

## [1.1.0] - 2023-12-01

...

[Unreleased]: https://github.com/org/repo/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/org/repo/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/org/repo/releases/tag/v1.1.0
```

## Output

After generating the changelog:

```markdown
## Changelog Generated

**Version**: v1.2.0
**Date**: 2024-01-15
**Commits Analyzed**: 23

### Summary
- **Added**: 4 features
- **Changed**: 3 improvements
- **Fixed**: 5 bugs
- **Security**: 2 patches

### File Updated
`CHANGELOG.md` - New section added at top

### Next Steps
1. Review generated changelog
2. Edit for clarity if needed
3. Commit the changelog
4. Tag the release
```

## Integration with Releases

### Create Release with Changelog

```bash
# Generate changelog
/changelog v1.2.0

# Create git tag
git tag -a v1.2.0 -m "Release v1.2.0"

# Push tag
git push origin v1.2.0

# Create GitHub release
gh release create v1.2.0 \
  --title "Version 1.2.0" \
  --notes-file CHANGELOG.md
```

### Automated Release Notes

The changelog can be used for:
- GitHub Releases
- GitLab Release Notes
- NPM package releases
- Documentation sites
- Email announcements

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--format=[style]` | Output format | `/changelog --format=github v1.2.0` |
| `--output=[file]` | Output file | `/changelog --output=RELEASE.md` |
| `--template=[file]` | Custom template | `/changelog --template=.github/changelog.md` |
| `--include-authors` | Include contributor names | `/changelog --include-authors` |

## Format Options

### Standard (Keep a Changelog)
```markdown
### Added
- Feature description (#123)
```

### GitHub Release
```markdown
## What's Changed
* Feature description by @username in #123
```

### Compact
```markdown
- Add: Feature description (#123)
- Fix: Bug description (#124)
```

## Commit Message Requirements

For best results, use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Examples:**
```
feat(auth): add OAuth2 support
fix(api): handle null users
docs(readme): update installation
refactor(db): optimize queries
```

## Related Commands

- [/ship](/claudekit/commands/ship/) - Ship with auto-generated commits
- [/commit](/claudekit/commands/commit/) - Create conventional commits
- [/deploy](/claudekit/commands/deploy/) - Deploy with release notes

## Tips

**Use conventional commits**: The better your commit messages, the better the generated changelog.

**Review before committing**: Always review and edit the generated changelog for clarity.

**Link to issues**: Reference issues in commits to auto-link in changelog.

**Keep it user-focused**: Edit technical language to be user-friendly.

**Group related changes**: Combine similar commits into single changelog entries.

**Highlight breaking changes**: Always call out breaking changes prominently.

**Update regularly**: Generate changelog with each release, don't let it get stale.

**Include migration guides**: For breaking changes, link to migration documentation.

## Customization

Modify changelog behavior in `CLAUDE.md`:

```markdown
## Changelog Settings

### Format
- Style: Keep a Changelog
- Include authors: Yes
- Link format: GitHub

### Categories
- Added: feat
- Changed: refactor, perf
- Fixed: fix
- Security: security

### Template
Use custom template from `.github/changelog-template.md`
```
