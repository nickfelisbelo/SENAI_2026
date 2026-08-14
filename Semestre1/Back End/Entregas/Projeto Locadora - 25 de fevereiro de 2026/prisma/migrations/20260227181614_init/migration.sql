/*
  Warnings:

  - You are about to drop the `alunos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `turmas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `alunos` DROP FOREIGN KEY `Alunos_turmasId_fkey`;

-- DropTable
DROP TABLE `alunos`;

-- DropTable
DROP TABLE `turmas`;

-- CreateTable
CREATE TABLE `Carros` (
    `placa` VARCHAR(191) NOT NULL,
    `marcaemodelo` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,

    PRIMARY KEY (`placa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `matricula` INTEGER NOT NULL,
    `turmasId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
