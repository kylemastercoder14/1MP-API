const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllSubCategoriesByCategorySlug = async (req, res) => {
  try {
    const { categorySlug } = req.params;

    const subCategories = await prisma.subCategory.findMany({
      where: {
        categorySlug,
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.status(200).json(subCategories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
