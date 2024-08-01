const ErrorMsg = ({ message }) => {
  return (
    <div className="w-[90%] flex items-center justify-center mx-auto mt-8">
      <div className="badge badge-error gap-2 h-[auto] py-4 px-6 mx-auto text-center font-medium text-lg">
        {message}
      </div>
    </div>
  );
};

export default ErrorMsg;
