import React, { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useMercadoStore } from "./store/store";
import { useThemeStore } from "./store/themeStore";

const ItemLista = ({ itemLista }) => {
  const { removerItem, atualizarItem } = useMercadoStore();
  const { theme } = useThemeStore();

  const [editing, setEditing] = useState(false);
  const [novoNome, setNovoNome] = useState(itemLista.nome);
  const [novaQuantidade, setNovaQuantidade] = useState(itemLista.quantidade);
  const inputRef = useRef(null);

  const iniciarEdicao = () => setEditing(true);

  const salvarEdicao = () => {
    if (novoNome.trim() !== "" && novaQuantidade > 0) {
      atualizarItem(itemLista.nome, { nome: novoNome, quantidade: novaQuantidade });
      setEditing(false);
    }
  };

  const cancelarEdicao = () => {
    setNovoNome(itemLista.nome);
    setNovaQuantidade(itemLista.quantidade);
    setEditing(false);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <div className={`flex items-center p-1 rounded-lg w-full gap-3 transition-colors ${
      theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
    }`}>
      {editing ? (
        <div className="flex w-full gap-2">
          <input
            ref={inputRef}
            type="text"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            className={`flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
              theme === "dark" 
                ? "bg-gray-700 text-white border-gray-600" 
                : "bg-white text-gray-800 border-gray-300"
            }`}
          />
          <input
            type="number"
            value={novaQuantidade}
            onChange={(e) => setNovaQuantidade(Number(e.target.value))}
            min="1"
            className={`w-16 p-2 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
              theme === "dark" 
                ? "bg-gray-700 text-white border-gray-600" 
                : "bg-white text-gray-800 border-gray-300"
            }`}
          />
        </div>
      ) : (
        <span className="flex-1 text-left">
          {itemLista.nome} - <strong>{itemLista.quantidade}x</strong>
        </span>
      )}

      {editing ? (
        <>
          <button
            className="transition p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md cursor-pointer"
            onClick={salvarEdicao}
          >
            <Check size={18} />
          </button>
          <button
            className="transition p-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-md cursor-pointer"
            onClick={cancelarEdicao}
          >
            <X size={18} />
          </button>
        </>
      ) : (
        <>
          <button
            className="transition p-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md cursor-pointer"
            onClick={iniciarEdicao}
          >
            <Pencil size={18} />
          </button>
          <button
            className="transition p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md cursor-pointer"
            onClick={() => removerItem(itemLista.nome)}
          >
            <Trash2 size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default ItemLista;
