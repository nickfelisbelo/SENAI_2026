/*
  Warnings:

  - You are about to drop the column `marcaemodelo` on the `carros` table. All the data in the column will be lost.
  - You are about to drop the column `matricula` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `turmasId` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `marca` to the `Carros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `Carros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnh` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carros` DROP COLUMN `marcaemodelo`,
    ADD COLUMN `marca` VARCHAR(191) NOT NULL,
    ADD COLUMN `modelo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `matricula`,
    DROP COLUMN `turmasId`,
    ADD COLUMN `cnh` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL;
