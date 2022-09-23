<template>
    <div id="calender-week">
        <div class="card-group">
            <!-- Anfang: Template für die Calendar-Day-Component -->
            <CalendarDay
                v-for="day in calendarWeekData"
                :key="day.id"
                :day="day" />
            <!-- Ende: Template für die Calendar-Day-Component -->
        </div>
    </div>
</template>

<script>
    import CalendarDay from "./CalendarDay.vue";
    import Store from "../store";
    export default {
        name: "CalendarWeek",
        components: {
            CalendarDay,
        },
        data() {
            return {
                calendarWeekData: Store.state.calendarWeekData,
            };
        },
    };
</script>

// scoped damit die Styles nur in dieser Component gelten!!!
<style scoped>
    h5 {
        color: red;
    }
</style>
