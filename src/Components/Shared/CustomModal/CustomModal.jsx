import React from 'react';

const CustomModal = ({ isOpen, onClose, onConfirm, title, text }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  px-2 ">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:w-96 w-80 text-white ">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p className="mb-4">{text}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Yes, delete it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
