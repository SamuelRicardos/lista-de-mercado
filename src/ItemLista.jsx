import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ItemLista = ({ itemLista, listaMercado, setListaMercado }) => {
  const removerItemDaLista = () => {
    setListaMercado(listaMercado.filter((itemAtual) => itemAtual !== itemLista));
  };

  const atualizarItemDaLista = () => {
    const novoItem = prompt("Atualize o item:", itemLista);
    if (novoItem && novoItem.trim() !== "") {
      setListaMercado(listaMercado.map(item => item === itemLista ? novoItem : item));
    }
  };

  return (
    <div className="flex items-center p-1 rounded-lg w-full gap-3 bg-gray-100">
      <span className="text-gray-800 font-medium flex-1 text-left" aria-label={`Item da lista: ${itemLista}`}>{itemLista}</span>
      <button
        className="transition p-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md cursor-pointer"
        onClick={atualizarItemDaLista}
        aria-label={`Atualizar ${itemLista} da lista`}
      >
        <Pencil size={18} />
      </button>
      <button
        className="transition p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md cursor-pointer"
        onClick={removerItemDaLista}
        aria-label={`Remover ${itemLista} da lista`}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default ItemLista;