<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-12">
                <!-- Anfang: Template für die Calendar-Week-Component -->
                <!-- <CalendarWeekAsList />
        <CalendarWeek /> -->
                <keep-alive>
                    <component :is="activeView" />
                </keep-alive>
                <!-- Ende: Template für die Calendar-Week-Component -->
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-4 offset-4">
                <!-- Anfang: Template für die Calendar-Entry-Component -->
                <CalendarEntry />
                <!-- Ende: Template für die Calendar-Day-Component -->
            </div>
            <div class="col-2 offset-2">
                <div class="float-end">
                    <!-- Mit dem Button blenden wir die Calendar-Settings-Component ein bzw. aus. -->
                    <button
                        class="btn btn-lg mb-2"
                        :class="buttonSettingsClass"
                        @click="toggleDisplaySettings">
                        <i class="fas fa-cogs"></i>
                    </button>
                </div>
                <!-- Anfang: Template für die Calendar-Settings-Component -->
                <CalendarSettings v-if="displaySettings" />
                <!-- Ende: Template für die Calendar-Day-Component -->
            </div>
        </div>
    </div>
</template>

<script>
    import { defineAsyncComponent } from "vue";
    import Store from "./store";
    import CalendarWeek from "./components/CalendarWeek.vue";
    import CalendarWeekAsList from "./components/CalendarWeekAsList.vue";
    import CalendarEntry from "./components/CalendarEntry.vue";
    // import CalendarSettings from './components/CalendarSettings.vue';

    export default {
        name: "App",
        components: {
            // Langschreibweise
            // 'CalenderWeek': CalendarWeek
            // Kurzschreibweise
            CalendarWeek,
            CalendarEntry,
            CalendarWeekAsList,
            CalendarSettings: defineAsyncComponent(() => {
                return import("./components/CalendarSettings.vue");
            }),
        },
        data() {
            return {
                displaySettings: false,
            };
        },
        computed: {
            buttonSettingsClass() {
                return this.displaySettings
                    ? ["btn-success"]
                    : ["btn-outline-success"];
            },
            activeView() {
                return Store.getters.activeView();
            },
        },
        methods: {
            toggleDisplaySettings() {
                this.displaySettings = !this.displaySettings;
            },
        },
    };
</script>

<style>
    @import "~bootstrap/dist/css/bootstrap.min.css";
    @import "~@fortawesome/fontawesome-free/css/all.min.css";

    .square {
        width: 40px;
        height: 40px;
    }
</style>
