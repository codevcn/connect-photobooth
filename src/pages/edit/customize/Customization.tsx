import { TPrintedImage } from '@/utils/types/global'
import { PrintedImagesPreview } from '../printed-images/PrintedImagesPreview'
import { TemplatesPicker } from './template/TemplatesPicker'
import { ElementInteraction } from './ElementInteraction'
import StickerPicker from '../elements/sticker-element/StickerPicker'
import { TextEditor } from '../elements/text-element/TextEditor'

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
