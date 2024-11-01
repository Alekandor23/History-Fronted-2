import { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { loginUser } from '../service/api';

const Login = () => {
  const [credentials, setCredentials] = useState({
    nombreUsuario: '',
    contrasenia: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { user, setUser } = useState(null);	

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const usuarioCreado = await loginUser(credentials.nombreUsuario, credentials.contrasenia);
      console.log(credentials.nombreUsuario, credentials.contrasenia);
      console.log('Respuesta desde el front al iniciar sesión:', usuarioCreado);
      if(usuarioCreado.response.status === 200) {
        setUser(usuarioCreado.response.data.usuario);
        console.log(user);
        navigate('/'); // Redirigir al usuario a la página principal
      }

    } catch (error) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="login">
      <div className="login-screen">
        <div className="contenedor-logo">
          <h3>Logo</h3>
        </div>
        <div className="app-title">
          <h1>History House</h1>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="control-group">
              <input
                type="text"
                className="login-field"
                placeholder="Usuario"
                id="login-name"
                name="nombreUsuario"
                value={credentials.nombreUsuario}
                onChange={handleChange}
                required
              />
            </div>
            <div className="control-group">
              <input
                type="password"
                className="login-field"
                placeholder="Contraseña"
                id="login-pass"
                name="contrasenia"
                value={credentials.contrasenia}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-container">
              <button className="login-button" type="submit">Iniciar Sesión</button>
              <button className="signup-button" type="button" onClick={() => navigate('/Registro')}>
                Crear Usuario
              </button>
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;

