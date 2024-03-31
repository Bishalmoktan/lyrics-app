const Header = () => {
  return (
    <div className="bg-[url('/contact.jpg')] bg-center bg-no-repeat bg-cover animate-move-up">
      <div className="bg-brand-light/80 bg-opacity-80 py-20 text-center">
        <h2 className="text-5xl font-bold">CONTACT US</h2>
        <p className="text-xl max-w-[70vw] mx-auto">
          {`Have questions, feedback, or just want to say hello? We'd love to hear from you! Feel free to reach us.`}
        </p>
      </div>
    </div>
  );
};
export default Header;
