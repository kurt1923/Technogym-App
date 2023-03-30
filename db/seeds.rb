puts "🌱  spices..."

Employee.destroy_all
Project.destroy_all
Admin.destroy_all

Admin.create([
    {
        firstname: "Kurt",
        lastname: "Vermillion",
        email: "kurtv0727@gmail.com",
        password_digest: BCrypt::Password.create("1111"),
        title: "Project Manager",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://imgur.com/EHpksfC",
        admin: true
    },
    {
        firstname: "Kyle",
        lastname: "Meadows",
        email: "2222",
        password_digest: "2222",
        title: "CEO",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg",
        admin: true
    },
    {
        firstname: "James",
        lastname: "Purvis",
        email: "3333",
        password_digest: "3333",
        title: "Admin",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg",
        admin: true
    }
])

puts "🌱  seeds...admins"



Employee.create([
    {
        firstname: "John",
        lastname: "Doe",
        email: "1111",
        password: "1111",
        title: "employee",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg",
    },
    {
        firstname: "Jane",
        lastname: "Doe",
        email: "2222",
        password: "2222",
        title: "employee",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg",
    },
    {
        firstname: "John",
        lastname: "Doesss",
        email: "3333",
        password: "3333",
        title: "employee",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg"
    },
    {
        firstname: "John",
        lastname: "Doe",
        email: "1111",
        password: "1111",
        title: "employee",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg"
    },
    {
        firstname: "Jane",
        lastname: "Doe",
        email: "2222",
        password: "2222",
        title: "employee",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg"
    },
    {
        firstname: "John",
        lastname: "Doesss",
        email: "3333",
        password: "3333",
        title: "employee",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg"
    }
])

Project.create([
    {
        name: "Kitchen",
        description: "Kitchen",
        completed: false,
        admin_id: 1,
        employee_id: 1
    },
    {
        name: "Bathroom",
        description: "Bathroom",
        completed: false,
        admin_id: 2,
        employee_id: 1
    },
    {
        name: "Bedroom",
        description: "Bedroom",
        completed: false,
        admin_id: 3,
        employee_id: 3
    },
    {
        name: "Living Room",
        description: "Living Room",
        completed: false,
        admin_id: 4,
        employee_id: 4
    },
    {
        name: "Basement",
        description: "Basement",
        completed: false,
        admin_id: 5,
        employee_id: 5
    },
    {
        name: "Garage",
        description: "Garage",
        completed: false,
        admin_id: 6,
        employee_id: 6
    }
])

puts "🌱  seeds...projects"

puts "✅ Done seeding!"
