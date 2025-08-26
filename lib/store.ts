import { create } from 'zustand'

interface DataState {
  mediaData: any[]
  appointmentsData: any[]
  isLoading: boolean
  setMediaData: (data: any[]) => void
  setAppointmentsData: (data: any[]) => void
  setLoading: (loading: boolean) => void
}

export const useDataStore = create<DataState>((set) => ({
  mediaData: [],
  appointmentsData: [],
  isLoading: false,
  setMediaData: (data) => set({ mediaData: data }),
  setAppointmentsData: (data) => set({ appointmentsData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
}))