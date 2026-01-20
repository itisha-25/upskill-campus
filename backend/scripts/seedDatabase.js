import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import 'dotenv/config';

// Sample food data with CDN images
const sampleFoods = [
    {
        name: "Greek Salad",
        description: "Fresh mixed greens with feta cheese, olives, tomatoes, and cucumber in olive oil dressing",
        price: 12.99,
        category: "Salad",
        image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop"
    },
    {
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with parmesan cheese, croutons, and caesar dressing",
        price: 10.99,
        category: "Salad",
        image: "https://images.unsplash.com/photo-1604908177522-4023c24a1e4c?w=400&h=300&fit=crop"
    },
    {
        name: "Chicken Roll",
        description: "Grilled chicken wrapped in soft tortilla with fresh vegetables and sauce",
        price: 8.99,
        category: "Rolls",
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&h=300&fit=crop"
    },
    {
        name: "Veg Roll",
        description: "Fresh vegetables wrapped in soft tortilla with hummus and herbs",
        price: 7.99,
        category: "Rolls",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop"
    },
    {
        name: "Chocolate Cake",
        description: "Rich chocolate cake with chocolate frosting and chocolate chips",
        price: 6.99,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        name: "Vanilla Ice Cream",
        description: "Creamy vanilla ice cream with chocolate sauce and nuts",
        price: 4.99,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1505253216365-5942e24d7f27?w=400&h=300&fit=crop"
    },
    {
        name: "Club Sandwich",
        description: "Triple layer sandwich with chicken, lettuce, tomato, and mayo",
        price: 11.99,
        category: "Sandwich",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop"
    },
    {
        name: "Grilled Cheese Sandwich",
        description: "Classic grilled cheese sandwich with melted cheddar on toasted bread",
        price: 6.99,
        category: "Sandwich",
        image: "https://images.unsplash.com/photo-1585238342028-4bbc2c35a44b?w=400&h=300&fit=crop"
    },
    {
        name: "Red Velvet Cake",
        description: "Moist red velvet cake with cream cheese frosting",
        price: 7.99,
        category: "Cake",
        image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop"
    },
    {
        name: "Cheesecake",
        description: "New York style cheesecake with berry compote",
        price: 8.99,
        category: "Cake",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop"
    },
    {
        name: "Paneer Curry",
        description: "Creamy paneer curry with aromatic spices served with rice",
        price: 13.99,
        category: "Pure Veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop"
    },
    {
        name: "Vegetable Biryani",
        description: "Fragrant basmati rice with mixed vegetables and traditional spices",
        price: 12.99,
        category: "Pure Veg",
        image: "https://images.unsplash.com/photo-1604908177522-1a2e6c91bfe4?w=400&h=300&fit=crop"
    },
    {
        name: "Chicken Alfredo Pasta",
        description: "Creamy alfredo pasta with grilled chicken and parmesan cheese",
        price: 14.99,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop"
    },
    {
        name: "Spaghetti Bolognese",
        description: "Classic spaghetti with rich meat sauce and herbs",
        price: 13.99,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop"
    },
    {
        name: "Chicken Hakka Noodles",
        description: "Stir-fried noodles with chicken and vegetables in soy sauce",
        price: 11.99,
        category: "Noodles",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop"
    },
    {
        name: "Vegetable Chow Mein",
        description: "Crispy noodles with mixed vegetables and savory sauce",
        price: 10.99,
        category: "Noodles",
        image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop"
    }
];


// Sample users data
const sampleUsers = [
    {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
        phone: "+1234567890",
        address: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA"
        }
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        role: "user",
        phone: "+1234567891",
        address: {
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
            country: "USA"
        }
    },
    {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: "password123",
        role: "user",
        phone: "+1234567892",
        address: {
            street: "789 Pine St",
            city: "Chicago",
            state: "IL",
            zipCode: "60601",
            country: "USA"
        }
    },
    {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        password: "password123",
        role: "user",
        phone: "+1234567893",
        address: {
            street: "321 Elm St",
            city: "Houston",
            state: "TX",
            zipCode: "77001",
            country: "USA"
        }
    },
    {
        name: "Admin User",
        email: "admin@fooddel.com",
        password: "admin123",
        role: "admin",
        phone: "+1234567894"
    }
];

