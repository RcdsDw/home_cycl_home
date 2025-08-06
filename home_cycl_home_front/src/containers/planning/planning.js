import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { useEffect, useState } from 'react';
import { getInterventionsWithParams } from '../../actions/interventions';
import { message, Spin } from 'antd';
import SelectTech from '../../utils/SelectTech'
import { getCurrentUser } from '../../utils/GetCurrentInfo';
import { parseID } from '../../utils/ParseID';

export default function Planning() {
    const [loading, setLoading] = useState(true);
    const [selectedTechUser, setSelectedTechUser] = useState()
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchData();
    }, [selectedTechUser]);

    const fetchData = async () => {
        try {
            setLoading(true);

            const currentUser = getCurrentUser()
            const queryParams = `?technician.id=${selectedTechUser ? parseID(selectedTechUser) : currentUser.id}`;
            const res = await getInterventionsWithParams(queryParams);
            console.log("🚀 ~ fetchData ~ res:", res)
            // const interventions = interventionsRes.data;

            // const usersRes = await getUsers();
            // const users = usersRes.data;

            const eventsData = res?.member?.map((intervention) => {
                return {
                    id: parseID(intervention),
                    title: intervention.clientBike?.owner
                        ? ` ${intervention.clientBike?.owner?.firstname} ${intervention.clientBike?.owner?.lastname} - ${intervention.typeIntervention?.price} €`
                        : ` Client inconnu - ${intervention.typeIntervention?.price} €`,
                    start: intervention.start_date,
                    end: intervention.end_date,
                    color: "grey",
                };
            });

            setEvents(eventsData);
        } catch (error) {
            message.error('Erreur lors de la récupération des données.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin size="large" style={styles.spinner} />;
    }

    return (
        <>
            <SelectTech selectedTechUser={selectedTechUser} setSelectedTechUser={setSelectedTechUser} />
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                weekends={false}
                events={events}
                eventContent={renderEventContent}
                locale={frLocale}
                selectable={true}
                allDaySlot={false}
                slotMinTime={"08:00:00"}
                slotMaxTime={"18:00:00"}
                height={"100%"}
            />
        </>
    )
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}

const styles = {
    spinner: {
        display: 'block',
        margin: '100px auto'
    },
}