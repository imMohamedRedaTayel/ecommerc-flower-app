
export default async function fetchProducts(searchParams = {}) {
  const queryParams = new URLSearchParams(searchParams);

  try {
    const response = await fetch(
      `${process.env.API}/products?${queryParams.toString()}`,
    );

    const payload: APIResponse<PaginatedResponse<{ products: Product[] }>> =
      await response.json();

    if ("error" in payload) {
      throw new Error("failed to fetch data");
    }
    return payload;
  } catch (err) {
    console.log(err);
    return null;
  }
}

type ProductResponse = {
  message: string;
  product: Product;
};

export async function fetchProductDetails(
  id: string
): Promise<ProductResponse | null> {
  try {
    const response = await fetch(`${process.env.API}/products/${id}`, {
      next: { tags: [`product/${id}`] },
    });
    const payload = await response.json();

    if ("error" in payload) {
      throw new Error("failed to fetch data");
    }
    return payload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
