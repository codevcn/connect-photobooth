import { TPrintedImage } from '@/utils/types/global'
import { PrintedImagesPreview } from '../printed-images/PrintedImagesPreview'
import { TemplatesPicker } from './template/TemplatesPicker'
import { ElementInteraction } from './ElementInteraction'
import StickerPicker from '../elements/sticker-element/StickerPicker'
import { TextEditor } from '../elements/text-element/TextEditor'
import { AdditionalInformation } from '../product/AdditionalInformation'

enum EMenuItemId {
  TEMPLATE = 'template',
  ADD_TEXT = 'add-text',
  ADD_STICKER = 'add-sticker',
}

const initMenuItems = (onClickAddText: () => void, onClickAddSticker: () => void) => [
  {
    id: EMenuItemId.ADD_TEXT,
    icon: (
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
        className="lucide lucide-type-icon lucide-type text-main-cl"
      >
        <path d="M12 4v16" />
        <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
        <path d="M9 20h6" />
      </svg>
    ),
    label: 'Thêm chữ',
    onClick: onClickAddText,
  },
  {
    id: EMenuItemId.ADD_STICKER,
    icon: (
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
        className="lucide lucide-sticker-icon lucide-sticker text-main-cl"
      >
        <path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
        <path d="M15 3v5a1 1 0 0 0 1 1h5" />
        <path d="M8 13h.01" />
        <path d="M16 13h.01" />
        <path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />
      </svg>
    ),
    label: 'Thêm sticker',
    onClick: onClickAddSticker,
  },
]

type TCustomizeProps = {
  printedImages: TPrintedImage[]
}

export const Customization = ({ printedImages }: TCustomizeProps) => {
  return (
    <div className="border-border rounded-lg p-3 bg-gray-100 mt-2">
      <h3 className="text-center text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">
        Cá nhân hóa
      </h3>
      <div className="overflow-hidden relative w-full mt-4">
        <TemplatesPicker
          printedImagesCount={printedImages.length}
          classNames={{
            templatesList: 'grid grid-cols-2 gap-2',
            templateItem: 'aspect-square',
          }}
        />
        <PrintedImagesPreview printedImages={printedImages} />
        <StickerPicker />
        <TextEditor />
      </div>
      <ElementInteraction />
    </div>
  )
}
