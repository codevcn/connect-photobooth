type TGalleryProduct = {
  id: number // productId
  url: string // productAvatarURL
}

type TProductGalleryProps = {
  products: TGalleryProduct[]
}

export const ProductGallery = ({ products }: TProductGalleryProps) => {
  return (
    <div className="md:h-screen h-fit flex flex-col bg-white py-3 border border-gray-200">
      <h2 className="text-base w-full text-center font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
        Gian hàng sản phẩm
      </h2>
      <div className="overflow-y-auto px-1.5">
        <div className="flex md:flex-col md:items-center gap-3 overflow-x-scroll p-2 pt-3 md:overflow-y-auto md:overflow-x-clip h-fit md:max-h-full spmd:max-h-full gallery-scroll">
          {products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <div
                  key={product.id}
                  className={`w-full aspect-square relative rounded-xl transition duration-200 border border-gray-200`}
                >
                  <img
                    src={product.url || '/placeholder.svg'}
                    alt="Overlay"
                    className="w-full aspect-square rounded-xl"
                  />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
