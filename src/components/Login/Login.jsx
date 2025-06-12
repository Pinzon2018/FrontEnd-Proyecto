import React, {useState} from "react";
import axios from "axios";
import "../../styles/style.css";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
    const [loginInput, setLoginInput] = useState(""); // Email o Username
    const [Contraseña_hash, setPassword] = useState("");
    

    const handleLogin = () => {
        // Detectar si es email o username y enviar ambos campos
        const isEmail = loginInput.includes('@');
        const loginData = {
            Email_Usu: isEmail ? loginInput : "",
            Nombre_Usu: !isEmail ? loginInput : "",
            Contraseña_hash: Contraseña_hash
        };

        axios
            .post("http://127.0.0.1:5000/login", loginData)
            .then((response) => {
                localStorage.setItem('token', response.data.access_token);
                window.location.href = "/inicio";
            })
            .catch((error) => {
                console.error("Error al iniciar sesión", error);
                alert("Error al iniciar sesión");
            });
    };
    
    return (
        <div className="login-container">
            <div className="wrapper">
                <h1>Inicio de Sesión</h1>
                <div className="input-box">
                    <input
                    type="text"
                    placeholder="Email o Usuario"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    />
                    <PersonIcon className='icon' />
                </div>
                <div className="input-box">
                    <input
                    type="password"
                    placeholder="Contraseña"
                    value={Contraseña_hash}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <LockIcon className='icon' />
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}

export default Login;