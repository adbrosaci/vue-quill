import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/vue-quill/',
  lang: 'en-US',
  title: 'VueQuill',
  description: 'Rich Text Editor Component for Vue 3.',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/vue-quill/logo.svg' },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    editLink: {
      pattern:
        'https://github.com/vueup/vue-quill/edit/beta/docs/content/:path',
      text: 'Edit this page on GitHub',
    },

    algolia: {
      appId: 'RG6O6WKY7G',
      apiKey: 'ba3e7aed5d4dbfaca6d0d1c427af79dc',
      indexName: 'vue-quill',
      searchParameters: {},
    },

    // carbonAds: {
    //   carbon: 'CEBIEK3N',
    //   placement: 'vuequilldev'
    // },

    footer: {
      message: 'Released under the MIT License.',
      copyright:
        'Copyright © 2020-present Luthfi Masruri & VueQuill Contributors',
    },

    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: 'Support VueQuill',
        items: [
          {
            text: 'Patreon',
            link: 'https://www.patreon.com/luthfimasruri',
          },
          {
            text: 'Buy me a coffee',
            link: 'https://www.buymeacoffee.com/luthfimasruri',
          },
        ],
      },
    ],

    sidebar: {
      // '/config/': 'auto',
      // '/plugins': 'auto',
      // catch-all fallback
      '/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Introduction',
              link: '/guide/',
            },
            {
              text: 'Installation',
              link: '/guide/installation',
            },
            {
              text: 'Usage',
              link: '/guide/usage',
            },
            {
              text: 'Themes',
              link: '/guide/themes',
            },
            {
              text: 'Toolbar',
              link: '/guide/toolbar',
            },
            {
              text: 'Modules',
              link: '/guide/modules',
            },
            {
              text: 'Options',
              link: '/guide/options',
            },
          ],
        },
        {
          text: 'APIs',
          items: [
            {
              text: 'Props',
              link: '/api/',
            },
            {
              text: 'Events',
              link: '/api/events',
            },
            {
              text: 'Methods',
              link: '/api/methods',
            },
            {
              text: 'Slots',
              link: '/api/slots',
            },
            {
              text: 'Export',
              link: '/api/export',
            },
          ],
        },
      ],
    },
  },
})
