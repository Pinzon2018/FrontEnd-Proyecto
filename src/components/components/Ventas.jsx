import React, { useState } from 'react'
import AppLayout from './AppLayout'
import '../estilos.css'

export default function Ventas() {
const [idProducto, setIdProducto] = useState('')
const [cantidad, setCantidad] = useState(1)
const [productos, setProductos] = useState([])
const [total, setTotal] = useState(0)

const productosBD = [
{ id: 101, nombre: 'Crema Hidratante Premium', precio: 45000 },
{ id: 102, nombre: 'Shampoo Anticaspa', precio: 32000 },
{ id: 103, nombre: 'Labial Mate Rojo', precio: 28000 },
{ id: 104, nombre: 'Protector Solar FPS 50', precio: 55000 },
{ id: 105, nombre: 'Perfume Floral', precio: 120000 }
]

const buscarProducto = (id) => productosBD.find(p => p.id === parseInt(id))

const agregarProducto = () => {
if (!idProducto) return alert('Ingrese un ID de producto')
if (cantidad <= 0) return alert('Cantidad inválida')

const productoEncontrado = buscarProducto(idProducto)
if (!productoEncontrado) return alert('Producto no encontrado')

const existente = productos.find(p => p.id === productoEncontrado.id)
let nuevosProductos

if (existente) {
  nuevosProductos = productos.map(p =>
    p.id === existente.id
      ? {
          ...p,
          cantidad: p.cantidad + cantidad,
          subtotal: (p.cantidad + cantidad) * p.precio
        }
      : p
  )
} else {
  nuevosProductos = [
    ...productos,
    {
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      cantidad,
      subtotal: cantidad * productoEncontrado.precio
    }
  ]
}

setProductos(nuevosProductos)
setTotal(nuevosProductos.reduce((sum, p) => sum + p.subtotal, 0))
setIdProducto('')
setCantidad(1)
}
const eliminarProducto = (id) => {
const nuevos = productos.filter(p => p.id !== id)
setProductos(nuevos)
setTotal(nuevos.reduce((sum, p) => sum + p.subtotal, 0))
}

const finalizarVenta = () => {
if (productos.length === 0) return alert('No hay productos en la venta')
alert('Venta finalizada. Total: $${total.toLocaleString()}')
setProductos([])
setTotal(0)
}

return (
<AppLayout title="PUNTO DE VENTA">
<hr />
  <div className="ingreso-producto">
    <h3><i className="fas fa-plus-circle"></i> Ingresar Producto a la Venta</h3>
    <div className="form-group">
      <label htmlFor="id_producto"><i className="fas fa-barcode"></i> ID del Producto</label>
      <input
        type="number"
        id="id_producto"
        value={idProducto}
        onChange={(e) => setIdProducto(e.target.value)}
        placeholder="Ej: 101"
        autoFocus
      />
    </div>
    <div className="form-group">
      <label htmlFor="cantidad"><i className="fas fa-sort-numeric-up"></i> Cantidad</label>
      <input
        type="number"
        id="cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(parseInt(e.target.value))}
        placeholder="Ej: 2"
        min={1}
      />
    </div>
    <div className="form-actions">
      <button className="btn btn-agregar" onClick={agregarProducto}>
        <i className="fas fa-cart-plus"></i> Agregar a la Venta
      </button>
      <button className="btn btn-secundario" onClick={() => {
        setIdProducto('')
        setCantidad(1)
      }}>
        <i className="fas fa-eraser"></i> Limpiar
      </button>
    </div>
  </div>

  {/* Tabla productos agregados */}
  <div className="tabla-container">
    <h3><i className="fas fa-list"></i> Productos Agregados</h3>
    <table className="tabla-historial tabla-productos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(producto => (
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.cantidad}</td>
            <td>${producto.precio.toLocaleString()}</td>
            <td>${producto.subtotal.toLocaleString()}</td>
            <td>
              <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>
                <i className="fas fa-trash"></i> Eliminar
              </button>
            </td>
          </tr>
        ))}
        {productos.length === 0 && (
          <tr><td colSpan="6" style={{ textAlign: 'center' }}>No hay productos agregados</td></tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Resumen */}
  <div className="resumen-venta">
    <div className="total-venta">
      <span>Total: $</span><span>{total.toLocaleString()}</span>
    </div>
    <div className="acciones-venta">
      <button className="btn btn-finalizar" onClick={finalizarVenta}>
        <i className="fas fa-check-circle"></i> Finalizar Venta
      </button>
      <a href="/historial-venta" className="btn btn-historial">
        <i className="fas fa-clock-rotate-left"></i> Historial de Ventas
      </a>
    </div>
  </div>
</AppLayout>
)
}