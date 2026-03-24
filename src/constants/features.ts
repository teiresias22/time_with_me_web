import type { IconType } from 'react-icons'
import {
  FaMagic,
  FaMobileAlt,
  FaComment,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaTag,
  FaClipboardList,
  FaBell,
} from 'react-icons/fa'

export interface Feature {
  titleKey: string
  descriptionKey: string
  icon: IconType
}

export const features: Feature[] = [
  { titleKey: 'features.calendar.title', descriptionKey: 'features.calendar.desc', icon: FaMagic },
  { titleKey: 'features.crossplatform.title', descriptionKey: 'features.crossplatform.desc', icon: FaMobileAlt },
  { titleKey: 'features.communicate.title', descriptionKey: 'features.communicate.desc', icon: FaComment },
  { titleKey: 'features.location.title', descriptionKey: 'features.location.desc', icon: FaMapMarkerAlt },
  { titleKey: 'features.dday.title', descriptionKey: 'features.dday.desc', icon: FaCalendarCheck },
  { titleKey: 'features.category.title', descriptionKey: 'features.category.desc', icon: FaTag },
  { titleKey: 'features.sorting.title', descriptionKey: 'features.sorting.desc', icon: FaClipboardList },
  { titleKey: 'features.notification.title', descriptionKey: 'features.notification.desc', icon: FaBell },
]
