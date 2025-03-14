import React from 'react'

const ItemLista = ({itemLista, listaMercado, setListaMercado}) => {

    const removerItemDaLista = () => {
        const novaLista = [...listaMercado]
        const novaListaFiltrada =  novaLista.filter((itemAtual) => itemAtual !== itemLista)

        setListaMercado(novaListaFiltrada)
    }

    return (
        <li className="flex justify-between gap-2">
            <p>{itemLista}</p>
            <button className="transition rounded-md bg-red-600 text-white px-2 cursor-pointer hover:bg-red-700" onClick={() => removerItemDaLista()}>Remover</button>
        </li>
    )
}

export default ItemLista