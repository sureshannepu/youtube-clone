import { create } from 'zustand'

interface SidebarState {
  sidebar: boolean
  toggleSidebar: () => void
  setSidebar: (value: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  sidebar: true,
  toggleSidebar: () => set((state: SidebarState) => ({ sidebar: !state.sidebar })),
  setSidebar: (value: boolean) => set({ sidebar: value }),
}))
