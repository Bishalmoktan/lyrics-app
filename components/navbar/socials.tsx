import instagram from '@/public/instagram.png';
import facebook from '@/public/facebook.png';
import youtube from '@/public/youtube.png';
import Image from 'next/image';

const Socials = () => {
  const socialIcons = [
    {
      label: 'Instagram',
      icon: instagram,
    },
    {
      label: 'Facebook',
      icon: facebook,
    },
    {
      label: 'Youtube',
      icon: youtube,
    },
  ];
  return (
    <div className="flex gap-2 w-full items-center">
      {socialIcons.map((icon, index) => (
        <div key={index}>
          <Image
            src={icon.icon}
            alt={icon.label}
            className="size-8 object-contain"
          />
        </div>
      ))}
    </div>
  );
};
export default Socials;
