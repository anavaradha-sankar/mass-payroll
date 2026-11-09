import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps asset paths relative, so the build works from any S3 bucket or folder
export default defineConfig({ plugins: [react(), tailwindcss()], base: './' })
