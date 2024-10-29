export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
  };
  
  export type NavLinkProps = {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
  };