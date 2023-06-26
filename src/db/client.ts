import { PrismaClient } from '@prisma/client';

if (!global.prisma) global.prisma = new PrismaClient();

export const client = global.prisma;
