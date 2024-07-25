export const handleAddToLiked = async (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  const productId = e.currentTarget.id.replace(/\like\D*/g, "");
  console.log("add to liked clicked");
  //   console.log({ productId: productId });
  try {
    const res = await fetch(
      `/api/user/liked/addToLiked?productId=${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //   body: JSON.stringify({ productId: productId }),
      }
    );

    const data = await res.json();
    console.log({ data: data });
    // alert("Item added to liked");
  } catch (error) {
    console.log({ "Error adding to liked": error });
  }
};
