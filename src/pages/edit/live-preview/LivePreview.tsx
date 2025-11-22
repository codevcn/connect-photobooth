import { usePrintArea } from '@/hooks/use-print-area'
import {
  TBaseProduct,
  TClientProductVariant,
  TElementsVisualState,
  TImgMimeType,
  TPrintAreaInfo,
  TProductWithTemplate,
} from '@/utils/types/global'
import { useEffect, useMemo, useRef } from 'react'
import { PrintAreaOverlay } from './PrintAreaOverlay'
import { toast } from 'react-toastify'
import { useProductUIDataStore } from '@/stores/ui/product-ui-data.store'
import { useEditedElementStore } from '@/stores/element/element.store'
import { useVisualStatesCollector } from '@/hooks/use-visual-states-collector'
import { EInternalEvents, eventEmitter } from '@/utils/events'
import { useGlobalContext } from '@/contexts/global-context'
import { useHtmlToCanvas } from '@/hooks/use-html-to-canvas'
import { LocalStorageHelper } from '@/utils/localstorage'
import { productService } from '@/services/product.service'
import { convertMimeTypeToExtension } from '@/utils/helpers'
import { StickerElement } from '../elements/sticker-element/StickerElement'

type TEditedElementsAreaProps = {
  mockupId?: string
  printAreaContainerRef: React.RefObject<HTMLDivElement | null>
}

const EditedElementsArea = ({ mockupId, printAreaContainerRef }: TEditedElementsAreaProps) => {
  const stickerElements = useEditedElementStore((s) => s.stickerElements)

  return (
    <>
      {stickerElements.length > 0 &&
        stickerElements.map((sticker) => (
          <StickerElement
            key={sticker.id}
            element={sticker}
            canvasAreaRef={printAreaContainerRef}
            mountType={mockupId ? 'from-saved' : 'new'}
          />
        ))}
    </>
  )
}

type TAddToCartHandlerProps = {
  printAreaContainerRef: React.RefObject<HTMLDivElement | null>
  checkIfAnyElementOutOfBounds: () => boolean
}

