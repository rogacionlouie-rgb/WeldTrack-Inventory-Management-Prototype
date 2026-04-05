import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'staff' | 'seller' | 'customer';
  name: string;
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  dateAdded: string;
  lowStockThreshold: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ongoing' | 'completed';
  startDate: string;
  endDate?: string;
  materials: { materialId: string; quantity: number; cost: number }[];
  laborCost: number;
  miscCost: number;
  totalCost: number;
}

export interface Transaction {
  id: string;
  type: 'sale' | 'purchase';
  date: string;
  items: { materialId: string; quantity: number; price: number }[];
  total: number;
  customer?: string;
  sellerId?: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerId: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
}

interface AppContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  materials: Material[];
  addMaterial: (material: Omit<Material, 'id'>) => void;
  updateMaterial: (id: string, material: Partial<Material>) => void;
  deleteMaterial: (id: string) => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockUsers: User[] = [
  { id: '1', username: 'admin', role: 'admin', name: 'Admin User' },
  { id: '2', username: 'staff', role: 'staff', name: 'Staff Member' },
  { id: '3', username: 'seller', role: 'seller', name: 'Sales Person' },
  { id: '4', username: 'customer', role: 'customer', name: 'John Doe' },
];

const initialMaterials: Material[] = [
  {
    id: '1',
    name: 'Steel Plate (1/4 inch)',
    quantity: 150,
    unit: 'sheets',
    unitPrice: 1250,
    supplier: 'Manila Steel Corp',
    dateAdded: '2026-03-15',
    lowStockThreshold: 30,
  },
  {
    id: '2',
    name: 'Welding Rod E6013',
    quantity: 8,
    unit: 'boxes',
    unitPrice: 850,
    supplier: 'Welding Supplies PH',
    dateAdded: '2026-03-20',
    lowStockThreshold: 10,
  },
  {
    id: '3',
    name: 'Steel Tube (2 inch)',
    quantity: 45,
    unit: 'pieces',
    unitPrice: 450,
    supplier: 'Metro Steel Trading',
    dateAdded: '2026-03-10',
    lowStockThreshold: 20,
  },
  {
    id: '4',
    name: 'Angle Bar (2x2 inch)',
    quantity: 120,
    unit: 'pieces',
    unitPrice: 380,
    supplier: 'Manila Steel Corp',
    dateAdded: '2026-03-18',
    lowStockThreshold: 25,
  },
  {
    id: '5',
    name: 'Paint (Anti-rust)',
    quantity: 15,
    unit: 'gallons',
    unitPrice: 650,
    supplier: 'Industrial Coatings Inc',
    dateAdded: '2026-03-25',
    lowStockThreshold: 5,
  },
];

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Steel Gate for SM Mall',
    description: 'Custom steel gate with intricate design',
    status: 'ongoing',
    startDate: '2026-03-20',
    materials: [
      { materialId: '1', quantity: 10, cost: 12500 },
      { materialId: '2', quantity: 2, cost: 1700 },
    ],
    laborCost: 15000,
    miscCost: 3500,
    totalCost: 32700,
  },
  {
    id: '2',
    name: 'Factory Railings',
    description: 'Safety railings for manufacturing facility',
    status: 'ongoing',
    startDate: '2026-03-10',
    materials: [
      { materialId: '3', quantity: 20, cost: 9000 },
      { materialId: '4', quantity: 15, cost: 5700 },
    ],
    laborCost: 25000,
    miscCost: 5000,
    totalCost: 44700,
  },
  {
    id: '3',
    name: 'Residential Window Grills',
    description: 'Security window grills for residential building',
    status: 'completed',
    startDate: '2026-02-15',
    endDate: '2026-03-05',
    materials: [
      { materialId: '4', quantity: 30, cost: 11400 },
      { materialId: '2', quantity: 3, cost: 2550 },
    ],
    laborCost: 18000,
    miscCost: 2500,
    totalCost: 34450,
  },
];

const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'sale',
    date: '2026-04-01',
    items: [{ materialId: '1', quantity: 5, price: 1250 }],
    total: 6250,
    customer: 'ABC Construction',
    sellerId: '3',
  },
  {
    id: '2',
    type: 'sale',
    date: '2026-04-02',
    items: [
      { materialId: '3', quantity: 10, price: 450 },
      { materialId: '4', quantity: 8, price: 380 },
    ],
    total: 7540,
    customer: 'XYZ Builders',
    sellerId: '3',
  },
  {
    id: '3',
    type: 'purchase',
    date: '2026-03-28',
    items: [{ materialId: '2', quantity: 5, price: 850 }],
    total: 4250,
  },
];

const initialBookings: Booking[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerId: '4',
    service: 'Custom Gate Fabrication',
    date: '2026-04-10',
    time: '10:00 AM',
    status: 'confirmed',
    notes: 'Need measurements for residential gate',
  },
  {
    id: '2',
    customerName: 'Maria Santos',
    customerId: '5',
    service: 'Metal Repair',
    date: '2026-04-08',
    time: '2:00 PM',
    status: 'pending',
    notes: 'Broken metal fence repair',
  },
  {
    id: '3',
    customerName: 'Peter Cruz',
    customerId: '6',
    service: 'Welding Consultation',
    date: '2026-04-05',
    time: '9:00 AM',
    status: 'completed',
    notes: 'Consultation for industrial project',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const login = (username: string, password: string): boolean => {
    const foundUser = mockUsers.find((u) => u.username === username);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addMaterial = (material: Omit<Material, 'id'>) => {
    const newMaterial = { ...material, id: Date.now().toString() };
    setMaterials([...materials, newMaterial]);
  };

  const updateMaterial = (id: string, updatedMaterial: Partial<Material>) => {
    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, ...updatedMaterial } : m))
    );
  };

  const deleteMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Date.now().toString() };
    setTransactions([...transactions, newTransaction]);

    if (transaction.type === 'sale') {
      transaction.items.forEach((item) => {
        const material = materials.find((m) => m.id === item.materialId);
        if (material) {
          updateMaterial(item.materialId, {
            quantity: material.quantity - item.quantity,
          });
        }
      });
    } else if (transaction.type === 'purchase') {
      transaction.items.forEach((item) => {
        const material = materials.find((m) => m.id === item.materialId);
        if (material) {
          updateMaterial(item.materialId, {
            quantity: material.quantity + item.quantity,
          });
        }
      });
    }
  };

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking = { ...booking, id: Date.now().toString() };
    setBookings([...bookings, newBooking]);
  };

  const updateBooking = (id: string, updatedBooking: Partial<Booking>) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, ...updatedBooking } : b))
    );
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        materials,
        addMaterial,
        updateMaterial,
        deleteMaterial,
        projects,
        addProject,
        updateProject,
        deleteProject,
        transactions,
        addTransaction,
        bookings,
        addBooking,
        updateBooking,
        deleteBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
