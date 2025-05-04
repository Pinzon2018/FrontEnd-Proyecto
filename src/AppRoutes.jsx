import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/perfil";
import Navbar from "./components/Navbar/Navbar";
import Inicio from "./components/Home/Inicio";
import Usuarios from "./components/Usuarios/Users";
import RegistroUsers from "./components/Usuarios/RegistroUsers";
import EditarUsuario from "./components/Usuarios/EditarUsers";
import EliminarUsuario from "./components/Usuarios/EliminarUser";
import Categorias from "./components/Categoria/Categorias";
import RegistroCategoria from "./components/Categoria/RegistroCategoria";
import EditarCategoria from "./components/Categoria/EditarCategoria";
import EliminarCategoria from "./components/Categoria/EliminarCategoria";
import Proveedores from "./components/Proveedor/Proveedor";
import RegistroProveedor from "./components/Proveedor/RegistroProveedor";
import EditarProveedor from "./components/Proveedor/EditarProveedor";
import EliminarProveedor from "./components/Proveedor/EliminarProveedor";
import Subcategoria from "./components/Subcategorias/Subcategorias";
import RegistroSubcategoria from "./components/Subcategorias/RegistroSubcategoria";
import EditarSubcategoria from "./components/Subcategorias/EditarSubcategorias";
import EliminarSubcategoria from "./components/Subcategorias/EliminarSubcategoria";
import Productos from "./components/Productos/Productos";
import RegistroProducto from "./components/Productos/RegistroProductos";
import EditarProducto from "./components/Productos/EditarProductos";
import EliminarProducto from "./components/Productos/EliminarProducto";
import SwaggerDocs from "./components/Swagger/SwaggerDocs";
import GenerarVenta from "./components/Venta/GenerarVenta";
import Ventas from "./components/Venta/Ventas";

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/editar-usuario/:Id_Usuario" element={<EditarUsuario />} />
          <Route path="/eliminar-usuario/:Id_Usuario" element={<EliminarUsuario />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/usuarios" element={<Usuarios />}/>
          <Route path="/registro-usuario" element={<RegistroUsers />}/>
          <Route path="/categorias" element={<Categorias />}/>
          <Route path="/registro-categoria" element={<RegistroCategoria />}/>
          <Route path="/editar-categoria/:Id_Categoria" element={<EditarCategoria />} />
          <Route path="/eliminar-categoria/:Id_Categoria" element={<EliminarCategoria />} />
          <Route path="/proveedores" element={<Proveedores />}/>
          <Route path="/registro-proveedor" element={<RegistroProveedor />}/>
          <Route path="/editar-proveedor/:Id_Proveedor" element={<EditarProveedor />} />
          <Route path="/eliminar-proveedor/:Id_Proveedor" element={<EliminarProveedor />} />
          <Route path="/subcategorias" element={<Subcategoria />} />
          <Route path="/registro-subcategoria" element={<RegistroSubcategoria />} />
          <Route path="/editar-subcategoria/:Id_Subcategoria" element={<EditarSubcategoria />} />
          <Route path="/eliminar-subcategoria/:Id_Subcategoria" element={<EliminarSubcategoria />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/registro-producto" element={<RegistroProducto />} />
          <Route path="/editar-producto/:Id_Producto" element={<EditarProducto />} />
          <Route path="/eliminar-producto/:Id_Producto" element={<EliminarProducto />} />
          <Route path="/docs" element={<SwaggerDocs />} />
          <Route path="/ventas" element={<GenerarVenta />} />
          <Route path="/historial" element={<Ventas />} />
        </Routes>
      </div>
    </>
  );
}

export default AppRoutes;

