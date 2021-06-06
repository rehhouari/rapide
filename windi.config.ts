import { defineConfig } from 'vite-plugin-windicss'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  attributify: false,
  plugins: [
    typography(
      {
        dark: true,
        rtl: true,
      }
    )
  ],
})
