import QRScanner from './QRScanner'
import { TUserInputImage } from '@/utils/types/global'
import { useEditedImageContext } from '@/contexts/global-context'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ScanQRPage = () => {
  const { setEditedImages, editedImages } = useEditedImageContext()
  const navigate = useNavigate()

  const handleData = (imageDataList: TUserInputImage[]) => {
    setEditedImages([])
    setEditedImages((prevImages) => {
      return [
        ...prevImages,
        ...imageDataList.map((image) => ({
          url: image.url,
          height: -1,
          width: -1,
          id: image.url,
          x: 0,
          y: 0,
        })),
      ]
    })
  }

  useEffect(() => {
    if (editedImages.length > 0) {
      // navigate('/edit')
    }
  }, [editedImages])

  return (
    <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload"
        >
          <source src="/videos/scan-qr-page-background.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <section className="NAME-scan-qr-main-content relative z-10 max-w-2xl bg-white/20 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex items-center justify-center gap-3 animate-fade-in-down">
          <div
            onClick={() => navigate('/edit')}
            className="bg-pink-cl p-3 rounded-xl shadow-lg animate-float"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-camera-icon lucide-camera text-white"
            >
              <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Quét mã QR</h1>
        </div>

        <div className="animate-scale-in mt-6" style={{ animationDelay: '0.1s' }}>
          <QRScanner onScanSuccess={handleData} />
        </div>
      </section>
    </div>
  )
}

export default ScanQRPage
