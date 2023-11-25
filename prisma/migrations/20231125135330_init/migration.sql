-- CreateTable
CREATE TABLE `Sales` (
    `SalesID` INTEGER NOT NULL AUTO_INCREMENT,
    `SalesDate` DATETIME(3) NOT NULL,
    `SalesAmount` DOUBLE NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `SalesPersonID` INTEGER NOT NULL,

    PRIMARY KEY (`SalesID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `ProductID` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ProductID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salespersons` (
    `SalesPersonID` INTEGER NOT NULL AUTO_INCREMENT,
    `SalesPersonName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`SalesPersonID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_ProductID_fkey` FOREIGN KEY (`ProductID`) REFERENCES `Products`(`ProductID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_SalesPersonID_fkey` FOREIGN KEY (`SalesPersonID`) REFERENCES `Salespersons`(`SalesPersonID`) ON DELETE RESTRICT ON UPDATE CASCADE;
