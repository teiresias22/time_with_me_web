import { APP_INFO } from '../../constants/appInfo'

export default function DownloadButtons() {
  return (
    <div className="flex items-center gap-4">
      <a href={APP_INFO.appStoreLink} target="_blank" rel="noopener noreferrer">
        <img src="/assets/appstore.png" alt="App Store" className="h-12 hover:opacity-80 transition-opacity" />
      </a>
      <a href={APP_INFO.playStoreLink} target="_blank" rel="noopener noreferrer">
        <img src="/assets/playstore.png" alt="Google Play" className="h-12 hover:opacity-80 transition-opacity" />
      </a>
    </div>
  )
}
