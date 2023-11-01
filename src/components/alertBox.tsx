import { useEffect } from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';

const SweetAlert = ({ 
  title, 
  type, 
  showCancel = true, 
  showConfirm = true, 
  confirmBtnText = "Ok", 
  cancelBtnText = "Cancel" 
}: {
  title: string, 
  type: string, 
  showCancel?: boolean, 
  showConfirm?: boolean, 
  confirmBtnText?: string, 
  cancelBtnText?: string
}) => {
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
        showCancelButton: showCancel,
        showConfirmButton: showConfirm,
        confirmButtonText: confirmBtnText,
        cancelButtonText: cancelBtnText,
      });
    }
  }, [title, type]);

  return null;
};

export default SweetAlert;
