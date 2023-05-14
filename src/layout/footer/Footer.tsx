const Footer = () => {
  const currentYear = new Date(Date.now()).getFullYear();

  return <footer>{currentYear}</footer>;
};

export default Footer;
