/*
  Warnings:

  - Added the required column `eventosId` to the `Inscricoes` table without a default value. This is not possible if the table is not empty.
  - Made the column `usuariosId` on table `inscricoes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `inscricoes` DROP FOREIGN KEY `Inscricoes_usuariosId_fkey`;

-- DropIndex
DROP INDEX `Inscricoes_usuariosId_fkey` ON `inscricoes`;

-- AlterTable
ALTER TABLE `inscricoes` ADD COLUMN `eventosId` INTEGER NOT NULL,
    MODIFY `usuariosId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Inscricoes` ADD CONSTRAINT `Inscricoes_usuariosId_fkey` FOREIGN KEY (`usuariosId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inscricoes` ADD CONSTRAINT `Inscricoes_eventosId_fkey` FOREIGN KEY (`eventosId`) REFERENCES `Eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
