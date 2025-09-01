-- AlterTable
ALTER TABLE `Order` MODIFY `totalPrice` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` MODIFY `totalPriceItem` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Topping` MODIFY `priceTopping` DECIMAL(10, 2) NOT NULL;
