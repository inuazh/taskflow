import { create } from "zustand";

type TasksUiStore = {
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  selectedIds: number[];
  clearSelected: () => void
  toggleSelected: (id: number) => void
};

export const useTasksUiStore = create<TasksUiStore>((set) => ({
  editingId: null,
  selectedIds: [],
    clearSelected: () => set({selectedIds: []}),
  setEditingId: (id) => set({ editingId: id }),
  toggleSelected: (id) => set((state) => ({
    selectedIds: state.selectedIds.includes(id)
    ? state.selectedIds.filter((x) => x !== id)
    : [...state.selectedIds, id] ,
  }))
}));

