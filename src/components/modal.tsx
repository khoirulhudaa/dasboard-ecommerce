import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
              <div className="mt-2">
                {children}
              </div> 
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
