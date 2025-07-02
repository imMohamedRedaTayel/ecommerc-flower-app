export default async function fetchCategories() {
  try {
    const response = await fetch(process.env.API + "/categories", {
      cache: "no-store",
      next: {
        tags: ["categories"],}
    });
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
