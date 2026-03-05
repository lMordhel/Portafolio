import { useState } from 'react';
import './AdminPanel.css'; // Luego creamos este CSS

function AdminPanel() {
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const fetchMessages = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://portafolio-back-end-phi.vercel.app/messages", {
        headers: { "x-token": token }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        setIsLoggedIn(true);
        setError('');
      } else {
        setError('Token incorrecto o acceso denegado');
      }
    } catch {
      setError('Error al conectar con el servidor');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <h2>Panel de Administración</h2>
          <form onSubmit={fetchMessages}>
            <input
              type="password"
              placeholder="Introduce tu ADMIN_TOKEN"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="admin-input"
            />
            <button type="submit" className="btn btn--primary btn--lg">Entrar</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Mensajes Recibidos</h2>
        <button onClick={() => setIsLoggedIn(false)} className="btn btn--secondary btn--sm">Cerrar Sesión</button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((m, index) => (
                <tr key={index}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.message}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-messages">No hay mensajes aún.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;