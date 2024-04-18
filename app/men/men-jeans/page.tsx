import CategoryPage from '../../_components/category-page';
import { Product } from '../../interface';
import { client } from '../../lib/santiy';
async function getData() {
  // get Men's jeans 10
  const query = `*[_type == "product" && category->name == "Men" && subcategory->name == "Jeans"][0...10] | order(_createdAt desc){
    _id,
    price,
    name,
    quantity,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Men() {
  const data: Product[] = await getData();
  return <CategoryPage catName="Men's Jeans" data={data} />;
}
