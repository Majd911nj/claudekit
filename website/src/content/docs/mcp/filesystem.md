---
title: Filesystem
description: Secure file operations with access controls.
---

# Filesystem

Filesystem MCP enables secure file operations with configurable access boundaries. It complements Claude Code's built-in file handling with additional capabilities.

## Configuration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

The last argument (`.`) specifies the allowed directory. Claude can only access files within this directory.

### Access Control Examples

```json
// Allow entire project
"args": ["-y", "@modelcontextprotocol/server-filesystem", "."]

// Allow only src directory
"args": ["-y", "@modelcontextprotocol/server-filesystem", "./src"]

// Allow multiple directories
"args": ["-y", "@modelcontextprotocol/server-filesystem", "./src", "./tests"]
```

## Available Tools

### Reading

| Tool | Description |
|------|-------------|
| `read_file` | Read file contents |
| `read_multiple_files` | Read multiple files at once |
| `get_file_info` | Get file metadata (size, modified, etc.) |

### Writing

| Tool | Description |
|------|-------------|
| `write_file` | Write content to file |
| `edit_file` | Make targeted edits to file |

### Directory Operations

| Tool | Description |
|------|-------------|
| `list_directory` | List directory contents |
| `directory_tree` | Get full directory tree |
| `create_directory` | Create new directory |

### File Management

| Tool | Description |
|------|-------------|
| `move_file` | Move or rename files |
| `search_files` | Search for files by pattern |

## Use Cases

### Project Indexing

```
/index
```
Filesystem:
1. Uses `directory_tree` to scan project
2. Uses `list_directory` for detailed info
3. Uses `get_file_info` for file metadata

### Bulk Operations

```
/refactor Move utilities to shared folder
```
Filesystem:
1. Uses `search_files` to find utility files
2. Uses `move_file` to relocate them
3. Uses `read_file` to update imports

### Test File Management

```
/test Generate tests for auth service
```
Filesystem:
1. Uses `directory_tree` to find test directories
2. Uses `search_files` to find existing tests
3. Uses `write_file` to create new test files

## Command Integration

| Command | How Filesystem Helps |
|---------|---------------------|
| `/index` | Scans project structure |
| `/feature` | Creates new files in correct locations |
| `/test` | Manages test file creation |
| `/refactor` | Moves and reorganizes files |

## Example Workflow

### Scanning Project

```javascript
// Get project structure
directory_tree(".")
→ Returns hierarchical view of all files

// Get specific directory contents
list_directory("./src/services")
→ Returns files with metadata

// Search for patterns
search_files("*.test.ts")
→ Returns all test files
```

### File Operations

```javascript
// Read file
read_file("./src/auth/service.ts")
→ Returns file contents

// Write new file
write_file("./src/auth/types.ts", "export interface User {...}")
→ Creates new file

// Move file
move_file("./src/utils/helper.ts", "./src/shared/helper.ts")
→ Relocates file
```

## Security

### Access Boundaries

Filesystem respects the configured directory boundaries:
- Cannot read files outside allowed directories
- Cannot write to system directories
- Cannot access parent directories with `../`

### Best Practices

1. **Limit scope** — Only allow directories needed for the task
2. **Use project root** — `.` is usually sufficient
3. **Avoid sensitive paths** — Don't allow access to credentials or secrets

## Comparison with Built-in Tools

| Feature | Built-in | Filesystem MCP |
|---------|----------|----------------|
| Read files | ✓ | ✓ |
| Write files | ✓ | ✓ |
| Directory tree | Limited | Full tree view |
| File search | Via Glob | Pattern search |
| Bulk operations | Sequential | Batch capable |
| Access control | Permission-based | Directory-based |

## Troubleshooting

### Permission Denied

If operations fail:
1. Check allowed directory in configuration
2. Verify file permissions
3. Ensure path is within allowed scope

### File Not Found

If search returns empty:
1. Verify file exists
2. Check file extension in pattern
3. Confirm path is relative to allowed directory

### Path Issues

Always use forward slashes and relative paths:
- "./src/file.ts" not ".\src\file.ts"
- Avoid absolute paths

## Resources

- [MCP Filesystem Server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- [File System Security Best Practices](https://owasp.org/www-community/vulnerabilities/Path_Traversal)
