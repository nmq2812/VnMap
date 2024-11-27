const Loading = () => {
  return (
    <div className="d-flex justify-content-center w-100">
      <div
        className="spinner-border text-success"
        role="status"
        style={{ width: "50px", height: "50px" }}
      ></div>
    </div>
  );
};

export default Loading;
