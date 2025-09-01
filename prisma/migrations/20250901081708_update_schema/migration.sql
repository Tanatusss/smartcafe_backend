/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropIndex
DROP INDEX `OrderItem_orderId_fkey` ON `OrderItem`;

-- AlterTable
ALTER TABLE `MenuItem` MODIFY `price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `status` ENUM('PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    ADD PRIMARY KEY (`order_id`);

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `quantity`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `qty` INTEGER NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Topping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `priceTopping` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItemTopping` (
    `orderItemId` INTEGER NOT NULL,
    `toppingId` INTEGER NOT NULL,

    PRIMARY KEY (`orderItemId`, `toppingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`order_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItemTopping` ADD CONSTRAINT `OrderItemTopping_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `OrderItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItemTopping` ADD CONSTRAINT `OrderItemTopping_toppingId_fkey` FOREIGN KEY (`toppingId`) REFERENCES `Topping`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
