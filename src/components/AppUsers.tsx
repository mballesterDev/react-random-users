import React, { useState, useEffect, useRef } from 'react'
import type { User } from './types';
import { UsersList } from './UsersList';


export const AppUsers = () => {

    const API = "https://randomuser.me/api/?results=100";
    const [users, setUsers] = useState<User[]>([]);

    const [filtro, setFiltro] = useState(false);
    const dataOriginalRef = useRef<User[]>([]);
    const [buscado, setBuscado] = useState("");

    const handleClickFilter = () => setFiltro(!filtro);

    const handleClickOriginalData = () => {
      setUsers(dataOriginalRef.current);
      setFiltro(false);
      setBuscado("");
    };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      const texto = e.target.value;
      setBuscado(texto);
      handleSearch(texto);
    }

    const handleSearch = (texto: string) => {

      const filtradoPais = dataOriginalRef.current.filter(u => {
        return u.location.country.toLowerCase().includes(texto.toLowerCase()); //includes mejor que === (ya que asi empieza a buscar que incluyas, no coincidencia exacta

      }) //ojo usar return cuando se usan explicitamente {}

    // Filtrar SIEMPRE sobre dataOriginalRef.current, NO sobre users.
    // Motivo: users cambia con cada búsqueda (se va filtrando sobre lo ya filtrado),
    // así que si buscas "s" y luego "f", ya no encuentra "France" porque se perdió.
    // La ref guarda el array completo original y nunca se toca → cada búsqueda parte de cero.

      setUsers(filtradoPais);
    }

    const handleDeleteUser = (userR : User) => {

      const filtrados = users.filter(u => u.login.uuid !== userR.login.uuid);
      setUsers(filtrados);

      // filter() no modifica el array sobre el que lo llamas. Devuelve uno nuevo.
      //Por eso hay que asignarlo a una nueva variable

    }

    const handleOrderCountry = () => {
          // 1. Copiamos el array porque sort() muta el original.
          //    Si no copiáramos, estaríamos modificando el estado directamente (mala práctica).
          const copyOfUser = [...users];

          // 2. Ordenamos la copia por el país del usuario (a-z).
          //    - a y b son dos User cualesquiera que sort nos pasa automáticamente.
          //    - a.location.country → string con el país (ej: "Spain").
          //    - localeCompare compara los dos strings y devuelve neg/0/pos
          //      para que sort decida cuál va primero.
          copyOfUser.sort((a, b) =>
            a.location.country.localeCompare(b.location.country)
          );

          // 3. Guardamos la copia ya ordenada como nuevo estado.
          //    Al cambiar la referencia, React re-renderiza con el nuevo orden.
          setUsers(copyOfUser);
        };


    useEffect(() => {

    fetch(API)
    .then(res => res.json())
    .then(data => {
      setUsers(data.results)
      dataOriginalRef.current = data.results; // hago una ref para guardar la info original sin re rednderizados xtra
    })
    .catch(err => console.log(err)
     )
    }, [])


  return (
    <>
    

    <UsersList listaUsers={users} filtroColor={filtro} buscado={buscado} handleClickFilter={handleClickFilter} handleOrder={handleOrderCountry} handleClickOriginalData={handleClickOriginalData} handleDeleteUser={handleDeleteUser} handleChange={handleChange}/>


    </>
  )
}