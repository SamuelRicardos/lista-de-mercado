import { useRef, useEffect, useState } from "react";
import { useMercadoStore } from "./store/store";
import { useThemeStore } from "./store/themeStore";
import ItemLista from "./ItemLista";
import {
  Plus,
  Sun,
  Moon,
  History,
  X,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./index.css";

function App() {
  const inputNome = useRef();
  const inputQuantidade = useRef();
  const { listaMercado, adicionarItem, historicoCompras } = useMercadoStore();
  const { theme, toggleTheme } = useThemeStore();
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

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

  const limparHistorico = () => {
    useMercadoStore.setState({ historicoCompras: [] });
  };

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const totalPaginas = Math.ceil(listaMercado.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const itensPagina = listaMercado.slice(
    indiceInicial,
    indiceInicial + itensPorPagina,
  );

  const irParaPagina = (pagina) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaAtual(pagina);
    }
  };

  useEffect(() => {
    const novaTotalPaginas = Math.ceil(listaMercado.length / itensPorPagina);
    if (paginaAtual > novaTotalPaginas) {
      setPaginaAtual(novaTotalPaginas > 0 ? novaTotalPaginas : 1);
    }
  }, [listaMercado, itensPorPagina, paginaAtual]);

  return (
    <div
      className={`flex w-full max-w-md flex-col items-center gap-6 rounded-lg p-6 shadow-lg transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
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

      {listaMercado.length > 0 ? (
        <>
          <div className="max-h-80 w-full overflow-y-auto">
            <ul className="flex w-full flex-col gap-2">
              {itensPagina.map((itemLista) => (
                <li
                  key={itemLista.id}
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
          </div>

          {totalPaginas > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => irParaPagina(paginaAtual - 1)}
                disabled={paginaAtual === 1}
                className={`rounded-full p-2 transition disabled:opacity-30 ${
                  theme === "dark"
                    ? "text-blue-400 hover:bg-gray-700"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                aria-label="Página anterior"
              >
                <ChevronLeft size={24} />
              </button>

              {(() => {
                const maxBotoes = 3;
                let inicio = Math.max(
                  1,
                  paginaAtual - Math.floor(maxBotoes / 2),
                );
                let fim = Math.min(totalPaginas, inicio + maxBotoes - 1);

                if (fim - inicio < maxBotoes - 1) {
                  inicio = Math.max(1, fim - maxBotoes + 1);
                }

                const botoes = [];
                for (let i = inicio; i <= fim; i++) {
                  botoes.push(
                    <button
                      key={i}
                      onClick={() => irParaPagina(i)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                        paginaAtual === i
                          ? "bg-blue-600 text-white"
                          : theme === "dark"
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      {i}
                    </button>,
                  );
                }

                return botoes;
              })()}

              <button
                onClick={() => irParaPagina(paginaAtual + 1)}
                disabled={paginaAtual === totalPaginas}
                className={`rounded-full p-2 transition disabled:opacity-30 ${
                  theme === "dark"
                    ? "text-blue-400 hover:bg-gray-700"
                    : "text-blue-600 hover:bg-blue-100"
                }`}
                aria-label="Próxima página"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      ) : (
        <p
          className={`transition-colors ${
            theme === "dark" ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Sua lista está vazia. Adicione itens acima!
        </p>
      )}

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
              aria-label="Fechar histórico"
            >
              <X size={20} />
            </button>
          </div>

          {historicoCompras.length > 0 ? (
            <ul className="flex flex-col gap-2 pb-16">
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

          {historicoCompras.length > 0 && (
            <button
              onClick={() => setMostrarModal(true)}
              className={`absolute right-4 bottom-4 rounded-lg p-3 shadow-lg transition-colors ${
                theme === "dark"
                  ? "bg-red-600 text-white hover:bg-red-500"
                  : "bg-red-500 text-white hover:bg-red-400"
              }`}
              aria-label="Limpar histórico"
            >
              <Trash size={24} />
            </button>
          )}
        </div>
      )}

      {mostrarModal && (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
          <div
            className={`rounded-lg p-6 shadow-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h3 className="mb-4 text-lg font-semibold">Tem certeza?</h3>
            <p className="mb-4">Essa ação não pode ser desfeita.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="rounded-lg bg-gray-400 px-4 py-2 text-white transition hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  limparHistorico();
                  setMostrarModal(false);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
