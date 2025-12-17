import React from 'react'
import Sidebar from '../components/navigation/Sidebar'
import Navbar from '../components/navigation/Navbar'

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout