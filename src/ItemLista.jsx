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
    removerItem(itemLista.id);
    if (typeof adicionarAoHistorico === "function") {
      adicionarAoHistorico(itemLista);
    }
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div
      className={`flex w-full items-center gap-3 rounded-lg p-2 transition-colors ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"} ${itemLista.comprado ? "line-through opacity-50" : ""} flex-wrap`}
    >
      <input
        type="checkbox"
        checked={itemLista.comprado}
        onChange={() => alternarComprado(itemLista.id)}
        className="h-5 w-5 cursor-pointer accent-green-500"
      />

      <div className="flex flex-1 items-center justify-between gap-2">
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
            className={`rounded-md border p-2 transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none ${theme === "dark" ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-white text-gray-800 placeholder-gray-600"} max-w-[380px]:w-[60%] max-w-[360px]:w-[50%] flex-1`}
          />
        ) : (
          <span
            className="flex-1 cursor-pointer text-left font-medium"
            aria-label={`Item da lista: ${itemLista.nome}`}
            onClick={() => alternarComprado(itemLista.id)}
          >
            {itemLista.nome} ({itemLista.quantidade})
          </span>
        )}

        <div className="flex gap-1">
          {editing ? (
            <>
              <button
                className="cursor-pointer rounded-lg bg-blue-500 p-2 text-white shadow-md transition hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                onClick={salvarEdicao}
                aria-label={`Salvar ${itemLista.nome} editado`}
              >
                <Check size={18} />
              </button>
              <button
                className="cursor-pointer rounded-lg bg-gray-500 p-2 text-white shadow-md transition hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                onClick={cancelarEdicao}
                aria-label={`Cancelar edição de ${itemLista.nome}`}
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                className="cursor-pointer rounded-lg bg-green-500 p-2 text-white shadow-md transition hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
                onClick={iniciarEdicao}
                aria-label={`Editar ${itemLista.nome} da lista`}
              >
                <Pencil size={18} />
              </button>
              <button
                className="cursor-pointer rounded-lg bg-red-500 p-2 text-white shadow-md transition hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
                onClick={removerElemento}
                aria-label={`Remover ${itemLista.nome} da lista`}
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemLista;
