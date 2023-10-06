/**
 * este archivo actúa como un punto de entrada para la configuración de Prisma. 
 * Permite que otros módulos accedan a la instancia de PrismaClient de manera sencilla 
 * y también exporta todas las demás funcionalidades de @prisma/client para su uso 
 * en otros lugares de la aplicación. Esto es útil para mantener un código limpio 
 * y facilitar la gestión de la configuración de la base de datos.
 */
import { PrismaClient } from '@prisma/client'
export * from '@prisma/client'
const prisma = new PrismaClient()
export default prisma