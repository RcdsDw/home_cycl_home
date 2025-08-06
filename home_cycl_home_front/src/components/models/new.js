import { useState } from "react";
import { Button, Input, message, Modal } from "antd";
import { createModel } from "../../actions/models";

export default function CreateModelModal({
  selectedBrand,
  setSelectedBrand,
  fetchBrands,
}) {
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [newModelName, setNewModelName] = useState("");

  const handleCreateModel = async () => {
    try {
      await createModel({
        name: newModelName,
        brand: selectedBrand["@id"],
      });
      message.success("Modèle créé");
      fetchBrands();
    } catch (e) {
      message.error("Erreur lors de la création");
    } finally {
      setIsCreateModelOpen(false);
      setNewModelName("");
      setSelectedBrand(null);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsCreateModelOpen(true)}
        style={{ marginLeft: 8 }}
      >
        Ajouter un modèle
      </Button>

      <Modal
        title="Ajouter un modèle"
        open={isCreateModelOpen}
        okText="Créer"
        cancelText="Annuler"
        onOk={handleCreateModel}
        onCancel={() => {
          setIsCreateModelOpen(false);
          setNewModelName("");
          setSelectedBrand(null);
        }}
      >
        <Input
          value={newModelName}
          onChange={(e) => setNewModelName(e.target.value)}
          placeholder="Nom du modèle"
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
      </Modal>
    </>
  );
}
