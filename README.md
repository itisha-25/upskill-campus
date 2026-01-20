# Food Delivery Application

A complete full-stack food delivery application with admin panel, user authentication, order management, and payment integration.

## Features

### Frontend (Customer App)
- User registration and authentication
- Browse food items by category
- Add items to cart
- Place orders with delivery details
- Order tracking
- User profile management
- Responsive design

### Admin Panel
- Admin authentication
- Add/Edit/Delete food items
- Order management with status updates
- Real-time order tracking
- Image upload for food items
- Dashboard analytics

### Backend API
- RESTful API with Express.js
- MongoDB database integration
- JWT authentication
- Input validation and sanitization
- File upload handling
- Stripe payment integration
- Order management system

## Tech Stack

- **Frontend**: React.js, React Router, Context API, CSS3
- **Admin Panel**: React.js, Axios, React Toastify
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Payment**: Stripe
- **File Upload**: Multer
- **Validation**: Express Validator

## Project Structure

```
food-del/
├── frontend/          # Customer React app
├── admin/            # Admin panel React app
├── backend/          # Node.js API server
└── uploads/          # Uploaded images
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Stripe account (for payments)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd food-del
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with your configurations
cp .env.example .env

# Edit .env file with your MongoDB URI and other configs
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# STRIPE_SECRET_KEY=your_stripe_secret_key

# Populate database with sample data (includes admin user)
npm run seed

# OR create admin user only
npm run create-admin

# Start the server
npm run server
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Admin Panel Setup
```bash
cd admin
npm install
npm run dev
```

## Default Admin Credentials

After running `npm run seed` or `npm run create-admin` in the backend:
- **Email**: admin@fooddel.com
- **Password**: admin123

## Sample User Credentials (after running `npm run seed`)

- **Email**: john@example.com | **Password**: password123
- **Email**: jane@example.com | **Password**: password123
- **Email**: mike@example.com | **Password**: password123

⚠️ **Important**: Change the default passwords after first login!

## Database Management

The application includes comprehensive database seeding scripts:

### Available Scripts
```bash
# Populate database with complete sample data (recommended for development)
npm run seed

# Add only food items (preserves existing users/orders)
npm run seed-food

# Create admin user only
npm run create-admin

# Clear all database data
npm run clear-db

# Reset database (clear + seed)
npm run reset-db
```

### Sample Data Included
- **5 Users**: 1 admin + 4 customers with realistic profiles
- **22 Food Items**: Across 8 categories with proper descriptions and pricing
- **10 Sample Orders**: With various statuses and payment methods
- **Complete Address Data**: For realistic order testing

See `backend/scripts/README.md` for detailed documentation.

## API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin/login` - Admin login

### Food Management
- `GET /api/food/list` - Get all food items
- `POST /api/food/add` - Add food item (Admin only)
- `POST /api/food/remove` - Remove food item (Admin only)
- `POST /api/food/update` - Update food item (Admin only)

### Order Management
- `POST /api/order/place` - Place order (COD)
- `POST /api/order/stripe` - Place order (Stripe)
- `POST /api/order/verify` - Verify payment
- `POST /api/order/userorders` - Get user orders
- `GET /api/order/list` - Get all orders (Admin only)
- `POST /api/order/status` - Update order status (Admin only)

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=4000
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### Admin (.env)
```env
VITE_BACKEND_URL=http://localhost:4000
```

## Features Implemented

### ✅ Authentication & Authorization
- User registration with password hashing
- JWT-based authentication
- Role-based access control (user, admin)
- Protected routes and API endpoints

### ✅ Input Validation
- Email format validation
- Password strength requirements
- Food item validation
- Order data validation
- XSS protection

### ✅ Admin Panel
- Secure admin login
- Food item management (CRUD)
- Order management with status updates
- Image upload functionality
- Responsive design

### ✅ Order Management
- Cart functionality
- Order placement
- Payment integration (COD + Stripe)
- Order status tracking
- Order history

### ✅ Error Handling
- Comprehensive error messages
- Input validation errors
- Authentication errors
- Database connection errors

## Database Management

The application includes comprehensive database seeding scripts:

### Available Scripts
```bash
# Populate database with complete sample data (recommended for development)
npm run seed

# Add only food items (preserves existing users/orders)
npm run seed-food

# Create admin user only
npm run create-admin

# Clear all database data
npm run clear-db

# Reset database (clear + seed)
npm run reset-db
```

### Sample Data Included
- **5 Users**: 1 admin + 4 customers with realistic profiles
- **22 Food Items**: Across 8 categories with proper descriptions and pricing
- **10 Sample Orders**: With various statuses and payment methods
- **Complete Address Data**: For realistic order testing

See `backend/scripts/README.md` for detailed documentation.

1. **Start all services**:
   - Backend: `cd backend && npm run server`
   - Frontend: `cd frontend && npm run dev`
   - Admin: `cd admin && npm run dev`

2. **Access the applications**:
   - Customer App: http://localhost:5173
   - Admin Panel: http://localhost:5174
   - API Server: http://localhost:4000

3. **Admin Panel Usage**:
   - Login with admin credentials
   - Add food items with images
   - Manage orders and update status
   - View all food items and orders

4. **Customer App Usage**:
   - Register/Login as customer
   - Browse food items
   - Add items to cart
   - Place orders with delivery details

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected API routes
- CORS configuration
- File upload restrictions

## Payment Integration

The application supports:
- Cash on Delivery (COD)
- Stripe payment gateway
- Payment verification
- Order status based on payment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please create an issue in the repository.