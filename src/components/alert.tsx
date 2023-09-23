import { useEffect } from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';

const SweetAlert = ({ title, type }: {title: string, type: string}) => {
  useEffect(() => {
    if (title && type) {
        let icon: SweetAlertIcon | undefined;

        // Mapping dari nilai 'type' yang Anda terima ke ikon SweetAlert2 yang sesuai
        if (type === 'success') {
          icon = 'success';
        } else if (type === 'error') {
          icon = 'error';
        } else if (type === 'warning') {
          icon = 'warning';
        } else if (type === 'info') {
          icon = 'info';
        }
  
      Swal.fire({
        title,
        icon,
      });
    }
  }, [title, type]);

  return null;
};

export default SweetAlert;
