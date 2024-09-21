// Create a new product
export const createProduct = async (productData) => {
    return await prisma.product.create({
      data: productData,
    });
  };
  
  // Get all products
  export const getProducts = async () => {
    return await prisma.product.findMany();
  };
  
  // Get a product by ID
  export const getProductById = async (id) => {
    return await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  };
  
  // Update a product
  export const updateProduct = async (id, updateData) => {
    return await prisma.product.update({
      where: {
        id: id,
      },
      data: updateData,
    });
  };
  
  // Create an order
export const createOrder = async (orderData) => {
    return await prisma.order.create({
      data: orderData,
    });
  };
  
  // Get all orders for a user
  export const getUserOrders = async (userId) => {
    return await prisma.order.findMany({
      where: {
        userId: userId,
      },
    });
  };
  