// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://duthaho.github.io',
  base: '/claudekit',
  integrations: [
    starlight({
      title: 'Claude Kit',
      description: 'The open-source AI dev toolkit for Claude Code. Ship faster with 27+ commands, 7 modes, and 34+ skills. Free forever.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/duthaho/claudekit' }
      ],
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://duthaho.github.io/claudekit/og-image.png',
          },
        },
      ],
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
            { label: 'Configuration', slug: 'getting-started/configuration' },
          ],
        },
        {
          label: 'Commands',
          collapsed: false,
          items: [
            { label: 'Overview', slug: 'commands/overview' },
            {
              label: 'Development',
              collapsed: true,
              items: [
                { label: '/feature', slug: 'commands/feature' },
                { label: '/fix', slug: 'commands/fix' },
                { label: '/review', slug: 'commands/review' },
                { label: '/test', slug: 'commands/test' },
                { label: '/refactor', slug: 'commands/refactor' },
                { label: '/debug', slug: 'commands/debug' },
                { label: '/tdd', slug: 'commands/tdd' },
              ],
            },
            {
              label: 'Planning',
              collapsed: true,
              items: [
                { label: '/plan', slug: 'commands/plan' },
                { label: '/brainstorm', slug: 'commands/brainstorm' },
                { label: '/execute-plan', slug: 'commands/execute-plan' },
                { label: '/research', slug: 'commands/research' },
              ],
            },
            {
              label: 'Git & Deployment',
              collapsed: true,
              items: [
                { label: '/ship', slug: 'commands/ship' },
                { label: '/commit', slug: 'commands/commit' },
                { label: '/pr', slug: 'commands/pr' },
                { label: '/deploy', slug: 'commands/deploy' },
                { label: '/changelog', slug: 'commands/changelog' },
              ],
            },
            {
              label: 'Documentation',
              collapsed: true,
              items: [
                { label: '/doc', slug: 'commands/doc' },
                { label: '/api-gen', slug: 'commands/api-gen' },
              ],
            },
            {
              label: 'Utilities',
              collapsed: true,
              items: [
                { label: '/mode', slug: 'commands/mode' },
                { label: '/index', slug: 'commands/index-cmd' },
                { label: '/load', slug: 'commands/load' },
                { label: '/checkpoint', slug: 'commands/checkpoint' },
                { label: '/spawn', slug: 'commands/spawn' },
                { label: '/status', slug: 'commands/status' },
                { label: '/help', slug: 'commands/help' },
                { label: '/optimize', slug: 'commands/optimize' },
                { label: '/security-scan', slug: 'commands/security-scan' },
              ],
            },
          ],
        },
        {
          label: 'MCP Integrations',
          collapsed: false,
          items: [
            { label: 'Overview', slug: 'mcp/overview' },
            { label: 'Context7', slug: 'mcp/context7' },
            { label: 'Sequential Thinking', slug: 'mcp/sequential' },
            { label: 'Playwright', slug: 'mcp/playwright' },
            { label: 'Memory', slug: 'mcp/memory' },
            { label: 'Filesystem', slug: 'mcp/filesystem' },
            { label: 'Command Integration', slug: 'mcp/integration' },
          ],
        },
        {
          label: 'Modes',
          collapsed: false,
          items: [
            { label: 'Overview', slug: 'modes/overview' },
            { label: 'Default', slug: 'modes/default' },
            { label: 'Brainstorm', slug: 'modes/brainstorm' },
            { label: 'Token-Efficient', slug: 'modes/token-efficient' },
            { label: 'Deep Research', slug: 'modes/deep-research' },
            { label: 'Implementation', slug: 'modes/implementation' },
            { label: 'Review', slug: 'modes/review' },
            { label: 'Orchestration', slug: 'modes/orchestration' },
          ],
        },
        {
          label: 'Skills',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'skills/overview' },
            {
              label: 'Methodology',
              collapsed: true,
              items: [
                { label: 'Brainstorming', slug: 'skills/methodology/brainstorming' },
                { label: 'Writing Plans', slug: 'skills/methodology/writing-plans' },
                { label: 'Executing Plans', slug: 'skills/methodology/executing-plans' },
                { label: 'TDD', slug: 'skills/methodology/tdd' },
                { label: 'Systematic Debugging', slug: 'skills/methodology/systematic-debugging' },
                { label: 'Code Review', slug: 'skills/methodology/code-review' },
              ],
            },
            {
              label: 'Languages',
              collapsed: true,
              items: [
                { label: 'Python', slug: 'skills/languages/python' },
                { label: 'TypeScript', slug: 'skills/languages/typescript' },
                { label: 'JavaScript', slug: 'skills/languages/javascript' },
              ],
            },
            {
              label: 'Frameworks',
              collapsed: true,
              items: [
                { label: 'React', slug: 'skills/frameworks/react' },
                { label: 'Next.js', slug: 'skills/frameworks/nextjs' },
                { label: 'FastAPI', slug: 'skills/frameworks/fastapi' },
                { label: 'Django', slug: 'skills/frameworks/django' },
              ],
            },
          ],
        },
        {
          label: 'Customization',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'customization/overview' },
            { label: 'Creating Commands', slug: 'customization/creating-commands' },
            { label: 'Creating Modes', slug: 'customization/creating-modes' },
            { label: 'Creating Skills', slug: 'customization/creating-skills' },
            { label: 'CLAUDE.md Reference', slug: 'customization/claude-md' },
          ],
        },
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
