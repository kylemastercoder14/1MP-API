const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      categoryId,
      subCategoryId,
      image,
      images, // Array of additional images
      brand,
      materials, // Array of materials
      weight,
      height,
      sku,
      tags, // Array of tags
      warrantyPeriod,
      warrantyPolicy,
      status,
      sellerId,
      adminApprovalStatus,
      isVariant,
    } = req.body;

    if (!name || !slug || !categoryId || !sellerId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = await prisma.sellerProduct.create({
      data: {
        name,
        slug,
        description,
        price,
        categoryId,
        subCategoryId,
        image,
        images,
        brand,
        materials,
        weight,
        height,
        sku,
        tags,
        warrantyPeriod,
        warrantyPolicy,
        status,
        sellerId,
        adminApprovalStatus,
        isVariant,
      },
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: error.message });
  }
};

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

exports.getProductBySubCategorySlug = async (req, res) => {
  try {
    const { subCategorySlug } = req.params;

    const product = await prisma.sellerProduct.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        subCategoryId: subCategorySlug,
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

    const product = await prisma.sellerProduct.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        categoryId: categorySlug,
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
