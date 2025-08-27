import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import TableInterventions from "../../components/interventions/table";
import { getCurrentUser } from "../../utils/GetCurrentInfo";

export default function Interventions() {
  const nav = useNavigate();
  const currentUser = getCurrentUser();

  return (
    <>
      {!currentUser.roles?.includes("ROLE_TECH") ? (
        <Button
          type="primary"
          onClick={() => nav("/interventions/new")}
          style={{ marginBottom: 20 }}
        >
          Ajouter une intervention
        </Button>
      ) : (
        <h1>Mes interventions</h1>
      )
      }
      <TableInterventions currentUser={currentUser} />
    </>
  );
}
