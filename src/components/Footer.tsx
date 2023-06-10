import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="w-full text-xl text-mina-50 text-center p-2 hidden sm:block">
        <Link className="text-mina-50 hover:text-mina-300" href="/">
          Home
        </Link>
        <span>{" • "}</span>
        <Link className="text-mina-50 hover:text-mina-200" href="/results">
          Results
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
