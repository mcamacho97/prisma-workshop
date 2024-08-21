import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
//   await prisma.user.create({
//     data: {
//       name: "Mauricio Camacho",
//       email: "mcamacho@sistematica.io",
//       posts: {
//         create: {
//           title: "Example Post",
//           body: "Lorem Ipsum stuff",
//           slug: "mcamacho-post",
//         },
//       },
//     },
//   });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(allUsers, { depth: null });

  await prisma.post.update({
    where: {
      slug: "mcamacho-post",
    },
    data: {
      comments: {
        createMany: {
          data: [
            { comment: "Great post!" },
            { comment: "Great post! x2" },
            { comment: "Great post! x3" },
          ],
        },
      },
    },
  });

  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });

//   console.dir(posts, { depth: Infinity });

//   const findCommentById = await prisma.comment.findUnique({
//     where: {id: "66c62072d8eedba1eb828c26"},
//   })

//   console.dir(findCommentById, { depth: Infinity });

}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
