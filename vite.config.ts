/// <reference types="vitest" />

import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            provider: 'istanbul',
            reporter: ['lcov', 'text'],
            exclude: [
                'src/main.tsx',
                'tailwind.config.js',
                '.eslintrc.cjs',
                'src/components/ui/**',
                'dist',
                '**/*.test.tsx',
                'src/components/common/SecurityGate.tsx',
                'src/routes/workout/start/Rest.tsx',
                'src/components/common/Stats.tsx',
                'src/components/common/ErrorPage.tsx',
            ],
        },
    },
});