const AddToCartHandler = ({
  printAreaContainerRef,
  checkIfAnyElementOutOfBounds,
}: TAddToCartHandlerProps) => {
  const { sessionId } = useGlobalContext()
  const { collectMockupVisualStates } = useVisualStatesCollector()
  const { saveHtmlAsImage, saveHtmlAsImageWithDesiredSize } = useHtmlToCanvas()

  const cleanPrintAreaBeforeAddToCart = () => {
    const printArea = printAreaContainerRef.current
      ?.querySelector<HTMLDivElement>('.NAME-print-area-allowed')
      ?.cloneNode(true) as HTMLDivElement | null
    if (printArea) {
      printArea.style.zIndex = '-1'
      document.body.prepend(printArea)
    }
    printArea?.style.setProperty('border', 'none')
    const framesDisplayer = printArea?.querySelector<HTMLElement>('.NAME-frames-displayer')
    framesDisplayer?.style.setProperty('background-color', 'transparent')
    framesDisplayer?.style.setProperty('border', 'none')
    for (const frame of printArea?.querySelectorAll<HTMLElement>('.NAME-template-frame') || []) {
      frame.querySelector<HTMLElement>('.NAME-plus-icon-wrapper')?.remove()
    }
    return {
      editor: printAreaContainerRef.current,
      printArea,
      removeMockPrintArea: () => {
        printArea?.remove()
      },
    }
  }

  const validateBeforeAddToCart = (): [
    string | null,
    TClientProductVariant | null,
    TBaseProduct | null,
    TPrintAreaInfo | null
  ] => {
    const { pickedVariant, pickedProduct, pickedSurface } = useProductUIDataStore.getState()
    if (!pickedVariant?.color || !pickedVariant?.size) {
      return [
        'Vui lòng chọn màu và kích thước sản phẩm trước khi thêm vào giỏ hàng',
        null,
        null,
        null,
      ]
    }
    return [null, pickedVariant, pickedProduct, pickedSurface]
  }

  const handleAddToCart = async (
    elementsVisualState: TElementsVisualState,
    onDoneAdd: () => void,
    onError: (error: Error) => void
  ) => {
    if (!sessionId) return
    const [message, pickedVariant, pickedProduct, pickedSurface] = validateBeforeAddToCart()
    if (message) {
      return onError(new Error(message))
    }
    if (!pickedVariant || !pickedProduct || !pickedSurface) return
    const { editor, printArea, removeMockPrintArea } = cleanPrintAreaBeforeAddToCart()
    if (!editor || !printArea) {
      return onError(new Error('Không tìm thấy khu vực in trên sản phẩm'))
    }
    const setCartCount = useProductUIDataStore.getState().setCartCount
    const imgMimeType: TImgMimeType = 'image/png'
    saveHtmlAsImage(
      editor,
      imgMimeType,
      (imageData) => {
        const mockupId = LocalStorageHelper.saveMockupImageAtLocal(
          elementsVisualState,
          {
            productId: pickedProduct.id,
            productImageId: pickedVariant.id,
            color: pickedVariant.color,
            size: pickedVariant.size,
          },
          {
            dataUrl: URL.createObjectURL(imageData),
            size: {
              width: -1,
              height: -1,
            },
          },
          sessionId,
          {
            id: pickedSurface.id,
            type: pickedSurface.surfaceType,
          }
        )
        saveHtmlAsImageWithDesiredSize(
          printArea,
          pickedSurface.area.widthRealPx,
          pickedSurface.area.heightRealPx,
          imgMimeType,
          (imageData, canvasWithDesiredSize) => {
            removeMockPrintArea()
            productService
              .preSendMockupImage(
                imageData,
                `mockup-${Date.now()}.${convertMimeTypeToExtension(imgMimeType)}`
              )
              .then((res) => {
                const result = LocalStorageHelper.updateMockupImagePreSent(mockupId, res.url, {
                  width: canvasWithDesiredSize.width,
                  height: canvasWithDesiredSize.height,
                })
                if (!result) {
                  toast.error('Không thể cập nhật kích thước mockup')
                }
              })
              .catch((err) => {
                console.error('>>> pre-send mockup image error:', err)
                toast.error('Không thể lưu mockup lên server')
              })
          },
          (error) => {
            console.error('Error saving mockup image:', error)
            toast.warning(error.message || 'Không thể tạo mockup để lưu lên server')
            onError(error)
          }
        )
        toast.success('Đã thêm vào giỏ hàng')
        setCartCount(LocalStorageHelper.countSavedMockupImages())
        onDoneAdd()
      },
      (error) => {
        console.error('Error saving mockup image:', error)
        toast.warning(error.message || 'Không thể lưu mockup, không thể thêm sản phẩm vào giỏ hàng')
        setCartCount(LocalStorageHelper.countSavedMockupImages())
        onError(error)
      }
    )
  }

  const listenAddToCart = () => {
    if (checkIfAnyElementOutOfBounds()) {
      toast.warning('Vui lòng đảm bảo tất cả phần tử nằm trong vùng in trước khi thêm vào giỏ hàng')
      return
    }
    const setIsAddingToCart = useProductUIDataStore.getState().setIsAddingToCart
    setIsAddingToCart(true)
    useEditedElementStore.getState().cancelSelectingElement()
    // Thu thập visual states của tất cả elements
    handleAddToCart(
      collectMockupVisualStates(printAreaContainerRef.current || undefined),
      () => {
        setIsAddingToCart(false)
      },
      (error) => {
        setIsAddingToCart(false)
      }
    )
  }

  useEffect(() => {
    eventEmitter.on(EInternalEvents.ADD_TO_CART, listenAddToCart)
    return () => {
      eventEmitter.off(EInternalEvents.ADD_TO_CART, listenAddToCart)
    }
  }, [])

  return <></>
}

