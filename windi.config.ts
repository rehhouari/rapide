import { defineConfig } from 'vite-plugin-windicss'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  attributify: true,
  plugins: [
    typography(
      {
        dark: true,
        rtl: true,
      }
    )
  ],
})
