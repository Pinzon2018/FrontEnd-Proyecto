import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Profile from '../components/Profile/perfil';
import Inicio from '../components/Home/Inicio';
import Usuarios from '../components/Usuarios/Users';
import Categorias from '../components/Categoria/Categorias';
import Proveedores from '../components/Proveedor/Proveedor';

const NavbarRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path='/usuarios' element={<Usuarios />}/>
            <Route path="/categorias" element={<Categorias />}/>
            <Route path="/proveedores" element={<Proveedores />}/>
        </Routes>
    );
};

export default NavbarRoutes;