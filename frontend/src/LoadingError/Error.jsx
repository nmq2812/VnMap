const Message = ({ variant, children }) => {
  return (
    <div
      className="flex items-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
      role="alert"
    >
      {children}
    </div>
  );
};

export default Message;
