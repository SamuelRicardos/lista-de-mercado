import { create } from "zustand";

export const useMercadoStore = create((set) => ({
  listaMercado: [],
  adicionarItem: (item) =>
    set((state) => ({ listaMercado: [...state.listaMercado, item] })),
  removerItem: (item) =>
    set((state) => ({
      listaMercado: state.listaMercado.filter((i) => i !== item),
    })),
  atualizarItem: (oldItem, newItem) =>
    set((state) => ({
      listaMercado: state.listaMercado.map((i) =>
        i === oldItem ? newItem : i
      ),
    })),
}));
