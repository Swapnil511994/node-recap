export const responseFormatter = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

export const createResponseJson = (status, message, data) => {
  return {
    status,
    message,
    data,
  };
};
