import React, { useState } from 'react';

const ROLES = [
  'Администрация БТК',
  'Пресс-служба',
  'Учебная часть',
  'Директор',
  'Заместитель директора'
];

interface User {
  id: string;
  email: string;
  role: string;
  canPublishNews: boolean;
  isActive: boolean;
}

interface UserManagementProps {
  currentUser: {
    id: string;
    email: string;
    isAdmin: boolean;
    isCentral?: boolean;
  };
}

const UserManagement: React.FC<UserManagementProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    email: '',
    role: ROLES[0],
    canPublishNews: false
  });
  const [deleteTimers, setDeleteTimers] = useState<{ [id: string]: number }>({});
  const [pendingDelete, setPendingDelete] = useState<{ [id: string]: boolean }>({});
  const [pendingDeactivate, setPendingDeactivate] = useState<{ [id: string]: boolean }>({});

  // Добавление пользователя
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: 'user-' + Date.now(),
        email: newUser.email,
        role: newUser.role,
        canPublishNews: newUser.canPublishNews,
        isActive: true
      }
    ]);
    setNewUser({ email: '', role: ROLES[0], canPublishNews: false });
  };

  // Первый этап удаления
  const startDelete = (id: string) => {
    setPendingDelete({ ...pendingDelete, [id]: true });
    setDeleteTimers({ ...deleteTimers, [id]: Date.now() + 3 * 60 * 1000 });
  };

  // Второй этап удаления (через 6 минут после первого этапа)
  const canConfirmDelete = (id: string) => {
    // Должно быть: прошло 3 минуты с момента старта, а потом ещё 3 минуты (итого 6 минут)
    return pendingDelete[id] && Date.now() > (deleteTimers[id] || 0) + 3 * 60 * 1000;
  };

  // Первый этап деактивации
  const startDeactivate = (id: string) => {
    setPendingDeactivate({ ...pendingDeactivate, [id]: true });
    setDeleteTimers({ ...deleteTimers, [id]: Date.now() + 3 * 60 * 1000 });
  };

  // Второй этап деактивации (через 6 минут после первого этапа)
  const canConfirmDeactivate = (id: string) => {
    return pendingDeactivate[id] && Date.now() > (deleteTimers[id] || 0) + 3 * 60 * 1000;
  };

  // Изменение прав пользователя
  const handleChangePublish = (id: string, value: boolean) => {
    setUsers(users.map(u => u.id === id ? { ...u, canPublishNews: value } : u));
  };

  // Изменение роли пользователя
  const handleChangeRole = (id: string, value: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: value } : u));
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow mt-8 mb-8">
      <h3 className="text-xl font-bold mb-4">Управление пользователями</h3>
      <form onSubmit={handleAddUser} className="flex gap-4 mb-6 flex-wrap">
        <input
          type="email"
          placeholder="Email пользователя"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          required
          className="border rounded px-3 py-2"
        />
        <select
          value={newUser.role}
          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          className="border rounded px-3 py-2"
        >
          {ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={newUser.canPublishNews}
            onChange={e => setNewUser({ ...newUser, canPublishNews: e.target.checked })}
          />
          Может публиковать новости
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Добавить пользователя</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Роль</th>
            <th className="border px-2 py-1">Публикация новостей</th>
            <th className="border px-2 py-1">Статус</th>
            <th className="border px-2 py-1">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">
                <select
                  value={user.role}
                  onChange={e => handleChangeRole(user.id, e.target.value)}
                  className="border rounded px-2 py-1"
                  disabled={!user.isActive}
                >
                  {ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
              <td className="border px-2 py-1">
                <input
                  type="checkbox"
                  checked={user.canPublishNews}
                  onChange={e => handleChangePublish(user.id, e.target.checked)}
                  disabled={!user.isActive}
                />
              </td>
              <td className="border px-2 py-1">
                {user.isActive ? 'Активен' : 'Нет доступа'}
              </td>
              <td className="border px-2 py-1">
                {!pendingDelete[user.id] ? (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded mr-2"
                    onClick={() => startDelete(user.id)}
                    disabled={!user.isActive}
                  >
                    Удалить
                  </button>
                ) : (
                  <>
                    <span className="text-yellow-700 mr-2">Ожидание подтверждения удаления...</span>
                    {canConfirmDelete(user.id) && (
                      <button
                        className="bg-red-800 text-white px-3 py-1 rounded"
                        onClick={() => confirmDelete(user.id)}
                      >
                        Подтвердить удаление
                      </button>
                    )}
                  </>
                )}
                {!pendingDeactivate[user.id] ? (
                  <button
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                    onClick={() => startDeactivate(user.id)}
                    disabled={!user.isActive}
                  >
                    Лишить доступа
                  </button>
                ) : (
                  <>
                    <span className="text-yellow-700 mr-2">Ожидание подтверждения блокировки...</span>
                    {canConfirmDeactivate(user.id) && (
                      <button
                        className="bg-gray-800 text-white px-3 py-1 rounded"
                        onClick={() => confirmDeactivate(user.id)}
                      >
                        Подтвердить блокировку
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;