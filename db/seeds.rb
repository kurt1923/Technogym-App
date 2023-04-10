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

30.times do
    Employee.create(
        firstname: Faker::Name.first_name,
        lastname: Faker::Name.last_name,
        email: Faker::Internet.email,
        password: Faker::Internet.password,
        title: Faker::Job.title,
        phone: Faker::PhoneNumber.cell_phone,
        address: Faker::Address.full_address,
        img: Faker::Avatar.image,
    )
end

puts "🌱  seeds...employees"

30.times do
    Project.create(
        name: Faker::Company.name,
        description: Faker::Lorem.paragraph,
        completed: Faker::Boolean.boolean,
        admin_id: Admin.all.sample.id,
        employee_id: Employee.all.sample.id
    )
end


puts "🌱  seeds...projects"

puts "✅ Done seeding!"
