import InlineSvg from 'vue-inline-svg'

export const CUSTOM_ICONS = {
  'arrow-down': require('@/assets/icons/arrow-down.svg'),
  bookmark: require('@/assets/icons/bookmark.svg'),
  'chain-circle': require('@/assets/icons/chain-circle.svg'),
  'chain-square': require('@/assets/icons/chain-square.svg'),
  dashboard: require('@/assets/icons/dashboard.svg'),
  date: require('@/assets/icons/date.svg'),
  'download-circle': require('@/assets/icons/download-circle.svg'),
  'download-square': require('@/assets/icons/download-square.svg'),
  exit: require('@/assets/icons/exit.svg'),
  'finished-points': require('@/assets/icons/finished-points.svg'),
  next: require('@/assets/icons/next.svg'),
  prev: require('@/assets/icons/prev.svg'),
  success: require('@/assets/icons/success.svg'),
  report: require('@/assets/icons/report.svg'),
  trash: require('@/assets/icons/trash.svg'),
  search: require('@/assets/icons/search.svg'),
  filter: require('@/assets/icons/filter.svg'),
  up: require('@/assets/icons/up.svg'),
  down: require('@/assets/icons/down.svg'),
  wialon: require('@/assets/icons/wialon.svg'),
  settings: require('@/assets/icons/settings.svg'),
  'date-prev': require('@/assets/icons/date-prev.svg'),
  'date-next': require('@/assets/icons/date-next.svg'),
}

export function LoadSvgIcons (iconList) {
  const icons = {}
  // eslint-disable-next-line no-unused-vars
  for (const icon in iconList) {
      const name = `icons_${icon}`
      icons[name] = {
        component: InlineSvg,
        props: {
          src: iconList[icon],
          title: name,
        },
      }
  }
  return icons
}
