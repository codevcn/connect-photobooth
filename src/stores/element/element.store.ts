import { TElementType, TStickerVisualState } from '@/utils/types/global'
import { create } from 'zustand'

type TUseElementStore = {
  selectedElement: {
    elementId: string
    element: HTMLElement
    elementType: TElementType
    elementURL?: string
  } | null
  stickerElements: TStickerVisualState[]

  // Actions
  selectElement: (
    elementId: string,
    element: HTMLElement,
    elementType: TElementType,
    elementURL?: string
  ) => void
  cancelSelectingElement: () => void
  addStickerElement: (sticker: TStickerVisualState) => void
  removeStickerElement: (stickerId: string) => void
}

export const useEditedElementStore = create<TUseElementStore>((set, get) => ({
  selectedElement: null,
  stickerElements: [],

  addStickerElement: (sticker) => {
    const { stickerElements } = get()
    set({ stickerElements: [...stickerElements, sticker] })
  },
  selectElement: (elementId, element, elementType, elementURL) => {
    set({ selectedElement: { element, elementType, elementId, elementURL } })
  },
  cancelSelectingElement: () => {
    set({ selectedElement: null })
  },
  removeStickerElement: (stickerId) => {
    const { stickerElements } = get()
    set({
      stickerElements: stickerElements.filter((sticker) => sticker.id !== stickerId),
      selectedElement: null,
    })
  },
}))
