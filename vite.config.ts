import path from 'path'
import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import PurgeIcons from 'vite-plugin-purge-icons'
// @ts-ignore
import yaml from '@rollup/plugin-yaml'
// @ts-ignore
import MarkdownItPrism from 'markdown-it-prism'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownIt from 'markdown-it'
import PineconePages from 'vite-plugin-pinecone-pages'

// ts-ignore
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    // Enable markdown support, remove MarkdownIt option to disable it.
    // if you do, make sure to remove the MarkdownIt dependencies as well.
    PineconePages({
      MarkdownIt: MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
      }).use(MarkdownItPrism, MarkdownItAnchor),
    }),
    yaml(),
    // use rapide's custom view reloading with Markdown views
    // @ts-ignore
    WindiCSS({
      scan: {
        dirs: ['.', './src/pages/', './src/layouts'], // all files in the cwd
        fileExtensions: ['html', 'js', 'ts', 'css', 'md'], // also enabled scanning for js/ts
      },
    }),
    PurgeIcons({
      /* PurgeIcons Options */
      content: [
        '**/*.html',
        '**/*.js',
        '**/*.ts',
        '**/*.md',
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Rapide App',
        short_name: 'Rapide App',
        description: 'This is a PWA Minimum Template',
        icons: [
          {
            src: '/images/icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-168x168.png',
            sizes: '168x168',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/images/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/images/icons/maskable_icon.png',
            sizes: '196x196',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        lang: 'en',
        // dir: 'ltr',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        orientation: 'any',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        // @ts-ignore
        prefer_related_applications: false,
      },
      workbox: {},
    }),
  ],
  publicDir: 'public/',
})
