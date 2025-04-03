import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMercadoStore = create(
  persist(
    (set) => ({
      listaMercado: [],
      adicionarItem: (item) =>
        set((state) => ({
          listaMercado: [...state.listaMercado, { ...item, comprado: false }],
        })),
      removerItem: (nomeItem) =>
        set((state) => ({
          listaMercado: state.listaMercado.filter((item) => item.nome !== nomeItem),
        })),
      atualizarItem: (itemAntigo, itemNovo) =>
        set((state) => ({
          listaMercado: state.listaMercado.map((item) =>
            item.nome === itemAntigo.nome ? { ...item, ...itemNovo } : item
          ),
        })),
      alternarComprado: (nomeItem) =>
        set((state) => {
          const novaLista = state.listaMercado.map((item) =>
            item.nome === nomeItem ? { ...item, comprado: !item.comprado } : item
          );

          const itemMarcado = novaLista.find((item) => item.nome === nomeItem);
          
          if (itemMarcado && itemMarcado.comprado) {
            setTimeout(() => {
              set((state) => ({
                listaMercado: state.listaMercado.filter((item) => item.nome !== nomeItem),
              }));
            }, 3000); // Remove após 3 segundos
          }

          return { listaMercado: novaLista };
        }),
    }),
    {
      name: "mercado-storage",
      getStorage: () => localStorage,
    }
  )
);
