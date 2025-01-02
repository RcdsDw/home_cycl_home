import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';

// Merci à Raphaël pour cette magnifique librairie pour le planning, j'ai cherché 0.2 sec.
// PS : coubeh !

export default function Planning() {

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            weekends={false}
            events={[ 
                { 
                    title: 'Réunion avec le client', 
                    start: '2025-01-01T10:00:00', 
                    end: '2025-01-01T11:00:00',
                    color: '#FF5733'
                },
                { 
                    title: 'Travail de l’équipe', 
                    start: '2025-01-02T14:00:00', 
                    end: '2025-01-02T16:00:00',
                    color: '#33FF57'
                }
            ]}
            eventContent={renderEventContent}
            locale={frLocale}
            selectable={true}
            allDaySlot={false}
            slotMinTime={"09:00:00"}
            slotMaxTime={"18:00:00"}
            height={"100%"}
            editable={true}
            droppable={true}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
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

function handleEventDrop(info) {
    console.log('L\'événement a été déplacé vers :', info.event.start);

}

function handleEventResize(info) {
    console.log('L\'événement a été redimensionné vers :', info.event.start);
}
