import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import '../estilos.css'

export default function AppLayout({ title, children }) {
return (
<div className="container">
<Sidebar />
<div className="main-content">
<Header title={title} />
{children}
<Footer />
</div>
</div>
)
}