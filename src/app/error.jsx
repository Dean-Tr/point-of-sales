"use client";
import { useEffect } from "react";

const Error = ({ statusCode, message, stack }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error({ statusCode, message, stack });
  }, [statusCode, message, stack]);

  return (
    <div className="h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] flex justify-center items-center">
      <h1>{statusCode ? `ERROR ${statusCode} TERJADI DI SERVER` : "ERROR TERJADI DI CLIENT"}</h1>
      {message && <p>{message}</p>}
      {stack && <pre>{stack}</pre>}
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = err ? err.message : "Unknown error";
  const stack = err ? err.stack : null;

  return { statusCode, message, stack };
};

export default Error;
