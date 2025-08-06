import { useNavigate } from "react-router-dom";
import { Button, Popover, Tag } from "antd";
import { parseID } from "./ParseID";
import TagRoles from "./TagRoles";

export default function BikeCard({ user }) {
  const nav = useNavigate();

  return (
    <Popover
      title={user.firstname + " " + user.lastname}
      content={
        <div>
          <p>
            <b>Email :</b> {user.email}
          </p>
          <p>
            <b>Rôle :</b> <TagRoles roles={user.roles} />
          </p>
          <p>
            <b>Numéro :</b> {user.number}
          </p>
          <Button
            size="small"
            type="link"
            onClick={() => nav(`/users/show/${parseID(user)}`)}
          >
            Voir l'utilisateur
          </Button>
        </div>
      }
    >
      <Tag color="geekblue" style={{ cursor: "pointer" }}>
        {user.firstname} {user.lastname}
      </Tag>
    </Popover>
  );
}
