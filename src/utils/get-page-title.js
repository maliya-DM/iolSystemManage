import defaultSettings from '@/settings'

const title = defaultSettings.title || '油液数据分析系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
