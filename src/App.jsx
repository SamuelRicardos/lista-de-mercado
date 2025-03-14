import { useRef, useState } from "react";
import ItemLista from "./ItemLista";

function App() {
  const [listaMercado, setListaMercado] = useState([]);

  const inputAdicionar = useRef();

  const adicionarElementoNaLista = () => {
    const novaLista = [...listaMercado]
    const valorInput = inputAdicionar.current.value;

    if (valorInput) {
      novaLista.push(valorInput)
      setListaMercado(novaLista)

      inputAdicionar.current.value = "";
    }

  }

  return <>
    <div className="flex flex-col items-center w-full max-w-96 gap-4">
      <h1 className="text-3xl font-bold">Lista de mercado</h1>
      <div className="w-full flex gap-2">
        <input className="w-full rounded-md border border-gray-600 px-2" ref={inputAdicionar} type="text" placeholder="Digite um item" />
        <button className="transition rounded-md bg-blue-500
         text-white px-2 cursor-pointer hover:bg-blue-600" onClick={() => adicionarElementoNaLista()}>Adicionar</button>
      </div>

      {listaMercado.length > 0 ?
        <ul className="w-full flex flex-col gap-2">
          {listaMercado.map((itemLista, index) => (
            <ItemLista key={index} itemLista={itemLista} listaMercado={listaMercado} setListaMercado={setListaMercado} />
          ))}
        </ul> : (<p>Você não tem nenhum item na sua lista</p>)}
    </div>
  </>
}

export default App;
