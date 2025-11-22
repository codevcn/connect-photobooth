import { useTemplateStore } from '@/stores/ui/template.store'
import { useProductUIDataStore } from '@/stores/ui/product-ui-data.store'
import { usePrintArea } from '@/hooks/use-print-area'
import { PrintAreaOverlayPreview } from './live-preview/PrintAreaOverlay'
import { TPrintAreaInfo } from '@/utils/types/global'
import { useEditedElementStore } from '@/stores/element/element.store'
import { StickerElement } from './elements/sticker-element/StickerElement'

type TBothSidesPreviewModalProps = {
  onClose: () => void
  pickedPrintSurface: TPrintAreaInfo
}

export const BothPrintSidesPreview = ({
  onClose,
  pickedPrintSurface,
}: TBothSidesPreviewModalProps) => {
  const pickedTemplate = useTemplateStore((s) => s.pickedTemplate)
  const pickedProduct = useProductUIDataStore((s) => s.pickedProduct)
  const { printAreaContainerRef, printAreaRef } = usePrintArea(pickedPrintSurface)
  const stickerElements = useEditedElementStore((s) => s.stickerElements)

  if (!pickedTemplate || !pickedProduct || !pickedPrintSurface) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="flex flex-col bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden animate-pop-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-1 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Xem trước bản mockup</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/80 active:scale-95 transition-all text-gray-800 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x-icon lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 grow">
          <div
            ref={printAreaContainerRef}
            className="min-h-full max-h-[470px] w-full h-[470px] overflow-hidden bg-gray-100 border z-98 border-gray-400/30 relative"
          >
            <img
              src={pickedPrintSurface.imageUrl}
              alt={pickedPrintSurface.surfaceType}
              crossOrigin="anonymous"
              className="NAME-product-image min-h-full max-h-[470px] w-full h-[470px] object-contain relative z-4"
            />
            <PrintAreaOverlayPreview printAreaRef={printAreaRef} printTemplate={pickedTemplate} />
            {stickerElements.length > 0 &&
              [...stickerElements].map((sticker) => (
                <StickerElement
                  key={sticker.id}
                  element={sticker}
                  canvasAreaRef={printAreaContainerRef}
                  mountType={'new'}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
