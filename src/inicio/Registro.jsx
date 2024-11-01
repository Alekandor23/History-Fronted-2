import { useState } from 'react';
import { registerUser } from '../service/api';
import { Link, useNavigate } from 'react-router-dom';
import './registroStyles.css'

const Registro = () => {
  const [formValues, setFormValues] = useState({
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    correoElectronico: '',
    contrasena: '',
    confirmarContrasena: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.contrasena !== formValues.confirmarContrasena) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    
      const usuarioCreado = await registerUser(formValues.nombreUsuario, formValues.nombre, formValues.apellido, formValues.correoElectronico, formValues.contrasena);
      console.log("Respuesta desde el front al crear usuario", usuarioCreado);
      setMessage(usuarioCreado.response.data.message);
      if(usuarioCreado.response.status === 201) {
        // Redirigir a la página de inicio de sesión
        navigate('/login');
      }
  };

  return (
    <div className="registro-container">
      <div className="wrapper">
        <div className="registro_box">
          <Link to="/" className="login-header no-hover">
            <span>History House</span>
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="input_box">
              <input
                type="text"
                id="Nombre"
                className="input-field"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChange}
                required
              />
              <label htmlFor="Nombre" className="label">Nombre(s)</label>
            </div>
            <div className="input_box">
              <input
                type="text"
                id="Apellido"
                className="input-field"
                name="apellido"
                value={formValues.apellido}
                onChange={handleChange}
                required
              />
              <label htmlFor="Apellido" className="label">Apellido(s)</label>
            </div>
            <div className="input_box">
              <input
                type="text"
                id="Nombre de usuario"
                className="input-field"
                name="nombreUsuario"
                value={formValues.nombreUsuario}
                onChange={handleChange}
                required
              />
              <label htmlFor="Nombre de usuario" className="label">Nombre de usuario</label>
              <i className="bx bx-user icon"></i>
            </div>
            <div className="input_box">
              <input
                type="email"
                id="Correo electrónico"
                className="input-field"
                name="correoElectronico"
                value={formValues.correoElectronico}
                onChange={handleChange}
                required
              />
              <label htmlFor="Correo electrónico" className="label">Correo electrónico</label>
            </div>
            <div className="input_box">
              <input
                type="password"
                id="Contraseña"
                className="input-field"
                name="contrasena"
                value={formValues.contrasena}
                onChange={handleChange}
                required
              />
              <label htmlFor="Contraseña" className="label">Contraseña</label>
              <i className="bx bx-lock-alt icon"></i>
            </div>
            <div className="input_box">
              <input
                type="password"
                id="Confirmar contraseña"
                className="input-field"
                name="confirmarContrasena"
                value={formValues.confirmarContrasena}
                onChange={handleChange}
                required
              />
              <label htmlFor="Confirmar contraseña" className="label">Confirmar contraseña</label>
            </div>
            <div className="input_box">
              <div className="button-group">
                <input type="submit" className="input-submit crear-cuenta" value="Crear cuenta" />
                <input
                  type="button"
                  className="input-submit cancelar"
                  value="Cancelar"
                  onClick={() => setFormValues({
                    nombreUsuario: '',
                    nombre: '',
                    apellido: '',
                    correoElectronico: '',
                    contrasena: '',
                    confirmarContrasena: ''
                  })}
                />
              </div>
            </div>
          </form>
          {message && <p className="message">{message}</p>}
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
