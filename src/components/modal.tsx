import { Dialog, Transition } from '@headlessui/react';
import React from 'react';


const Modal = ({ 
    size, 
    isOpen, 
    onClose, 
    title, 
    children ,
    onClick
  }: { 
    size: string, 
    isOpen: boolean, 
    onClose: () => void, 
    title: string, 
    children: React.ReactNode,
    onClick: () => void
  }) => {
  switch(size) {
    case "sm": 
      return (
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="fixed inset-0 z-[9999] overflow-y-auto" onClose={onClose}>
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[40vw] sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                  <div className="mt-2">
                    {children}
                  </div> 
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      )
    case "lg":
      return (
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="fixed inset-0 z-[9999] overflow-y-auto" onClose={onClose}>
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[60vw] sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                  <div className="mt-2">
                    {children}
                  </div> 
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      )
    default: 
      return (
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="fixed inset-0 z-[9999] overflow-y-auto" onClose={onClose}>
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[80vw] sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                  <div className="mt-2">
                    {children}
                  </div> 
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      )
  }
}

export default Modal;
