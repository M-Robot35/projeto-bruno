/*
  Warnings:

  - A unique constraint covering the columns `[instanciaName]` on the table `instancia` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "instancia_instanciaName_key" ON "instancia"("instanciaName");
