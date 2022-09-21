<template>
  <div class="card border-start" :class="cardClasses">
    <div class="card-header text-center" :class="cardHeaderClasses" role="button" @click="setActiveDay()">
      <strong>{{ day.fullName }}</strong>
    </div>
    <div class="card-body">
    <CalendarEvent v-for="event in day.events" :key="event.title" :event="event" :day="day">
      <!-- <template v-slot:eventPriority="slotProps"> -->
      <template #eventPriority="slotProps">
        <h5>{{ slotProps.priorityDisplayName }}</h5>
      </template>
      <!-- <template v-slot:default></template> -->
      <template #default="{ event: entry }"><i>{{ entry.title }}</i></template>
    </CalendarEvent>
    </div>
  </div>
</template>

<script>
import CalendarEvent from './CalendarEvent.vue';
import Store from "../store"
export default {
    name: "CalendarDay",
    components: {
    CalendarEvent,
},
    // Array-Schreibweise; Nicht zu empfehlen!
    // props: ['day'],

    // Objekt-Schreibweise
    props: {
      // Möglichen Typen: String, Number, Boolean, Array, Object oder Funktion
      // Mehrere Typen mit Array-Schreibweise: [String, Number]
      // day: Object; kurzform
      day: {
        type: Object,
        required: true,
        // Bei primitiven Datentypen: default: 100
        // Bei nicht-primitiven Datentypen
        default: function() {
          return {
            id: -1,
            fullName: "Fehlender Wochentag",
            events: [],
          }
        },
        validator: function(value) {
          if (Object.keys(value).includes("id")) {
            return true;
          }
        },
      },
    },
    computed: {
      cardClasses() {
        return this.day.id === Store.getters.activeDay().id ? ["border-primary"] : null
      },
      cardHeaderClasses() {
        return this.day.id === Store.getters.activeDay().id ? ["bg-primary", "text-white"] : null
      },
    },
    methods: {
      setActiveDay() {
        Store.mutations.setActiveDay(this.day.id)
      }
    }
}
</script>

<style scoped>

</style>