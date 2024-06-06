import { useState } from "react";

const useModal = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  const handlerToggleModal = () => setOpenModal(!isOpenModal);

  return { isOpenModal, setOpenModal, handlerToggleModal };
};

export default useModal;
