import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { useEffect, useState } from 'react';
import getRandomColor from '../../utils/RandomColor';
import { getInterventions } from '../../actions/interventions';
import { message, Spin } from 'antd';
import { getUsers } from '../../actions/user';

export default function Planning() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const interventionsRes = await getInterventions();
            const interventions = interventionsRes.data;
            
            const usersRes = await getUsers();
            const users = usersRes.data;

            const eventsData = interventions.map((intervention) => {
                const client = users.find(user => user.id === intervention.clientId);
                return {
                    id: intervention.id,
                    title: client 
                        ? ` ${client.firstname} ${client.lastname} - ${intervention.price} €`
                        : ` Client inconnu - ${intervention.price} €`,
                    start: intervention.startedAt,
                    end: intervention.endedAt,
                    color: getRandomColor(),
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
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            weekends={false}
            events={events}
            eventContent={renderEventContent}
            locale={frLocale}
            selectable={true}
            allDaySlot={false}
            slotMinTime={"09:00:00"}
            slotMaxTime={"17:00:00"}
            height={"100%"}
            // editable={true}
            // droppable={true}
            // eventDrop={handleEventDrop}
            // eventResize={handleEventResize}
        />
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

// function handleEventDrop(info) {
//     console.log('L\'événement a été déplacé vers :', info.event.start);

// }

// function handleEventResize(info) {
//     console.log('L\'événement a été redimensionné vers :', info.event.start);
// }

const styles = {
    spinner: {
      display: 'block',
      margin: '100px auto'
    },
}