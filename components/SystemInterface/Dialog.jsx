import { useEffect, useRef, useState } from "react";

export default function Dialog(props) {
  const dialogRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(false);
  const { onClose = () => {} } = props;

  // if(!props.children?.onClick) props.children?.onClick = onClose

  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      className={`backdrop-blur-3xl  bg-opacity-10 border border-gray-800 bg-gray-400 rounded-xl shadow-md bg-gray-900 w-auto h-auto z-50 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
