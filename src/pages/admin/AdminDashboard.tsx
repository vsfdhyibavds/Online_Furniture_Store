import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminOverview } from '../../components/admin/AdminOverview';
import { ProductManagement } from '../../components/admin/ProductManagement';
import { OrderManagement } from '../../components/admin/OrderManagement';
import { UserManagement } from '../../components/admin/UserManagement';

export function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Routes>
      </main>
    </div>
  );
}