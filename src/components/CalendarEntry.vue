<template>
  <div id="calender-entry">
          <div class="card">
            <div class="card-header text-center">
              <h5>Neuer Termin für: <strong>Montag</strong></h5>
            </div>
            <div class="card-body">
              <input
                type="text"
                class="form-control"
                placeholder="Neuer Eintrag"
              />
              <select class="form-select mt-2">
                <option value="-1">Hoch</option>
                <option value="0">Mittel</option>
                <option value="1">Tief</option>
              </select>
              <div class="text-center mt-3">
                <span
                  v-for="i in 5"
                  :key="i"
                  class="d-inline-block alert alert-primary m-0 me-2 square"
                  role="button"
                >
                </span>
              </div>
              <hr />
              <div class="d-grid gap-2">
                <button class="btn btn-primary">Eintragen</button>
                <button class="btn btn-danger">Inhalt löschen</button>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
name: "CalendarEntry"
}
</script>

<style scoped>

</style>