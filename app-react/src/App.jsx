import { useEffect, useState } from 'react';
import { fetchUsers } from './services/usersApi';
import UserCard from './components/UserCard';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUsers();
        if (active) setUsers(data);
      } catch (err) {
        if (active) setError(err.message || 'Ocurrió un error al cargar los usuarios.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadUsers();
    return () => { active = false; };
  }, []);

  const handleToggleFavorite = (userId) => {
    setFavoriteIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesFav = onlyFavorites ? favoriteIds.includes(user.id) : true;
    return matchesName && matchesFav;
  });

  return (
    <main className="container">
      <header className="app-header">
        <h1>Directorio de Usuarios (React)</h1>
        <span className="fav-counter">Favoritos: {favoriteIds.length}</span>
      </header>

      <section className="controls">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar por nombre"
        />
        <label className="filter-check">
          <input
            type="checkbox"
            checked={onlyFavorites}
            onChange={(e) => setOnlyFavorites(e.target.checked)}
          />
          Solo favoritos
        </label>
      </section>

      {loading && <p className="status-msg">Cargando...</p>}
      {error && <p className="status-msg error">Error: {error}</p>}

      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <p className="status-msg">No se encontraron usuarios con ese filtro.</p>
          ) : (
            <section className="users-grid">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isFavorite={favoriteIds.includes(user.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}