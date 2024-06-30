import { Metadata } from 'next';
import Form from './_components/form';
import Header from './_components/header';

export const metadata: Metadata = {
  title: "Contact"
}

const ContactPage = () => {
  return (
    <div className="space-y-16">
      <Header />
      <Form />
    </div>
  );
};
export default ContactPage;
