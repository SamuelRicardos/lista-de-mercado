import React, { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useMercadoStore } from "./store/store";
import { useThemeStore } from "./store/themeStore";

const ItemLista = ({ itemLista, adicionarAoHistorico }) => {
  const { removerItem, atualizarItem, alternarComprado } = useMercadoStore();
  const { theme } = useThemeStore();
  const [editing, setEditing] = useState(false);
  const [valorEditado, setValorEditado] = useState(itemLista.nome);
  const inputRef = useRef(null);

  const iniciarEdicao = () => setEditing(true);

  const salvarEdicao = () => {
    if (valorEditado.trim() !== "") {
      atualizarItem(itemLista, { nome: valorEditado });
      setEditing(false);
    }
  };

  const cancelarEdicao = () => {
    setValorEditado(itemLista.nome);
    setEditing(false);
  };

  const removerElemento = () => {
    removerItem(itemLista.nome);
    adicionarAoHistorico(itemLista);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div
      className={`flex items-center p-2 rounded-lg w-full gap-3 transition-colors ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-800"
      } ${itemLista.comprado ? "opacity-50 line-through" : ""}`}
    >
      <input
        type="checkbox"
        checked={itemLista.comprado}
        onChange={() => alternarComprado(itemLista.nome)}
        className="w-5 h-5 cursor-pointer accent-green-500"
      />

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={valorEditado}
          onChange={(e) => setValorEditado(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") salvarEdicao();
            else if (e.key === "Escape") cancelarEdicao();
          }}
          className={`flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-white text-gray-800 border-gray-300 placeholder-gray-600"
          }`}
        />
      ) : (
        <span
          className="font-medium flex-1 text-left cursor-pointer"
          aria-label={`Item da lista: ${itemLista.nome}`}
          onClick={() => alternarComprado(itemLista.nome)}
        >
          {itemLista.nome} ({itemLista.quantidade})
        </span>
      )}

      {editing ? (
        <>
          <button
            className="transition p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md cursor-pointer"
            onClick={salvarEdicao}
            aria-label={`Salvar ${itemLista.nome} editado`}
          >
            <Check size={18} />
          </button>
          <button
            className="transition p-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-md cursor-pointer"
            onClick={cancelarEdicao}
            aria-label={`Cancelar edição de ${itemLista.nome}`}
          >
            <X size={18} />
          </button>
        </>
      ) : (
        <>
          <button
            className="transition p-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md cursor-pointer"
            onClick={iniciarEdicao}
            aria-label={`Editar ${itemLista.nome} da lista`}
          >
            <Pencil size={18} />
          </button>
          <button
            className="transition p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md cursor-pointer"
            onClick={removerElemento}
            aria-label={`Remover ${itemLista.nome} da lista`}
          >
            <Trash2 size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default ItemLista;
