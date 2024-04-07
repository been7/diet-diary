const Footer = () => {
  return (
    <footer className="flex justify-between items-end mt-10 pb-3 px-2">
      <div className="flex items-center gap-4">
        <a
          href="https://velog.io/@qlsl707/posts"
          target="_blank"
          rel="noreferrer noopener"
          className="flex flex-col justify-center items-center"
        >
          <span className="text-sm transition hover:text-gray-400">Github</span>
        </a>{" "}
        <span className="w-px h-3 bg-gray-300"></span>
        <a
          href="https://github.com/been7/diet-diary"
          target="_blank"
          rel="noreferrer noopener"
          className="flex flex-col justify-center items-center"
        >
          <span className="text-sm transition hover:text-gray-400">Blog</span>
        </a>{" "}
      </div>
      <p className="text-gray-400 text-sm">&copy; All Right Reserved</p>
    </footer>
  );
};

export default Footer;