type TDisplayedImage = {
  surfaceId: TBaseProduct['printAreaList'][number]['id']
  variantId: TBaseProduct['variants'][number]['id']
  imageURL: string
  altText: string
}

type TLivePreviewProps = {
  pickedProduct: TProductWithTemplate
  editedVariantId: TBaseProduct['variants'][number]['id']
  editedPrintSurfaceId: TBaseProduct['printAreaList'][number]['id']
}

export const LivePreview = ({
  pickedProduct,
  editedVariantId,
  editedPrintSurfaceId,
}: TLivePreviewProps) => {
  const printAreaInfo = useMemo(() => {
    return pickedProduct.printAreaList.find((printArea) => printArea.id === editedPrintSurfaceId)!
  }, [pickedProduct, editedPrintSurfaceId])

  const { printAreaRef, printAreaContainerRef, checkIfAnyElementOutOfBounds, isOutOfBounds } =
    usePrintArea(printAreaInfo)

  const displayedImage = useMemo<TDisplayedImage>(() => {
    const variantSurface = pickedProduct.variantSurfaces.find(
      (variantSurface) =>
        variantSurface.variantId === editedVariantId &&
        variantSurface.surfaceId === editedPrintSurfaceId
    )
    return {
      surfaceId: editedPrintSurfaceId,
      variantId: editedVariantId,
      imageURL: variantSurface?.imageURL || pickedProduct.url,
      altText: pickedProduct.name,
    }
  }, [pickedProduct, editedVariantId, editedPrintSurfaceId])

  const imgURLRef = useRef<string>(displayedImage.imageURL)

  const displayProductChangingModal = () => {
    if (imgURLRef.current === displayedImage.imageURL) return
    const modal = document.body.querySelector<HTMLElement>('.NAME-product-changing-modal')
    const maxTimeWait = 6000
    if (modal) {
      modal.style.display = 'flex'
      setTimeout(() => {
        modal.style.display = 'none'
      }, maxTimeWait)
    }
  }

  const removeProductChangingModal = () => {
    if (imgURLRef.current === displayedImage.imageURL) return
    imgURLRef.current = displayedImage.imageURL
    const modal = document.body.querySelector<HTMLElement>('.NAME-product-changing-modal')
    if (modal) {
      modal.style.display = 'none'
    }
  }

  useEffect(() => {
    displayProductChangingModal()
  }, [displayedImage])

  return (
    <div className="min-h-full max-h-full w-full h-full relative">
      <AddToCartHandler
        checkIfAnyElementOutOfBounds={checkIfAnyElementOutOfBounds}
        printAreaContainerRef={printAreaContainerRef}
      />
      <div className="NAME-product-changing-modal hidden absolute inset-0 z-99 bg-black/30 justify-center items-center">
        <div className="p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-loader-icon lucide-loader w-16 h-16 text-white animate-spin"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        </div>
      </div>
      <div
        ref={printAreaContainerRef}
        className="NAME-print-area-container min-h-full max-h-full w-full h-full overflow-hidden bg-gray-100 border z-50 border-gray-400/30 relative"
      >
        <div
          style={{ display: isOutOfBounds ? 'block' : 'none' }}
          className="absolute inset-0 bg-red-600/20 z-5"
        >
          <p className="absolute top-0 left-0 text-white font-medium bg-red-600 px-3 py-1 rounded-br-md">
            Ngoài phạm vi in cho phép
          </p>
        </div>
        <img
          src={displayedImage.imageURL}
          alt={displayedImage.altText}
          crossOrigin="anonymous"
          className="NAME-product-image min-h-full max-h-full w-full h-full object-contain object-center relative z-4"
          onLoad={removeProductChangingModal}
        />
        <PrintAreaOverlay
          printAreaRef={printAreaRef}
          isOutOfBounds={isOutOfBounds}
          displayWarningOverlay
        />
        <EditedElementsArea printAreaContainerRef={printAreaContainerRef} />
      </div>
    </div>
  )
}
