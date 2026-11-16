export default function UserCard({ user, isFavorite, onToggleFavorite }) {
    return (
        <article className={`user-card ${isFavorite ? 'is-favorite' : ''}`}>
            <div className="user-info">
                <h3>{user.name}</h3>
                <p><strong>Correo:</strong> {user.email}</p>
                <p><strong>Ciudad:</strong> {user.address?.city}</p>
            </div>

            <button
                type="button"
                className={`fav-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(user.id)}
            >
                {isFavorite ? '★ Favorito' : '☆ Favorito'}
            </button>
        </article>
    );
}