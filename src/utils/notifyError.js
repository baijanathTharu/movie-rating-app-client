import { toast } from 'react-toastify';

const config = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const notifyError = (message) => toast.error(message, config);

export const notifySuccess = (message) => toast.success(message, config);
