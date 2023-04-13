require 'faker'

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
        password_digest: BCrypt::Password.create("2222"),
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
        password_digest: BCrypt::Password.create("3333"),
        title: "Admin",
        phone: "123456789",
        address: "1234 Main St",
        img: "https://i.imgur.com/1J8ZQYt.jpg",
        admin: true
    }
])

puts "🌱  seeds...admins"

25.times do
    Employee.create(
        firstname: Faker::Name.first_name,
        lastname: Faker::Name.last_name,
        email: Faker::Internet.email,
        password: Faker::Internet.password,
        title: (['On Site Tech', 'Data Analyst', 'Marketing', 'Other']).sample,
        phone: Faker::PhoneNumber.cell_phone,
        address: Faker::Address.full_address,
        img: Faker::Avatar.image,
    )
end

puts "🌱  seeds...employees"

45.times do
    Project.create(
        name: Faker::Company.catch_phrase,
        description: Faker::Lorem.paragraph,
        completed: Faker::Boolean.boolean,
        admin_id: Admin.all.sample.id,
        employee_id: Employee.all.sample.id,
        category: (['Fire', 'Police', 'Military', 'Testing', 'Marketing', 'Other']).sample,
        created_at: Faker::Date.between(from: 2.month.ago, to: Date.today),
    )
end


puts "🌱  seeds...projects"

puts "✅ Done seeding!"
