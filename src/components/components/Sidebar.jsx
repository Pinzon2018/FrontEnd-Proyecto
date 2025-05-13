import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../estilos.css'

export default function Sidebar() {
const navigate = useNavigate()

return (
<div className="sidebar" id="sidebar">
<button className="toggle-sidebar" onClick={() => {
document.getElementById('sidebar').classList.toggle('collapsed')
}}>
<i className="fas fa-chevron-left" id="sidebar-icon"></i>
</button>

  <div className="sidebar-header">
    <h3><i className="fas fa-store-alt"></i> <span>BELLA Y ACTUAL</span></h3>
  </div>

  <div className="sidebar-menu">
    <NavLink to="/" className="menu-item">
      <i className="fas fa-home"></i><span>Home</span>
    </NavLink>
    <NavLink to="/ventas" className="menu-item">
      <i className="fas fa-cash-register"></i><span>Punto de Venta</span>
    </NavLink>
    <NavLink to="/historial-venta" className="menu-item">
      <i className="fas fa-receipt"></i><span>Historial Ventas</span>
    </NavLink>
    <NavLink to="/historial-producto" className="menu-item">
      <i className="fas fa-boxes"></i><span>Historial Productos</span>
    </NavLink>
    <NavLink to="/historial-general" className="menu-item">
      <i className="fas fa-history"></i><span>Historial General</span>
    </NavLink>
    <NavLink to="/detalle-venta" className="menu-item">
      <i className="fas fa-list-alt"></i><span>Detalle Ventas</span>
    </NavLink>
    <NavLink to="/contacto" className="menu-item">
      <i className="fas fa-envelope"></i><span>Contacto</span>
    </NavLink>
  </div>
</div>
)}
