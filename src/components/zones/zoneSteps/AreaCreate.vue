<template>

  <div class="stepsdemo-content">
    <Card>
      <template #title>
        Alan Bilgileri
      </template>
      <template #subtitle>
        Alan bilgilerinizi giriniz.
      </template>
      <template #content>
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="class">Yetkili kişi</label>
            <InputText type="text" v-model="areaAuthName"/>
          </div>

          <div class="field col-8">
            <j-city
                required
                @onSelectCity="onSelectDistrict"
                :defaultCity="1"
                :defaultDistrict="District"
                v-model="District"
            />
          </div>

          <div class="field col-2">
            <label id="date" for="date">Date</label>
            <InputMask id="date" mask="99/99" v-model="date"/>
          </div>
          <div class="field col-2">
            <label for="cvv">CVV</label>
            <InputMask id="cvv" mask="999" v-model="cvv"/>
          </div>
        </div>


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
export default {
  data() {
    return {
      areaAuthName: '',
      District: '',
    }
  },
  methods: {

    nextPage() {
      this.$emit('nextPage', {
        formData: {
          class: this.selectedClass.name,
          vagon: this.selectedVagon.vagon,
          seat: this.selectedSeat.seat
        }, pageIndex: 1
      });
    },
    prevPage() {
      this.$emit('prevPage', {pageIndex: 1});
    },

    onSelectDistrict(district) {
      if (district) {
        this.District = district
      }
    },
  },
}
</script>