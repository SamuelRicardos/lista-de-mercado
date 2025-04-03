import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMercadoStore = create(
  persist(
    (set) => ({
      listaMercado: [],

      adicionarItem: (novoItem) =>
        set((state) => {
          const itemExistente = state.listaMercado.find(
            (item) => item.nome === novoItem.nome
          );

          if (itemExistente) {
            return {
              listaMercado: state.listaMercado.map((item) =>
                item.nome === novoItem.nome
                  ? { ...item, quantidade: item.quantidade + novoItem.quantidade }
                  : item
              ),
            };
          }

          return { listaMercado: [...state.listaMercado, novoItem] };
        }),

      removerItem: (nomeItem) =>
        set((state) => ({
          listaMercado: state.listaMercado.filter((item) => item.nome !== nomeItem),
        })),

      atualizarItem: (nomeAntigo, itemNovo) =>
        set((state) => ({
          listaMercado: state.listaMercado.map((item) =>
            item.nome === nomeAntigo ? itemNovo : item
          ),
        })),
    }),
    {
      name: "mercado-storage",
      getStorage: () => localStorage,
    }
  )
);
