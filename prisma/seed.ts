import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed Products
    const productsData = Array.from({ length: 25 }, (_, index) => ({
      product_name: `Product ${index + 1}`,
      product_description: `Description for Product ${index + 1}`,
      product_price: Math.floor(Math.random() * 100) + 1, 
    }));

    const products = await prisma.products.createMany({
      data: productsData,
    });

    console.log('Products seeded:', products);

    // Seed Salespersons
    const salespersonsData = Array.from({ length: 35 }, (_, index) => ({
      sales_person_name: `Salesperson ${index + 1}`,
      sales_person_phone: `+123456789${index}`,
      sales_person_address: `Address for Salesperson ${index + 1}`,
    }));

    const salespersons = await prisma.salespersons.createMany({
      data: salespersonsData,
    });

    console.log('Salespersons seeded:', salespersons);

    // Seed Users (example from your provided script)
    const password = await hash('password123', 12);
    const user = await prisma.user.upsert({
      where: { email: 'admin@admin.com' },
      update: {},
      create: {
        email: 'admin@admin.com',
        name: 'Admin',
        password,
      },
    });

    console.log('User seeded:', user);

    // Seed Sales
    const batchSize = 10000; 
    const totalRecords = 7000000; 

    for (let i = 0; i < totalRecords; i += batchSize) {
      const salesData = Array.from({ length: batchSize }, (_, index) => ({
        sales_date: new Date(),
        sales_amount: Math.floor(Math.random() * 1000) + 1, 
        product_id: Math.floor(Math.random() * 25) + 1, 
        sales_person_id: Math.floor(Math.random() * 35) + 1, 
      }));

      await prisma.sales.createMany({
        data: salesData,
      });

      console.log(`Sales batch ${i / batchSize + 1} seeded`);
    }

    console.log('Sales seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
