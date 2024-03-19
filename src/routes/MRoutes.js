import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from '../Layouts/Admin/AdminLayout';
import { Login } from '../views/Login/Login';
import { Home } from '../views/Home/Home';
import { Teste } from '../views/Teste/Teste';
import { RequireAuth } from '../contexts/Auth/RequireAuth';
import { Sector } from '../views/Sectors/Sector';
import { Content } from '../views/Contents/Content';
import { Streaming } from '../views/Streamings/Streaming';

const MRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route 
        path="/" 
        element={
          <RequireAuth>
            <AdminLayout>
              <Home />
            </AdminLayout>
          </RequireAuth>
        } 
      />
      <Route 
        path="/sector/:id"  // Atualize o caminho aqui
        element={
          <RequireAuth>
            <AdminLayout>
              <Sector />
            </AdminLayout>
          </RequireAuth>
        } 
      />
      <Route 
        path="/content/:id/:sector_id"  // Atualize o caminho aqui
        element={
          <RequireAuth>
            <AdminLayout>
              <Content />
            </AdminLayout>
          </RequireAuth>
        } 
      />
       <Route 
        path="/streaming/:id/:sector_id"  // Atualize o caminho aqui
        element={
          <RequireAuth>
            <AdminLayout>
              <Streaming />
            </AdminLayout>
          </RequireAuth>
        } 
      />
      <Route path="/teste" element={<AdminLayout><Teste /></AdminLayout>} />
      
    </Routes>
  );
};

export default MRoutes;
