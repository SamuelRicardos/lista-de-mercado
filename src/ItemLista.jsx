import React from 'react'

const ItemLista = ({itemLista, listaMercado, setListaMercado}) => {

    const removerItemDaLista = () => {
        const novaLista = [...listaMercado]
        const novaListaFiltrada =  novaLista.filter((itemAtual) => itemAtual !== itemLista)

        setListaMercado(novaListaFiltrada)
    }

    return (
        <li>
            <p>{itemLista}</p>
            <button onClick={() => removerItemDaLista()}>Remover</button>
        </li>
    )
}

export default ItemLista