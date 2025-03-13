const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createSubCategories = async (req, res) => {
  try {
    const subCategories = req.body; // Expecting an array of category objects

    if (!Array.isArray(subCategories) || subCategories.length === 0) {
      return res
        .status(400)
        .json({ error: "Sub categories array is required" });
    }

    await prisma.subCategory.createMany({
      data: subCategories.map(
        ({ id, name, slug, image, categorySlug, createdAt, updatedAt }) => ({
          id,
          name,
          slug,
          image,
          categorySlug,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt),
        })
      ),
      skipDuplicates: true,
    });

    return res
      .status(201)
      .json({ message: "Sub categories created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

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
