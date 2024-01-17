import {themes as prismThemes} from 'prism-react-renderer'
import type {Config} from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'mocq',
  tagline: 'data creation, connection & execution coordination utility',
  favicon: 'img/test-tube.png',

  url: 'https://nxzq.github.io',
  baseUrl: '/mocq/',

  organizationName: 'nxzq',
  projectName: 'mocq',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/nxzq/mocq/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
      }
    ]
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    image: 'img/mocq-social-card.jpg',
    navbar: {
      title: 'mocq',
      hideOnScroll: true,
      logo: {
        alt: 'Test Tube Emoji',
        src: 'img/test-tube.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: 'docs/tutorial',
          position: 'left',
          label: 'Tutorial',
        },
        {
          to: 'docs/examples',
          position: 'left',
          label: 'Examples',
        },
        {
          to: 'docs/api',
          position: 'left',
          label: 'API',
        },
        {
          href: 'https://npmjs.com/package/mocq',
          className: 'header-npm-link',
          'aria-label': 'npm Repository',
          position: 'right',
        },
        {
          href: 'https://github.com/nxzq/mocq',
          className: 'header-github-link',
          'aria-label': 'GitHub Repository',
          position: 'right',
        },
      ],
    },
    footer: {
      copyright: `<html>
        <div class='textWithTrailingIcon'>
          <p>docs built with <a href='https://docusaurus.io/'>docusaurus</a></p>
          <img src='https://nxzq.github.io/mocq/img/logo.svg'/>
        </div>
      </html>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash', 
        'typescript', 
        'javascript', 
        'json', 
        'sql',
      ],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
