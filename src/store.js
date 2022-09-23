import { calendarWeekData } from "./seed"
import { reactive, readonly } from "vue"

const state = reactive({
    calendarWeekData,
    activeView: "CalendarWeek",
})

const getters = {
    activeDay: () => state.calendarWeekData.find((day) => day.active),
    activeView: () => state.activeView,
}

const mutations = {
    setActiveDay(dayId) {
        state.calendarWeekData.map((dayObj) => {
            dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false)
        })
    },
    setActiveView(view) {
        state.activeView = view
    },
    storeEvent(eventDO) {
        const activeDay = getters.activeDay()
        activeDay.events.push({
            title: eventDO.title,
            edit: false,
            color: eventDO.color,
            priority: Number(eventDO.priority),
        })
    },
    editEvent(dayId, eventTitle) {
        // Alle edit-Attribute auf false setzen, damit immer nur ein Event bearbeitet werden kann.
        state.calendarWeekData.map((dayObj) => {
            dayObj.events.map((event) => (event.edit = false))
        })
        // Setze das entsprechende edit-Atribute auf true.
        const dayObj = state.calendarWeekData.find((day) => day.id === dayId)
        const eventObj = dayObj.events.find((event) => event.title === eventTitle)
        eventObj.edit = true
    },
    updateEvent(dayId, oldEventTitle, newEvent) {
        newEvent.title = newEvent.title !== "" ? newEvent.title : oldEventTitle
        const dayObj = state.calendarWeekData.find((day) => day.id === dayId)
        const eventObj = dayObj.events.find((event) => event.title === oldEventTitle)
        eventObj.title = newEvent.title
        eventObj.priority = Number(newEvent.priority)
        eventObj.edit = false
    },
    deleteEvent(dayId, eventTitle) {
        const dayObj = state.calendarWeekData.find((day) => day.id === dayId)
        const eventIndex = dayObj.events.findIndex((event) => event.title === eventTitle)
        dayObj.events.splice(eventIndex, 1)
    },
}

export default {
    state: readonly(state),
    getters,
    mutations,
}