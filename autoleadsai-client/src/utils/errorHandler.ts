import axios from 'axios';

interface ApiError {
  message: string;
  status: number;
  field?: string;
}

export const parseApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      message: error.response.data?.error || error.response.data?.message || 'Something went wrong',
      status: error.response.status,
      field: error.response.data?.field,
    };
  }

  if (error instanceof Error) {
    return { message: error.message, status: 500 };
  }

  return { message: 'An unexpected error occurred', status: 500 };
};

export const getErrorMessage = (error: unknown): string => {
  return parseApiError(error).message;
};