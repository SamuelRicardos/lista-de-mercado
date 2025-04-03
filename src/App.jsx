import { useRef, useEffect } from "react";
import { useMercadoStore } from "./store/store";
import { useThemeStore } from "./store/themeStore";
import ItemLista from "./ItemLista";
import { Plus, Sun, Moon } from "lucide-react";
import "./index.css";

function App() {
  const inputNome = useRef();
  const inputQuantidade = useRef();
  const { listaMercado, adicionarItem } = useMercadoStore();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const adicionarElementoNaLista = () => {
    const nomeItem = inputNome.current.value.trim();
    const quantidade = parseInt(inputQuantidade.current.value.trim(), 10) || 1;

    if (nomeItem) {
      adicionarItem({ nome: nomeItem, quantidade });
      inputNome.current.value = "";
      inputQuantidade.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col items-center w-full max-w-md gap-6 p-6 shadow-lg rounded-lg transition-colors ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
    }`}>
      <div className="flex justify-between w-full">
        <h1 className="text-4xl font-bold">Lista de Mercado</h1>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <div className="w-full flex gap-2">
        <input
          className={`flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
            theme === "dark" 
              ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400" 
              : "bg-white text-gray-800 border-gray-300 placeholder-gray-600"
          }`}
          ref={inputNome}
          type="text"
          placeholder="Digite um item"
        />
        <input
          className={`w-17 p-3 border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-300"
          }`}
          ref={inputQuantidade}
          type="number"
          min="1"
          placeholder="Qtd"
        />
        <button
          className="p-3 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg"
          onClick={adicionarElementoNaLista}
          aria-label="Adicionar item"
        >
          <Plus size={20} />
        </button>
      </div>

      {listaMercado.length > 0 ? (
        <ul className="w-full flex flex-col gap-2">
          {listaMercado.map((itemLista, index) => (
            <li 
              key={index}
              className={`flex justify-between items-center p-2 rounded-lg shadow-md transition-colors ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <ItemLista itemLista={itemLista} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={`transition-colors ${
          theme === "dark" ? "text-gray-300" : "text-gray-500"
        }`}>
          Sua lista está vazia. Adicione itens acima!
        </p>
      )}
    </div>
  );
}

export default App;
