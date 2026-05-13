import React from 'react';
import { NavLinkProps } from '../types';

export function NavLink({ icon, text, active = false }: NavLinkProps) {
  return (
    <a
      href="#"
      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'text-indigo-600 hover:text-indigo-700'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}