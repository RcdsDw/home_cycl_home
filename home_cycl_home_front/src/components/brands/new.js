import { useState } from "react";
import { Button, Input, message, Modal } from "antd";
import { createBrand } from "../../actions/brands";

export default function CreateBrandModal({ fetchBrands }) {
  const [isCreateBrandOpen, setIsCreateBrandOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  const handleCreateBrand = async () => {
    try {
      await createBrand({
        name: newBrandName,
      });
      message.success("Marque créée");
      fetchBrands();
    } catch (e) {
      message.error("Erreur lors de la création");
    } finally {
      setIsCreateBrandOpen(false);
      setNewBrandName("");
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsCreateBrandOpen(true)}>
        Ajouter une marque
      </Button>

      <Modal
        title="Ajouter une marque"
        open={isCreateBrandOpen}
        okText="Créer"
        cancelText="Annuler"
        onOk={handleCreateBrand}
        onCancel={() => {
          setIsCreateBrandOpen(false);
          setNewBrandName("");
        }}
      >
        <Input
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
          placeholder="Nom de la marque"
          style={{ width: "100%", padding: 8 }}
        />
      </Modal>
    </>
  );
}
