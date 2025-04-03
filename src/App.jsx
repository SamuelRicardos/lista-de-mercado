import { useRef, useEffect, useState } from "react";
import { useMercadoStore } from "./store/store";
import { useThemeStore } from "./store/themeStore";
import ItemLista from "./ItemLista";
import { Plus, Sun, Moon, History, X } from "lucide-react";
import "./index.css";

function App() {
  const inputNome = useRef();
  const inputQuantidade = useRef();
  const { listaMercado, adicionarItem, historicoCompras } = useMercadoStore();
  const { theme, toggleTheme } = useThemeStore();
  const [mostrarHistorico, setMostrarHistorico] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const adicionarElementoNaLista = () => {
    const nomeItem = inputNome.current.value.trim();
    const quantidade = parseInt(inputQuantidade.current.value.trim(), 10) || 1;

    if (nomeItem) {
      adicionarItem({ nome: nomeItem, quantidade, comprado: false });
      inputNome.current.value = "";
      inputQuantidade.current.value = "";
    }
  };

  return (
    <div
      className={`flex w-full max-w-md flex-col items-center gap-6 rounded-lg p-6 shadow-lg transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Cabeçalho */}
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold sm:text-4xl">Lista de Mercado</h1>
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className={`rounded-lg p-1 px-3 transition-colors sm:p-2 sm:px-2 ${
              theme === "dark"
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            onClick={() => setMostrarHistorico(true)}
            className="rounded-lg bg-purple-500 p-1 px-3 text-white transition hover:bg-purple-600 sm:p-2 sm:px-2"
            aria-label="Ver histórico de compras"
          >
            <History size={20} />
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex w-full gap-2">
        <input
          className={`flex-1 rounded-lg border p-3 transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none ${
            theme === "dark"
              ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-800 placeholder-gray-600"
          }`}
          ref={inputNome}
          type="text"
          placeholder="Digite um item"
        />
        <input
          className={`w-17 rounded-lg border p-3 text-center transition-colors focus:ring-2 focus:ring-blue-400 focus:outline-none ${
            theme === "dark"
              ? "border-gray-600 bg-gray-800 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-800 placeholder-gray-600"
          }`}
          ref={inputQuantidade}
          type="number"
          min="1"
          placeholder="Qtd"
        />
        <button
          className="rounded-lg bg-blue-500 p-3 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          onClick={adicionarElementoNaLista}
          aria-label="Adicionar item"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Lista de Compras */}
      {listaMercado.length > 0 ? (
        <ul className="flex w-full flex-col gap-2">
          {listaMercado.map((itemLista, index) => (
            <li
              key={index}
              className={`flex items-center justify-between rounded-lg p-2 shadow-md transition-colors ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <ItemLista itemLista={itemLista} />
            </li>
          ))}
        </ul>
      ) : (
        <p
          className={`transition-colors ${
            theme === "dark" ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Sua lista está vazia. Adicione itens acima!
        </p>
      )}

      {/* Sidebar do Histórico */}
      {mostrarHistorico && (
        <div
          className={`fixed top-0 right-0 flex h-full w-64 translate-x-0 transform flex-col p-4 shadow-lg transition-transform ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Histórico</h2>
            <button
              onClick={() => setMostrarHistorico(false)}
              className={`rounded-lg p-2 transition-colors ${
                theme === "dark"
                  ? "text-white hover:text-red-400"
                  : "text-gray-800 hover:text-red-500"
              }`}
            >
              <X size={20} />
            </button>
          </div>
          {historicoCompras.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {historicoCompras.map((item, index) => (
                <li
                  key={index}
                  className={`rounded-lg p-2 transition-colors ${
                    theme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item.nome} ({item.quantidade})
                </li>
              ))}
            </ul>
          ) : (
            <p
              className={`transition-colors ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Nenhum item comprado ainda.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
