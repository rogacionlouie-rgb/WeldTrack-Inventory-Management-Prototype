# WeldTrack - Inventory Management System

An inventory management system with cost tracking designed for welding shops.

## Features

- **Multi-Role Authentication**: Admin, Staff, Seller, and Customer roles
- **Dashboard**: Real-time statistics with interactive charts
- **Inventory Management**: Track materials, suppliers, and stock levels
- **Cost Tracking**: Monitor expenses across materials, labor, and miscellaneous costs
- **Project Management**: Create and manage welding projects with cost breakdowns
- **Sales/Transactions**: Record sales with automatic inventory deduction
- **Customer Booking**: Allow customers to book appointments
- **Reports**: Generate comprehensive reports (Inventory, Expenses, Projects)

## Tech Stack

- **Frontend**: React + TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (or npm)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/weldtrack.git
cd weldtrack
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to the local development URL shown in the terminal

## Default Login Credentials

- **Admin**: `admin` / `password`
- **Staff**: `staff` / `password`
- **Seller**: `seller` / `password`
- **Customer**: `customer` / `password`

## Project Structure

```
src/
├── app/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context (AppContext)
│   ├── pages/            # Page components
│   └── App.tsx           # Main app component
├── styles/               # Global styles and Tailwind config
└── routes.ts             # React Router configuration
```

## Features Overview

### For Admin
- Complete system overview
- Manage inventory, projects, and users
- View comprehensive reports
- Monitor all transactions

### For Staff
- Manage daily operations
- Update inventory
- Track project progress
- Process sales

### For Seller
- Record sales transactions
- View inventory
- Manage customer orders

### For Customer
- Book appointments
- View booking history
- Check service status

## Currency

All prices are displayed in Philippine Peso (₱).

## License

This project is created for educational purposes as a capstone project.

## Support

For issues or questions, please open an issue on GitHub.
