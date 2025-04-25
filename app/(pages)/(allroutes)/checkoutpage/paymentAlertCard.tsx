import { useState } from "react";

interface AlertProps {
  message: string;
  submit: () => void;
  openWarning: boolean;
  setOpenWarning: (value: boolean) => void;
}

const AlertCard = ({ message, submit, openWarning, setOpenWarning }: AlertProps) => {
  const handleClose = () => {
    setOpenWarning(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center  bg-gray-50 p-6">
      {message && openWarning && (
        <div className="fixed top-1/3 z-50 w-full max-w-md bg-green-100 border border-green-300 text-green-800 rounded-2xl shadow-xl p-6 transition-transform animate-fade-in">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">Notice</h3>
            <button
              onClick={handleClose}
              className="text-green-800 hover:text-green-600 font-bold text-xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-center text-lg">{message}</p>
        </div>
      )}

      {/* Pay Button */}
      <button
        onClick={submit}
        className="z-10 mt-10 bg-green-600 rounded-2xl py-3 px-8 text-white text-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-green-400/50"
      >
        Pay
      </button>
    </div>
  );
};

export default AlertCard;
