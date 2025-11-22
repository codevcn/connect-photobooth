import {
  TBaseProduct,
  TClientProductVariant,
  TPrintTemplate,
  TProductWithTemplate,
  TProductColor,
  TPrintAreaInfo,
} from '@/utils/types/global'
import { create } from 'zustand'
import { useTemplateStore } from './template.store'

type TProductUIDataStore = {
  pickedProduct: TProductWithTemplate | null
  pickedVariant: TClientProductVariant | null
  pickedSurface: TBaseProduct['printAreaList'][number] | null
  isAddingToCart: boolean
  cartCount: number

  // Actions
  handlePickProduct: (prod: TBaseProduct, initialTemplate: TPrintTemplate) => void
  initFirstProduct: (prod: TBaseProduct, initialTemplate: TPrintTemplate) => void
  handlePickVariant: (variant: TClientProductVariant) => void
  handlePickColor: (color: TProductColor) => void
  handlePickSize: (selectedColor: TProductColor, size: string) => void
  handlePickVariantSurface: (
    variantId: TClientProductVariant['id'],
    surfaceId: TPrintAreaInfo['id']
  ) => void
  setIsAddingToCart: (isAdding: boolean) => void
  setCartCount: (count: number) => void
}

export const useProductUIDataStore = create<TProductUIDataStore>((set, get) => ({
  pickedProduct: null,
  pickedVariant: null,
  pickedSurface: null,
  isAddingToCart: false,
  cartCount: 0,

  setIsAddingToCart: (isAdding: boolean) => {
    set({ isAddingToCart: isAdding })
  },

  setCartCount: (count: number) => {
    set({ cartCount: count })
  },

  handlePickVariantSurface: (variantId, surfaceId) => {
    const pickedProduct = get().pickedProduct
    if (!pickedProduct) return
    const variant = pickedProduct.variants.find((v) => v.id === variantId)
    const surface = pickedProduct.printAreaList.find((s) => s.id === surfaceId)
    if (variant && surface) {
      set({ pickedSurface: surface, pickedVariant: variant })
    }
  },

  handlePickColor: (color: TProductColor) => {
    const currentVariants = get().pickedProduct?.variants || []
    if (currentVariants.length > 0) {
      const variantsForColor = currentVariants.filter((v) => v.color.value === color.value)
      if (variantsForColor.length > 0) {
        get().handlePickVariant(variantsForColor[0])
      }
    }
  },

  handlePickSize: (selectedColor: TProductColor, size: string) => {
    const currentVariants = get().pickedProduct?.variants || []
    if (currentVariants.length > 0) {
      const variantForSize = currentVariants.find(
        (v) => v.color.value === selectedColor.value && v.size === size
      )
      if (variantForSize) {
        get().handlePickVariant(variantForSize)
      }
    }
  },

  handlePickProduct: (product, initialTemplate) => {
    set({ pickedProduct: { ...product, template: initialTemplate } })
    set({ pickedVariant: product.variants[0] })
    set({ pickedSurface: product.printAreaList[0] })
    useTemplateStore.getState().pickTemplate(initialTemplate)
  },

  initFirstProduct: (product: TBaseProduct, initialTemplate: TPrintTemplate) => {
    if (get().pickedProduct) return
    get().handlePickProduct(product, initialTemplate)
  },

  handlePickVariant: (variant) => {
    set({ pickedVariant: variant })
  },
}))
