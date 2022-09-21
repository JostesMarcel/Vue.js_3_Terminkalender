<template>
  <div id="calender-entry">
          <div class="card">
            <div class="card-header text-center">
              <h5>Neuer Termin für: <strong>{{ activeDayName }}</strong></h5>
            </div>
            <div class="card-body">
              <input
                type="text"
                class="form-control"
                placeholder="Neuer Eintrag"
                v-model="event.title"
              />
              <select class="form-select mt-2" v-model="event.priority">
                <option value="-1">Hoch</option>
                <option value="0">Mittel</option>
                <option value="1">Tief</option>
              </select>
              <div class="text-center mt-3">
                <span
                  v-for="color in eventColors"
                  :key="color"
                  class="d-inline-block alert m-0 me-2 square"
                  :class="eventColorClasses(color)"
                  role="button"
                  @click="setEventColor(color)"
                >
                </span>
              </div>
              <hr />
              <div class="d-grid gap-2">
                <button class="btn btn-primary" @click="submitEvent">Eintragen</button>
                <button class="btn btn-danger">Inhalt löschen</button>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import Store from '../store'
export default {
  name: "CalendarEntry",
  data() {
    return {
      eventColors: ["primary", "success", "info", "warning", "danger"],
      event: {
        title: "",
        color: "primary",
        priority: 0,
      },
    }
  },
  computed: {
    activeDayName() {
      return Store.getters.activeDay().fullName
    }
  },
  methods: {
    eventColorClasses(eventColor) {
      return ["alert-" + eventColor, this.event.color === eventColor ? "border border-"+this.event.color : "",]
    },
    setEventColor(eventColor) {
      this.event.color = eventColor
    },
    submitEvent() {
      Store.mutations.storeEvent(this.event)
    }
  },
}
</script>

<style scoped>

</style>