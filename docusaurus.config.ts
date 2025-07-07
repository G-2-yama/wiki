import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'G^2 wiki',
  tagline: 'G^2用のWiki',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://G-2-yama.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/wiki/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'G-2-yama', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.dev/G-2-yama/wiki/blob/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.dev/G-2-yama/wiki/blob/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'circle-info',
        path: './circle-info',
        routeBasePath: 'circle-info',
        sidebarPath: require.resolve('./sidebars.ts'),
        editUrl: 'https://github.dev/G-2-yama/wiki/blob/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'minutes',
        routeBasePath: 'minutes',
        path: './minutes',
        blogTitle: '議事録',
        blogDescription: '議事録一覧',
        showReadingTime: false,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        editUrl: 'https://github.dev/G-2-yama/wiki/blob/main/',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social_card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'G^2 Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          docsPluginId: 'circle-info',
          sidebarId: 'circleInfoSidebar',
          label: 'サークル情報',
          position: 'left',
        },
        {to: '/blog', label: 'ニュース', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'right',
          label: '資料庫',
        },
        {to: '/minutes', label: '議事録', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '広報',
          items: [
            {
              label: 'X',
              href: 'https://x.com/g2_yama',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/channel/UC1XMHED8EGZWsgyNz3e2OnA',
            },
          ],
        },
        {
          title: 'ホームページ',
          items: [
            {
              label: '旧ホームページ',
              href: 'http://g2yamanashi.web.fc2.com/index.html',
            },
            {
              label: '新ホームページ(制作中)',
              href: 'https://g-2-yama.github.io/website/',
            },
          ]
        },
        {
          title: '開発・販売',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/G-2-yama',
            },
            {
              label: 'Booth',
              href: 'https://g2yama.booth.pm/',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} G^2.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
