import type { User } from './types'
import './UsersList.css'

interface Props {
    listaUsers: User[];
    filtroColor: boolean;
    buscado: string;
    handleClickFilter: () => void;
    handleOrder: () => void;
    handleClickOriginalData: () => void;
    handleDeleteUser: (user : User) => void;
    handleChange : (e : React.ChangeEvent<HTMLInputElement>) => void;

}

export const UsersList = ({listaUsers, filtroColor, buscado, handleClickFilter, handleOrder, handleClickOriginalData, handleDeleteUser, handleChange}: Props) => {
  return (
    <div className="users-card">
      <h1 className="users-title">Lista de usuarios</h1>

      <div className="users-toolbar">
        <button onClick={handleClickFilter} className="toolbar-btn">Colorea filas</button>
        <button onClick={handleOrder} className="toolbar-btn">Ordena por país</button>
        <button onClick={handleClickOriginalData} className="toolbar-btn">Restaurar estado inicial</button>
        <input onChange={(event) => handleChange(event)} value={buscado} className="filter-input" type="text" placeholder="Filtrar por país" />
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              listaUsers.map((user) => (
                <tr className={filtroColor ? "bg-gray-400" : undefined} key={user.login.uuid}>
                  <td><img className="user-avatar" src={user.picture.thumbnail} alt="" /></td>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>{user.location.country}</td>
                  <td><button onClick={() => handleDeleteUser(user)} className="delete-btn">Delete</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}