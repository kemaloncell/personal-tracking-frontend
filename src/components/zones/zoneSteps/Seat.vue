<template>

  <div class="stepsdemo-content">
    <Card>
      <template #title>
        Seat Information
      </template>
      <template #subtitle>
        Choose your seat
      </template>
      <template #content>
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-6">
            <label for="class">Class</label>
            <Dropdown inputId="class" v-model="selectedClass" :options="classes" @change="setVagons($event)"
                      optionLabel="name" placeholder="Select a Class"/>
          </div>
          <div class="field col-12 md:col-6">
            <label for="lastname">Wagon</label>
            <Dropdown inputId="wagon" v-model="selectedVagon" :options="vagons" @change="setSeats($event)"
                      optionLabel="vagon" placeholder="Select a Vagon"/>
          </div>
          <div class="field col-12">
            <label for="seat">Seat</label>
            <Dropdown inputId="seat" v-model="selectedSeat" :options="seats" optionLabel="seat"
                      placeholder="Select a Seat"/>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="grid grid-nogutter justify-content-between">
          <Button label="Back" @click="prevPage()" icon="pi pi-angle-left"/>
          <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right"/>
        </div>
      </template>
    </Card>
  </div>

</template>
<script>
</script>