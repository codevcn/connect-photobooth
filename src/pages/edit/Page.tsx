import { TBaseProduct, TClientProductVariant, TPrintedImage } from '@/utils/types/global'
import { ProductGallery } from './ProductGallery'
import { ProductDetails } from './product/ProductDetails'
import { Customize } from './customize/Customize'
import { LivePreview } from './live-preview/Live-Preview'
import { useState } from 'react'

type TEditPageProps = {
  products: TBaseProduct[]
  printedImages: TPrintedImage[]
}

export default function EditPage({ products, printedImages }: TEditPageProps) {
  const [pickedProduct, setPickedProduct] = useState<TBaseProduct>(products[0])
  const [pickedVariant, setPickedVariant] = useState<TClientProductVariant>(products[0].variants[0])

  return (
    <div className="font-sans grid grid-cols-[1fr_6fr] h-screen gap-4">
      <ProductGallery products={products} />
      <div className="NAME-main-parent grid grid-cols-[3fr_2fr] gap-4 h-screen">
        <LivePreview />
        <div className="flex flex-col space-y-2 p-4 pl-2 min-h-full max-h-full overflow-y-auto gallery-scroll border border-gray-400/30">
          <ProductDetails pickedProduct={pickedProduct} pickedVariant={pickedVariant} />
          <Customize />
        </div>
      </div>
    </div>
  )
}
