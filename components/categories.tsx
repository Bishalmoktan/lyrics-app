import { categories } from '@/data/categorires';
import Image from 'next/image';

import Link from 'next/link';

const Categories = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl">Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <Link
            href={`/search?type=${category.label}`}
            key={index}
            className={`p-4 ${category.bg} bg-opacity-20 rounded-md flex gap-4 justify-center items-center`}
          >
            <Image
              src={category.src}
              alt={category.label}
              className="size-10 object-contain"
            />

            <p className="text-lg"> {category.label} </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Categories;
