import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import frLocale from "@fullcalendar/core/locales/fr";
import { useEffect, useState } from "react";
import { getInterventionsWithParams } from "../../actions/interventions";
import { message, Spin } from "antd";
import SelectTech from "../../utils/SelectTech";
import { getCurrentUser } from "../../utils/GetCurrentInfo";
import { parseID } from "../../utils/ParseID";

export default function Planning() {
  const [loading, setLoading] = useState(false);
  const [selectedTechUser, setSelectedTechUser] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedTechUser]);

  const fetchData = async () => {
    setLoading(true);
    try {
      setLoading(true);

      const currentUser = getCurrentUser();
      const queryParams = `?technician.id=${selectedTechUser ? parseID(selectedTechUser) : currentUser.id}`;
      const res = await getInterventionsWithParams(queryParams);

      const eventsData = res?.member?.map((intervention) => {
        const owner = intervention.clientBike?.owner;
        const bike = intervention.clientBike;
        const tech = intervention.technician;
        const type = intervention.typeIntervention;

        return {
          id: parseID(intervention),
          title: `${owner?.firstname} ${owner?.lastname} - ${type?.name}`,
          start: intervention.start_date,
          end: intervention.end_date,
          color: "#1677ff",
          extendedProps: {
            clientName: `${owner?.firstname} ${owner?.lastname}`,
            bike: `${bike?.brand?.name} ${bike?.model?.name} (${bike?.type} - taille ${bike?.size})`,
            techName: `${tech?.firstname} ${tech?.lastname}`,
            price: `${type?.price} €`,
            type: type?.name,
          },
        };
      });

      setEvents(eventsData);
    } catch (error) {
      message.error("Erreur lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  function renderEventContent(eventInfo) {
    const { event } = eventInfo;
    const props = event.extendedProps;

    return (
      <div style={styles.card}>
        <div style={styles.container}>
          <div>
            <b>{eventInfo.timeText}</b>
          </div>
          <div>
            <strong>{props.clientName}</strong>
          </div>
        </div>
        <div style={styles.container}>
          <div>
            {props.type} - {props.price}
          </div>
          <div style={{ fontStyle: "italic" }}>{props.bike}</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Spin size="large" style={styles.spinner} />;
  }

  return (
    <>
      <SelectTech
        selectedTechUser={selectedTechUser}
        setSelectedTechUser={setSelectedTechUser}
      />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
        eventClick={(info) => {
          const props = info.event.extendedProps;
          const messageContent = `
                        👤 Client : ${props.clientName}
                        🔧 Technicien : ${props.techName}
                        🚲 Vélo : ${props.bike}
                        🛠️ Intervention : ${props.type}
                        💰 Prix : ${props.price}
                        🕒 De ${info.event.start.toLocaleTimeString()} à ${info.event.end.toLocaleTimeString()}
                            `;
          message.info({
            content: <pre>{messageContent}</pre>,
            duration: 3,
            style: { whiteSpace: "pre-wrap" },
          });
        }}
        locale={frLocale}
        selectable={true}
        allDaySlot={false}
        slotMinTime={"08:00:00"}
        slotMaxTime={"18:00:00"}
        height={"100%"}
      />
    </>
  );
}

const styles = {
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px",
    fontSize: "0.95em",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  spinner: {
    display: "block",
    margin: "100px auto",
  },
};
