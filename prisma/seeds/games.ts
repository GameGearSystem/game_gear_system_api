import { PrismaClient } from '@prisma/client';

export const startSeed = async (prisma: PrismaClient) => {
  await gameSeed(prisma);
  await deviceSeed(prisma);
  await requerimentSeed(prisma);
  
};

const deviceSeed = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    prisma.device.upsert({
      where: { name: 'PS4' },
      update: {},
      create: {
        name: 'PS4',
        description: 'PlayStation 4',
      }
    }),
    prisma.device.upsert({
      where: { name: 'PC' },
      update: {},
      create: {
        name: 'PC',
        description: 'PC Gaming',
      }
    }),
    prisma.device.upsert({
      where: { name: 'XBOX' },
      update: {},
      create: {
        name: 'XBOX',
        description: 'XBOX',
      }
    }),
    prisma.device.upsert({
      where: { name: 'SWITCH' },
      update: {},
      create: {
        name: 'SWITCH',
        description: 'Nintendo Switch',
      }
    })
  ]);
}

const gameSeed = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    prisma.game.upsert({
      where: { name: 'The Last of Us Part II' },
      update: {},
      create: {
        name: 'The Last of Us Part II',
        description: 'The Last of Us Part II is a 2020 action-adventure game developed by Naughty Dog and published by Sony Interactive Entertainment for the PlayStation 4. Set five years after The Last of Us (2013), the player controls two characters in a post-apocalyptic United States whose lives intertwine: Ellie, who sets out for revenge after suffering a tragedy, and Abby, a soldier who becomes involved in a conflict with a cult.',
      }
    }),
    prisma.game.upsert({
      where: { name: 'Cyberpunk 2077' },
      update: {},
      create: {
        name: 'Cyberpunk 2077',
        description: 'Cyberpunk 2077 is a 2020 action role-playing video game developed and published by CD Projekt. The story takes place in Night City, an open world set in the Cyberpunk universe. Players assume the first-person perspective of a customisable mercenary known as V, who can acquire skills in hacking and machinery with options for melee and ranged combat.',
      }
    }),
    prisma.game.upsert({
      where: { name: 'Hollow Knight' },
      update: {},
      create: {
        name: 'Hollow Knight',
        description: 'Hollow Knight is a 2017 action-adventure game developed and published by Team Cherry. The game follows a nameless knight, as they traverse an ancient, plague-infested kingdom inhabited by various insects, known as Hallownest. The Knight must travel through Hallownest, fighting bosses and unlocking new abilities to progress, as they uncover the kingdom\'s mysteries.',
      }
    }),
  ]);
};

const requerimentSeed = async (prisma: PrismaClient) => {
  await prisma.$transaction([
    prisma.requeriment.upsert({
      where: { id: 1 },
      update: {},
      create: {
        game_id: 1,
        device_id: 1
      }
    }),
    prisma.requeriment.upsert({
      where: { id: 2 },
      update: {},
      create: {
        game_id: 2,
        device_id: 2,
        // This is for cyberpunk 2077
        // What is the requeriment for this game?
        graphic: 'GeForce GTX 1060 6GB or Radeon RX 580',
        processor: 'Core i7-6700 or Ryzen 5 1600',
        ram: '12 GB RAM',
        storage: '70 GB available space'
      }
    }),
    prisma.requeriment.upsert({
      where: { id: 3 },
      update: {},
      create: {
        game_id: 3,
        device_id: 2,
        // This is for hollow knight
        graphic: 'NVIDIA GeForce GTX 560 Ti / AMD Radeon HD 6870',
        processor: 'Intel Core i5-4460 / AMD Athlon X4 760K',
        ram: '8 GB RAM',
        storage: '20 GB available space'
        }
      }),
  ]);
};


// const adminSeed = async (prisma: PrismaClient) => {
//   const adminRole = await prisma.role.findUnique({
//     where: { name: 'admin' },
//   });

//   if (adminRole) {
//     const adminPassword = await bcrypt.hash('admin12345', 10);

//     await prisma.user.upsert({
//       where: { username: 'admin' },
//       update: {
//         password: adminPassword,
//       },
//       create: {
//         username: 'admin',
//         password: adminPassword,
//         name: 'Admin',
//         roleId: adminRole?.id ?? 1,
//       },
//     });
//   }
// };

// const permissionsSeed = async (prisma: PrismaClient) => {
//   await prisma.$transaction([
//     prisma.permission.createMany({
//       data: [
//         { name: 'user:create' },
//         { name: 'user:read' },
//         { name: 'user:update' },
//         { name: 'user:delete' },
//       ],
//       skipDuplicates: true,
//     }),
//     prisma.permission.createMany({
//       data: [
//         { name: 'invoice:create' },
//         { name: 'invoice:read' },
//         { name: 'invoice:update' },
//         { name: 'invoice:delete' },
//         { name: 'invoice:approve' },
//         { name: 'invoice:assign' },
//         { name: 'invoice:capture' },
//       ],
//       skipDuplicates: true,
//     }),
//     prisma.permission.createMany({
//       data: [
//         { name: 'order:create' },
//         { name: 'order:read' },
//         { name: 'order:update' },
//         { name: 'order:delete' },
//         { name: 'order:approve' },
//         { name: 'order:assign' },
//         { name: 'order:capture' },
//       ],
//       skipDuplicates: true,
//     }),
//     prisma.permission.createMany({
//       data: [
//         { name: 'location:create' },
//         { name: 'location:read' },
//         { name: 'location:update' },
//         { name: 'location:delete' },
//       ],
//       skipDuplicates: true,
//     }),
//     prisma.permission.createMany({
//       data: [
//         { name: 'print:create' },
//         { name: 'print:read' },
//         { name: 'print:update' },
//       ],
//       skipDuplicates: true,
//     }),
//   ]);
// };

// const rolePermissionsSeed = async (prisma: PrismaClient) => {
//   // Clean table before seeding
//   await prisma.rolePermission.deleteMany({});

//   const operationsRole = await prisma.role.findUnique({
//     where: { name: 'operaciones' },
//   });

//   if (operationsRole) {
//     const operationsPermissions = await prisma.permission.findMany({
//       where: {
//         OR: [
//           { name: { contains: 'invoice' } },
//           { name: { contains: 'order' } },
//           { name: { contains: 'location' } },
//           { name: { contains: 'print' } },
//         ],
//       },
//     });

//     await prisma.rolePermission.createMany({
//       data: operationsPermissions.map((permission) => ({
//         roleId: operationsRole.id,
//         permissionId: permission.id,
//       })),
//       skipDuplicates: true,
//     });
//   }

//   const warehouseRole = await prisma.role.findUnique({
//     where: { name: 'almacen' },
//   });

//   if (warehouseRole) {
//     const warehousePermissions = await prisma.permission.findMany({
//       where: {
//         OR: [
//           { name: 'invoice:read' },
//           { name: 'invoice:capture' },
//           { name: 'order:read' },
//           { name: 'order:capture' },
//         ],
//       },
//     });

//     await prisma.rolePermission.createMany({
//       data: warehousePermissions.map((permission) => ({
//         roleId: warehouseRole.id,
//         permissionId: permission.id,
//       })),
//       skipDuplicates: true,
//     });
//   }
// };