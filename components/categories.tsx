import Image from 'next/image';
import headphones from '@/public/headphones.png';
import electricGuitar from '@/public/electric-guitar.png';
import mic from '@/public/mic.png';

const Categories = () => {
  const categories = [
    {
      label: 'LoFi',
      src: headphones,
      bg: 'bg-[#57C4FF]',
    },
    {
      label: 'Pop',
      src: mic,
      bg: 'bg-rose-500',
    },
    {
      label: 'Rock',
      src: electricGuitar,
      bg: 'bg-pink-500',
    },
  ];
  return (
    <div className="space-y-4">
      <h3 className="text-2xl">Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`p-4 ${category.bg} bg-opacity-20 rounded-md flex gap-4 justify-center items-center`}
          >
            <Image
              src={category.src}
              alt={category.label}
              className="size-10 object-contain"
            />

            <p className="text-lg"> {category.label} </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
