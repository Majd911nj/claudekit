---
title: Playwright
description: Browser automation for testing and web interaction.
---

# Playwright

Playwright MCP provides browser automation using accessibility tree for fast, LLM-friendly interaction. Built by Microsoft, it enables cross-browser testing without vision models.

## Configuration

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

### Command-Line Options

| Option | Description | Example |
|--------|-------------|---------|
| `--browser` | Browser to use | `chrome`, `firefox`, `webkit`, `msedge` |
| `--headless` | Run without UI | Flag only |
| `--viewport-size` | Window size | `1280x720` |
| `--device` | Device emulation | `iPhone 15`, `Pixel 7` |

**Example with options:**
```json
{
  "playwright": {
    "command": "npx",
    "args": ["-y", "@playwright/mcp", "--browser", "chrome", "--headless"]
  }
}
```

## Available Tools

### Navigation

| Tool | Description |
|------|-------------|
| `browser_navigate` | Go to a URL |
| `browser_go_back` | Navigate back |
| `browser_go_forward` | Navigate forward |
| `browser_wait` | Wait for page load |

### Interaction

| Tool | Description |
|------|-------------|
| `browser_click` | Click element |
| `browser_type` | Type text |
| `browser_fill` | Fill input field |
| `browser_select_option` | Select dropdown option |
| `browser_press_key` | Press keyboard key |

### Content

| Tool | Description |
|------|-------------|
| `browser_snapshot` | Get accessibility tree |
| `browser_take_screenshot` | Capture screenshot |
| `browser_get_text` | Get element text |

### Tabs

| Tool | Description |
|------|-------------|
| `browser_tab_list` | List open tabs |
| `browser_tab_new` | Open new tab |
| `browser_tab_select` | Switch to tab |
| `browser_tab_close` | Close tab |

## Use Cases

### E2E Testing

```
/test e2e Login flow should redirect to dashboard
```
Playwright:
1. Navigates to login page
2. Fills credentials
3. Clicks submit
4. Verifies dashboard redirect

### UI Review

```
/review Visual regression on mobile
```
Playwright:
1. Opens page with device emulation
2. Takes screenshots
3. Compares with expected layout

### Form Testing

```
/test Form validation for user registration
```
Playwright:
1. Fills form with various inputs
2. Tests validation messages
3. Verifies submission behavior

## Command Integration

| Command | How Playwright Helps |
|---------|---------------------|
| `/test` | E2E browser tests |
| `/fix` | Reproduce UI bugs in browser |
| `/review` | Visual verification of changes |
| `/feature` | Test new UI features |

## Example Workflow

### Testing Login Flow

```javascript
// Playwright MCP workflow
browser_navigate("https://app.example.com/login")
browser_fill("#email", "test@example.com")
browser_fill("#password", "password123")
browser_click("#login-button")
browser_wait()  // Wait for navigation
browser_take_screenshot("after-login.png")
```

### Mobile Testing

```javascript
// With device emulation (--device "iPhone 15")
browser_navigate("https://app.example.com")
browser_snapshot()  // Get accessibility tree
browser_take_screenshot("mobile-view.png")
```

## Key Features

### Accessibility Tree

Playwright uses the accessibility tree instead of pixels:
- **Faster** — No image processing needed
- **LLM-friendly** — Structured element data
- **Cross-browser** — Works identically everywhere

### Device Emulation

Test on different devices without physical hardware:
- iPhone, iPad, Pixel, Galaxy
- Custom viewport sizes
- Touch vs mouse input

### Profile Management

Playwright can maintain browser state across sessions for authenticated testing.

## Best Practices

### Use Headless Mode

For automated testing, use `--headless` to run without UI overhead.

### Wait for Elements

Always use `browser_wait` or wait for specific elements before interaction.

### Accessibility First

Use accessibility tree (`browser_snapshot`) to understand page structure before clicking.

## Troubleshooting

### Element Not Found

If clicking fails:
1. Use `browser_snapshot` to see available elements
2. Check if element needs scrolling
3. Wait for dynamic content to load

### Browser Not Starting

- Ensure browser is installed
- Check Node.js version (18+)
- Try different browser with `--browser`

## Resources

- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Playwright Documentation](https://playwright.dev)
- [Device Descriptors](https://playwright.dev/docs/emulation#devices)
