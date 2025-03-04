const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.sellerProduct.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sellerProductVariants: {
          include: {
            sellerProductVariantsOptions: true,
          },
        },
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.sellerProduct.findUnique({
      where: {
        id,
      },
      include: {
        sellerProductVariants: {
          include: {
            sellerProductVariantsOptions: true,
          },
        },
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await prisma.sellerProduct.findUnique({
      where: {
        slug,
      },
      include: {
        sellerProductVariants: {
          include: {
            sellerProductVariantsOptions: true,
          },
        },
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductByCategorySlug = async (req, res) => {
  try {
    const { categorySlug } = req.params;

    const product = await prisma.sellerProduct.findUnique({
      where: {
        category: categorySlug,
      },
      include: {
        sellerProductVariants: {
          include: {
            sellerProductVariantsOptions: true,
          },
        },
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