const seedDatabase = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database");

        // Clear existing data
        console.log("Clearing existing data...");
        await userModel.deleteMany({});
        await foodModel.deleteMany({});
        await orderModel.deleteMany({});
        console.log("Existing data cleared");

        // Create users with hashed passwords
        console.log("Creating users...");
        const users = [];
        for (const userData of sampleUsers) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            
            const user = new userModel({
                ...userData,
                password: hashedPassword
            });
            
            const savedUser = await user.save();
            users.push(savedUser);
        }
        console.log(`Created ${users.length} users`);

        // Create food items
        console.log("Creating food items...");
        const foods = [];
        for (const foodData of sampleFoods) {
            const food = new foodModel(foodData);
            const savedFood = await food.save();
            foods.push(savedFood);
        }
        console.log(`Created ${foods.length} food items`);

        // Create sample orders
        console.log("Creating sample orders...");
        const regularUsers = users.filter(user => user.role === 'user');
        const orders = [];

        // Create 10 sample orders
        for (let i = 0; i < 10; i++) {
            const randomUser = regularUsers[Math.floor(Math.random() * regularUsers.length)];
            const randomFoods = [];
            
            // Add 1-4 random food items to each order
            const numItems = Math.floor(Math.random() * 4) + 1;
            for (let j = 0; j < numItems; j++) {
                const randomFood = foods[Math.floor(Math.random() * foods.length)];
                const quantity = Math.floor(Math.random() * 3) + 1;
                randomFoods.push({
                    _id: randomFood._id,
                    name: randomFood.name,
                    price: randomFood.price,
                    quantity: quantity
                });
            }

            // Calculate total amount
            const amount = randomFoods.reduce((total, item) => total + (item.price * item.quantity), 0) + 2; // +2 for delivery

            // Random order status
            const statuses = ['Food Processing', 'Out for delivery', 'Delivered'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

            // Random payment method
            const paymentMethods = ['COD', 'Stripe'];
            const randomPaymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

            const order = new orderModel({
                userId: randomUser._id.toString(),
                items: randomFoods,
                amount: Math.round(amount * 100) / 100, // Round to 2 decimal places
                address: {
                    firstName: randomUser.name.split(' ')[0],
                    lastName: randomUser.name.split(' ')[1] || '',
                    email: randomUser.email,
                    street: randomUser.address?.street || '123 Default St',
                    city: randomUser.address?.city || 'Default City',
                    state: randomUser.address?.state || 'Default State',
                    zipcode: randomUser.address?.zipCode || '12345',
                    country: randomUser.address?.country || 'USA',
                    phone: randomUser.phone || '+1234567890'
                },
                status: randomStatus,
                payment: randomPaymentMethod === 'Stripe' ? true : Math.random() > 0.3, // 70% paid for COD
                paymentMethod: randomPaymentMethod,
                date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Random date within last 30 days
            });

            const savedOrder = await order.save();
            orders.push(savedOrder);
        }
        console.log(`Created ${orders.length} sample orders`);

        // Display summary
        console.log("\n=== DATABASE SEEDING COMPLETED ===");
        console.log(`✅ Users created: ${users.length}`);
        console.log(`✅ Food items created: ${foods.length}`);
        console.log(`✅ Orders created: ${orders.length}`);
        
        console.log("\n=== ADMIN CREDENTIALS ===");
        console.log("Email: admin@fooddel.com");
        console.log("Password: admin123");
        
        console.log("\n=== SAMPLE USER CREDENTIALS ===");
        regularUsers.slice(0, 3).forEach(user => {
            console.log(`Email: ${user.email} | Password: password123`);
        });

        console.log("\n=== FOOD CATEGORIES ===");
        const categories = [...new Set(foods.map(food => food.category))];
        categories.forEach(category => {
            const count = foods.filter(food => food.category === category).length;
            console.log(`${category}: ${count} items`);
        });

        console.log("\n=== ORDER STATISTICS ===");
        const statusCounts = {};
        orders.forEach(order => {
            statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
        });
        Object.entries(statusCounts).forEach(([status, count]) => {
            console.log(`${status}: ${count} orders`);
        });

        const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
        console.log(`Total Revenue: $${totalRevenue.toFixed(2)}`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

// Run the seeder
seedDatabase();