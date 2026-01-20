# Database Scripts Documentation

This directory contains various scripts to manage and populate your MongoDB database for the Food Delivery application.

## Available Scripts

### 1. Full Database Seeder (`npm run seed`)
**File**: `seedDatabase.js`

Populates the database with comprehensive sample data including:
- **5 Users**: 4 regular customers + 1 admin
- **16 Food Items**: Across 8 categories (Salad, Rolls, Deserts, Sandwich, Cake, Pure Veg, Pasta, Noodles)
- **10 Sample Orders**: With realistic order data, random statuses, and payment methods

**What it does**:
- Clears all existing data
- Creates users with hashed passwords
- Adds diverse food items with proper categorization
- Generates realistic orders with random dates (last 30 days)
- Provides detailed statistics after completion

**Usage**:
```bash
cd backend
npm run seed
```

### 2. Food-Only Seeder (`npm run seed-food`)
**File**: `seedFoodOnly.js`

Adds only food items to the database without affecting users or orders.

**What it includes**:
- 22 food items across 8 categories
- More variety in each category
- Price range from $4.99 to $14.99
- Detailed descriptions for each item

**Usage**:
```bash
cd backend
npm run seed-food
```

### 3. Admin Creator (`npm run create-admin`)
**File**: `createAdmin.js`

Creates a single admin user for accessing the admin panel.

**Credentials**:
- Email: `admin@fooddel.com`
- Password: `admin123`

**Usage**:
```bash
cd backend
npm run create-admin
```

### 4. Database Cleaner (`npm run clear-db`)
**File**: `clearDatabase.js`

Completely clears all data from the database.

**⚠️ Warning**: This will delete ALL data including users, food items, and orders.

**Usage**:
```bash
cd backend
npm run clear-db
```

### 5. Complete Reset (`npm run reset-db`)
Combines clear and seed operations - clears all data then populates with fresh sample data.

**Usage**:
```bash
cd backend
npm run reset-db
```

## Sample Data Details

### Users Created
| Name | Email | Role | Password |
|------|-------|------|----------|
| Admin User | admin@fooddel.com | admin | admin123 |
| John Doe | john@example.com | user | password123 |
| Jane Smith | jane@example.com | user | password123 |
| Mike Johnson | mike@example.com | user | password123 |
| Sarah Wilson | sarah@example.com | user | password123 |

### Food Categories & Items
- **Salad**: Greek Salad, Caesar Salad, Garden Fresh Salad
- **Rolls**: Chicken Roll, Veg Roll, Paneer Roll
- **Deserts**: Chocolate Cake, Vanilla Ice Cream, Tiramisu
- **Sandwich**: Club Sandwich, Grilled Cheese, BLT Sandwich
- **Cake**: Red Velvet Cake, Cheesecake, Black Forest Cake
- **Pure Veg**: Paneer Curry, Vegetable Biryani, Dal Tadka
- **Pasta**: Chicken Alfredo, Spaghetti Bolognese, Penne Arrabbiata
- **Noodles**: Chicken Hakka Noodles, Vegetable Chow Mein, Pad Thai

### Order Features
- Random order statuses: Food Processing, Out for delivery, Delivered
- Mixed payment methods: COD and Stripe
- Realistic order amounts with delivery charges
- Orders distributed over the last 30 days
- Multiple items per order (1-4 items)

## Environment Requirements

Make sure your `.env` file contains:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Usage Scenarios

### Development Setup
```bash
# First time setup
npm run seed

# Reset during development
npm run reset-db

# Add only food items (keep existing users/orders)
npm run seed-food
```

### Production Setup
```bash
# Create admin only
npm run create-admin
```

### Testing
```bash
# Clear everything for clean tests
npm run clear-db

# Populate with test data
npm run seed
```

## Error Handling

All scripts include comprehensive error handling:
- Database connection validation
- Duplicate data checking
- Detailed error messages
- Graceful exit codes

## Security Notes

- All passwords are properly hashed using bcrypt
- Sample data is for development/testing only
- Change default passwords in production
- Admin credentials should be updated after first login

## Statistics Output

After running the seeder, you'll see:
- Total counts of created records
- Category breakdowns
- Order statistics by status
- Revenue calculations
- Price range analysis

This helps verify the seeding was successful and provides insights into the generated data.