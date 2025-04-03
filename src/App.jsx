import { useRef, useState } from "react";
import ItemLista from "./ItemLista";
import "./index.css";

function App() {
  const [listaMercado, setListaMercado] = useState([]);
  const inputAdicionar = useRef();

  const adicionarElementoNaLista = () => {
    const valorInput = inputAdicionar.current.value.trim();
    if (valorInput && !listaMercado.includes(valorInput)) {
      setListaMercado([...listaMercado, valorInput]);
      inputAdicionar.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md gap-6 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800">Lista de Mercado 🛒</h1>
      <div className="w-full flex gap-3">
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ref={inputAdicionar}
          type="text"
          placeholder="Digite um item"
        />
        <button
          className="transition px-4 py-2 text-white rounded-lg bg-blue-500 hover:bg-blue-600 cursor-pointer"
          onClick={adicionarElementoNaLista}
        >
          Adicionar
        </button>
      </div>

      {listaMercado.length > 0 ? (
        <ul className="w-full flex flex-col gap-2">
          {listaMercado.map((itemLista, index) => (
            <li 
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-md fade-in"
            >
              <ItemLista
                itemLista={itemLista}
                listaMercado={listaMercado}
                setListaMercado={setListaMercado}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Sua lista está vazia. Adicione itens acima!</p>
      )}
    </div>
  );
}

export default App;