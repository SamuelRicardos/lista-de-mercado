import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMercadoStore = create(
  persist(
    (set) => ({
      listaMercado: [],
      adicionarItem: (item) =>
        set((state) => ({ listaMercado: [...state.listaMercado, item] })),
      removerItem: (item) =>
        set((state) => ({
          listaMercado: state.listaMercado.filter((i) => i !== item),
        })),
      atualizarItem: (itemAntigo, itemNovo) =>
        set((state) => ({
          listaMercado: state.listaMercado.map((item) =>
            item === itemAntigo ? itemNovo : item
          ),
        })),
    }),
    {
      name: "mercado-storage",
      getStorage: () => localStorage,
    }
  )
);
