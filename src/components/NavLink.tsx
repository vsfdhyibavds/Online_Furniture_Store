import type { ReactNode } from 'react';

type NavLinkProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
};

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
