import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov', 'json-summary'],
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/main.tsx',
          'src/App.tsx',
          'src/components/AccessibilityPanel.tsx',
          'src/components/CardiovascularJourney.tsx',
          'src/components/SiteFooter.tsx',
          'src/components/SiteHeader.tsx',
          'src/components/ServicePhoneMockup.tsx',
          'src/lib/routing.ts',
          'src/test/**',
          '**/*.d.ts',
        ],
        thresholds: {
        lines: 80,
        functions: 40,
        branches: 50,
        statements: 80,
      },
    },
  },
})
