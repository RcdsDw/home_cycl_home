import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableInterventions from '../../components/interventions/table';

export default function Interventions() {
  const nav = useNavigate();

  return (
    <>
      <Button type="primary" onClick={() => nav('/interventions/new')} style={{ marginBottom: 20 }}>
        Ajouter une intervention
      </Button>
      <TableInterventions />
    </>
  );
}
