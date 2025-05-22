import React, { useEffect, useState, useRef } from "react";

const Modal = ({
  isOpen,
  setIsOpen,
  closeOnClickOutside,
  closeOnEsc,
  showIcon,
  showBackdrop,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, setIsOpen]);

  const handleBackdropClick = (e) => {
    if (
      closeOnClickOutside &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        showBackdrop ? "bg-gray-500 bg-opacity-50" : ""
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-[600px] rounded shadow-lg p-6 relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modal Heading</h2>
          {showIcon && (
            <button
              className="text-gray-500 hover:text-black text-2xl font-bold absolute top-2 right-2 mr-4"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          )}
        </div>
        <p className="text-gray-700 mb-6">
          This is modal content. You can put any content here. This has a groovy
          backdrop! You can also close this modal by clicking outside of it or
          pressing the escape key.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

const ModalPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeOnClickOutside, setCloseOnClickOutside] = useState(true);
  const [closeOnEsc, setCloseOnEsc] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <label className="flex items-center space-x-2">
        <span>Close dialog on outside click</span>
        <input
          type="checkbox"
          checked={closeOnClickOutside}
          onChange={() => setCloseOnClickOutside(!closeOnClickOutside)}
        />
      </label>

      <label className="flex items-center space-x-2">
        <span>Close dialog on escape</span>
        <input
          type="checkbox"
          checked={closeOnEsc}
          onChange={() => setCloseOnEsc(!closeOnEsc)}
        />
      </label>

      <label className="flex items-center space-x-2">
        <span>Show close icon</span>
        <input
          type="checkbox"
          checked={showIcon}
          onChange={() => setShowIcon(!showIcon)}
        />
      </label>

      <label className="flex items-center space-x-2">
        <span>Show backdrop</span>
        <input
          type="checkbox"
          checked={showBackdrop}
          onChange={() => setShowBackdrop(!showBackdrop)}
        />
      </label>

      <button
        className="mt-4 px-4 py-2 border rounded hover:bg-gray-200"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeOnClickOutside={closeOnClickOutside}
        closeOnEsc={closeOnEsc}
        showIcon={showIcon}
        showBackdrop={showBackdrop}
      />
    </div>
  );
};

export default ModalPopup;