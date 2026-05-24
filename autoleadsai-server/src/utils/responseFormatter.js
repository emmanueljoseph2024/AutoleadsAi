// ─── Success Response ───────────────────────────────
export const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

// ─── Error Response ─────────────────────────────────
export const errorResponse = (message = 'Error', statusCode = 500, details = null) => {
  return {
    success: false,
    error: {
      message,
      statusCode,
      details,
      timestamp: new Date().toISOString(),
    },
  };
};

// ─── Paginated Response ─────────────────────────────
export const paginatedResponse = (data, pagination, message = 'Success') => {
  return {
    success: true,
    message,
    data,
    pagination,
    timestamp: new Date().toISOString(),
  };
};

// ─── Send Success ───────────────────────────────────
export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json(successResponse(data, message, statusCode));
};

// ─── Send Error ─────────────────────────────────────
export const sendError = (res, message = 'Error', statusCode = 500, details = null) => {
  return res.status(statusCode).json(errorResponse(message, statusCode, details));
};

// ─── Send Paginated ─────────────────────────────────
export const sendPaginated = (res, data, pagination, message = 'Success') => {
  return res.status(200).json(paginatedResponse(data, pagination, message));
};