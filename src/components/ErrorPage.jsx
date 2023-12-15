const ErrorPage = ({ msg, code }) => {
  return (
    <section className="main-section ">
      <h1>{msg}</h1>
      <p>{code}</p>
    </section>
  );
};

export default ErrorPage;
