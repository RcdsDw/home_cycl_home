import { Modal } from "antd";
import SelectProducts from "../../utils/SelectProducts";
import { useEffect, useState } from "react";

export default function ModalProducts({
  open,
  onOk,
  onCancel,
  currentProducts,
  interventionID,
}) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (currentProducts) {
      setSelectedProducts(currentProducts);
    }
  }, []);

  return (
    <Modal
      title="Modifier les produits associés"
      closable
      okText="Valider"
      cancelText="Annuler"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <SelectProducts
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        interventionID={interventionID}
      />
    </Modal>
  );
}
