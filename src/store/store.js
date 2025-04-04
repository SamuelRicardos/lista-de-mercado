import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMercadoStore = create(
  persist(
    (set) => ({
      listaMercado: [],
      historicoCompras: [],

      adicionarItem: (item) =>
        set((state) => ({
          listaMercado: [
            ...state.listaMercado,
            {
              ...item,
              comprado: false,
              id: crypto.randomUUID(),
            },
          ],
        })),
      

        removerItem: (id) =>
          set((state) => ({
            listaMercado: state.listaMercado.filter((item) => item.id !== id),
          })),
        
        atualizarItem: (itemAntigo, itemNovo) =>
          set((state) => ({
            listaMercado: state.listaMercado.map((item) =>
              item.id === itemAntigo.id ? { ...item, ...itemNovo } : item
            ),
          })),
        
        alternarComprado: (id) =>
          set((state) => {
            const novaLista = state.listaMercado.map((item) =>
              item.id === id ? { ...item, comprado: !item.comprado } : item
            );
        
            const itemMarcado = novaLista.find((item) => item.id === id);
        
            if (itemMarcado && itemMarcado.comprado) {
              set((state) => ({
                historicoCompras: [...state.historicoCompras, itemMarcado],
              }));
        
              setTimeout(() => {
                set((state) => ({
                  listaMercado: state.listaMercado.filter((item) => item.id !== id),
                }));
              }, 3000);
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
