/*
  Warnings:

  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ProductID` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `ProductName` on the `Products` table. All the data in the column will be lost.
  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ProductID` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `SalesAmount` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `SalesDate` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `SalesID` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `SalesPersonID` on the `Sales` table. All the data in the column will be lost.
  - The primary key for the `Salespersons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SalesPersonID` on the `Salespersons` table. All the data in the column will be lost.
  - You are about to drop the column `SalesPersonName` on the `Salespersons` table. All the data in the column will be lost.
  - Added the required column `product_description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_price` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_amount` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_date` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_id` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_person_id` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_person_address` to the `Salespersons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_person_id` to the `Salespersons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_person_name` to the `Salespersons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_person_phone` to the `Salespersons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Sales` DROP FOREIGN KEY `Sales_ProductID_fkey`;

-- DropForeignKey
ALTER TABLE `Sales` DROP FOREIGN KEY `Sales_SalesPersonID_fkey`;

-- AlterTable
ALTER TABLE `Products` DROP PRIMARY KEY,
    DROP COLUMN `ProductID`,
    DROP COLUMN `ProductName`,
    ADD COLUMN `product_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `product_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_price` DOUBLE NOT NULL,
    ADD PRIMARY KEY (`product_id`);

-- AlterTable
ALTER TABLE `Sales` DROP PRIMARY KEY,
    DROP COLUMN `ProductID`,
    DROP COLUMN `SalesAmount`,
    DROP COLUMN `SalesDate`,
    DROP COLUMN `SalesID`,
    DROP COLUMN `SalesPersonID`,
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `sales_amount` DOUBLE NOT NULL,
    ADD COLUMN `sales_date` DATETIME(3) NOT NULL,
    ADD COLUMN `sales_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `sales_person_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`sales_id`);

-- AlterTable
ALTER TABLE `Salespersons` DROP PRIMARY KEY,
    DROP COLUMN `SalesPersonID`,
    DROP COLUMN `SalesPersonName`,
    ADD COLUMN `sales_person_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `sales_person_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `sales_person_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `sales_person_phone` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`sales_person_id`);

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_sales_person_id_fkey` FOREIGN KEY (`sales_person_id`) REFERENCES `Salespersons`(`sales_person_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
