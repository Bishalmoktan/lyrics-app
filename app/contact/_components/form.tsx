import Image from 'next/image';
import formImage from '@/public/contact-form.svg';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Form = () => {
  return (
    <div className="container">
      <h3 className="text-2xl font-bold">Get In Tocuh</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center gap-4">
          <Input
            placeholder="Name"
            className="focus-visible:ring-transparent border-0 border-b-2 border-border rounded-none border-solid"
          />
          <Input
            placeholder="Email"
            className="focus-visible:ring-transparent border-0 border-b-2 border-border rounded-none border-solid"
          />
          <Textarea
            placeholder="Your message"
            className="focus-visible:ring-transparent border-0 border-b-2 border-border rounded-none border-solid"
          />
          <Button>Send</Button>
        </div>
        <div>
          <Image
            src={formImage}
            alt="Form image"
            className="object-contain hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};
export default Form;
