<template>
    <div id="calender-entry">
        <div class="card">
            <div class="card-header text-center">
                <h5>
                    Neuer Termin für: <strong>{{ activeDayName }}</strong>
                </h5>
            </div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="error">
                    Der Titel darf nicht leer sein
                </div>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Neuer Eintrag"
                    ref="eventTitleInput"
                    v-model="event.title"
                    @keyup.enter.exact="submitEvent()"
                    @keyup.ctrl.enter.exact="resetEventTitle()" />
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
                        @click="setEventColor(color)">
                    </span>
                </div>
                <hr />
                <div class="d-grid gap-2">
                    <button
                        class="btn btn-primary"
                        :disabled="submitEventButtonStatus"
                        @click="submitEvent()">
                        Eintragen
                    </button>
                    <button class="btn btn-danger" @click="resetEventTitle()">
                        Inhalt löschen
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Store from "../store";
    export default {
        name: "CalendarEntry",
        data() {
            return {
                eventColors: [
                    "primary",
                    "success",
                    "info",
                    "warning",
                    "danger",
                ],
                event: {
                    title: "",
                    color: "primary",
                    priority: 0,
                },
                error: false,
            };
        },
        computed: {
            activeDayName() {
                return Store.getters.activeDay().fullName;
            },
            submitEventButtonStatus() {
                return this.event.title === "";
            },
        },
        mounted() {
            this.$refs.eventTitleInput.focus();
        },
        methods: {
            eventColorClasses(eventColor) {
                return [
                    "alert-" + eventColor,
                    this.event.color === eventColor
                        ? "border border-" + this.event.color
                        : "",
                ];
            },
            setEventColor(eventColor) {
                this.event.color = eventColor;
            },
            submitEvent() {
                if (this.event.title === "") return (this.error = true);

                Store.mutations.storeEvent(this.event);
                this.event = {
                    title: "",
                    color: "primary",
                    priority: 0,
                };
                this.error = false;
            },
            resetEventTitle() {
                this.event.title = "";
            },
        },
    };
</script>

<style scoped></style>
