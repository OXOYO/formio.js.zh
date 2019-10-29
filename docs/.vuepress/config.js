/**
 * Created by OXOYO on 2019/10/24.
 *
 * 基础配置
 */

module.exports = {
  title: 'formio.js.zh',
  description: 'formio.js.zh',
  // 基础路径，访问：http://oxoyo.co/formio.js.zh/
  base: '/formio.js.zh/',
  // markdown配置
  markdown: {
    // 代码块显示行号
    lineNumbers: true
  },
  // 主题配置
  themeConfig: {
    // 仓库地址
    repo: 'https://github.com/OXOYO/formio.js.zh',
    repoLabel: 'Github',
    // 编辑链接
    editLinks: true,
    // 编辑链接label
    editLinkText: '编辑此页',
    // 最后更新时间
    lastUpdated: true,
    // 导航栏
    nav: [
      { text: '指南', link: '/guide/'},
      {
        text: '官方',
        items: [
          { text: 'Github', link: 'https://github.com/formio/formio.js', target: '_blank' },
          { text: '文档', link: 'https://github.com/formio/formio.js/wiki', target: '_blank'}
        ]
      }
    ],
    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '',
            'JavaScript-API',
            'Form-Renderer',
            'Form-Utilities',
            'Modules',
            'Templates-API',
            'Custom-Components-API',
            'Fetch-Plugin-API',
            'Form-JSON-Schema',
            'Components-JSON-Schema',
            'Field-Logic-Schema',
            'Role-Permission-Schema',
            'Translations',
            'Override-Delimiter-and-Decimal-Separator'
          ]
        }
      ]
    },
    // 侧边栏深度
    sidebarDepth: 2,
    // 平滑滚动
    smoothScroll: true,
    // 显示所有页面的标题链接
    displayAllHeaders: true
  },
  plugins: {
    // 页面滚动时自动激活侧边栏链接的插件
    '@vuepress/active-header-links': {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor'
    },
    // 返回顶部
    '@vuepress/back-to-top': {},
    '@vuepress/last-updated': {
      // 格式化
      transformer: (timestamp, lang) => {
        // 不要忘了安装 moment
        const moment = require('moment')
        moment.locale(lang)
        return moment(timestamp).fromNow()
      }
    },
    // 进度条
    '@vuepress/nprogress': {},
    '@vuepress/search': {
      searchMaxSuggestions: 10
    }
  },
  // webpack配置
  configureWebpack: {
    resolve: {
      // 别名
      alias: {
        '@codes': '../codes',
        '@assets': '../assets'
      }
    }
  }
}
