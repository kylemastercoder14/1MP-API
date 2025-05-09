const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCategories = async (req, res) => {
  try {
    const categories = req.body; // Expecting an array of category objects

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ error: "Categories array is required" });
    }

    await prisma.category.createMany({
      data: categories.map(
        ({ id, name, slug, image, createdAt, updatedAt }) => ({
          id,
          name,
          slug,
          image,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt),
        })
      ),
      skipDuplicates: true,
    });

    return res.status(201).json({ message: "Categories created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sellerSubCategory: true,
      },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        sellerSubCategory: true,
      },
    });

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        slug,
      },
      include: {
        sellerSubCategory: true,
      },
    });

    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
