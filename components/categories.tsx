import { getAllGenre } from '@/lib/admin/actions';
import Image from 'next/image';

import Link from 'next/link';

const Categories = async () => {
  const categories = await getAllGenre();
  return (
    <div className="space-y-4">
      <h3 className="text-2xl">Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            href={`/search?type=${category.name}`}
            key={category.id}
            className={`p-4 ${category.backgroundColor} hover:bg-opacity-50 bg-opacity-20 transition-all rounded-md flex gap-4 justify-center items-center`}
          >
            <Image
              src={category.image}
              alt={category.name}
              width={100}
              height={100}
              className="size-10 object-contain"
            />

            <p className="text-lg"> {category.name} </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Categories;
