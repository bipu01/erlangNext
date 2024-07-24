export const HandleAddToCart = async (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  const productId = e.currentTarget.id.replace(/\baddToCart\D*/g, "");
  try {
    await fetch("/api/user/cart/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    });
    alert("Item added to cart");
  } catch (error) {
    console.log({ "Error adding to cart": error });
  }
};
