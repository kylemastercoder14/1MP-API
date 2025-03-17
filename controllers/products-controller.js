const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      categoryId, // This is the category slug
      subCategoryId, // This is the subcategory slug
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
      orderBy: { createdAt: "desc" },
      include: {
        sellerProductVariants: {
          include: {
            sellerProductVariantsOptions: true,
          },
        },
        seller: true
      },
      where: {
        adminApprovalStatus: "Approved",
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await prisma.sellerProduct.findUnique({
      where: { slug, adminApprovalStatus: "Approved" },
      include: {
        sellerProductVariants: {
          include: {
            sellerProductVariantsOptions: true,
          },
        },
        seller: true
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Get products by category slug.
 * If subCategorySlug is provided, filter by both category and subcategory.
 */
exports.getProductsByCategoryAndSubCategory = async (req, res) => {
  try {
    const { categorySlug, subCategorySlug } = req.params;

    const whereClause = {
      categoryId: categorySlug, // Ensure category filter is applied
      adminApprovalStatus: "Approved", // Ensure only approved products are fetched
    };

    // Only add subCategoryId if subCategorySlug is provided
    if (subCategorySlug) {
      Object.assign(whereClause, { subCategoryId: subCategorySlug });
    }

    const products = await prisma.sellerProduct.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        sellerProductVariants: {
          include: { sellerProductVariantsOptions: true },
        },
        seller: true
      },
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getRandomProducts = async (req, res) => {
  try {
    const products = await prisma.sellerProduct.findMany({
      where: {
        adminApprovalStatus: "Approved",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        sellerProductVariants: {
          include: { sellerProductVariantsOptions: true },
        },
        seller: true
      },
    });

    // Shuffle the fetched products and select 20 randomly
    const shuffledProducts = products
      .sort(() => 0.5 - Math.random())
      .slice(0, 20);

    return res.status(200).json(shuffledProducts);
  } catch (error) {
    console.error("Error fetching random products:", error);
    return res.status(500).json({ error: error.message });
  }
};
