<template>
  <default-layout>
    <div slot="content">
      <div class="card">
        <form @submit.prevent="submit">
          <h2 class="text-2xl font-bold" style="margin-bottom: 50px">
            Çalışan
          </h2>
          <div class="grid col-6 mt-5 flex align-items-center" style="margin: auto">

            <div class="col-2 text-sm pb-0">Çalışan</div>
            <div class="col-4 pt-0 pb-0">
              <j-employees
                  @onEmployee="onEmployee"
                  :defaultEmployee="formData.Employee"
              />
            </div>

            <div class="col-2 text-sm">Talep Tarihi</div>
            <div class="col-4">
              <j-date
                  class="w-full p-inputtext-sm"
                  v-model="formData.demandDate"
                  :defaultValue="formData.demandDate"
                  @onSelect="
                (demandDate) => {
                  formData.demandDate = demandDate
                }
              "
              ></j-date>

            </div>

            <div class="col-2 text-sm">Avans Miktarı</div>
            <div class="col-4">
              <j-input-text
                  name="phoneNumber"
                  class="w-full p-inputtext-sm"
                  v-model="formData.amount"
              />

            </div>

            <div class="col-2 text-sm">İstek Durumu</div>
            <div class="col-4">
              <Dropdown
                  v-model="formData.requestStatus"
                  :options="RequestStatus"
                  optionLabel="code"
                  :showClear="true"
                  class="w-full h-full city-search p-inputtext-sm"
              />
            </div>

            <div class="col-2 text-sm">Açıklama</div>
            <div class="col-10">
                <Textarea
                    name="phoneNumber"
                    class="w-full description-input"
                    v-model="formData.detail"
                    maxLength="512"
                />

            </div>


            <div
                class="flex justify-content-center w-full mt-5 mb-5 decline-button save-menu-button save-button"
            >
              <j-submitbutton
                  v-if="type === 'CREATE'"
                  :loading="loading"
                  @save="submit"
              />
              <Button
                  v-else
                  :disabled="loading"
                  label="Güncelle"
                  class="save-primary-button ml-3"
                  :loading="loading"
                  @click="submit"
              />
              <Button
                  :disabled="loading"
                  @click="onClose"
                  label="Vazgeç"
                  class="p-button-danger ml-3"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </default-layout>
</template>

<script>
import GlobalForm from '@/components/globalMixins/globalForm'
import advanceDemandsMixins from "./mixins/advanceDemandsMixins";
import {RequestStatus} from "@/constants/enums";

export default {
  mixins: [advanceDemandsMixins, GlobalForm],
  data: () => ({
    submitted: false,
  }),

  computed: {
    RequestStatus() {
      return RequestStatus
    },
  },

  methods: {
    async submit() {

      if (this.type === 'CREATE') {
        await this.createSubmit(this.formData)
      }

      if (this.type === 'UPDATE') {
        await this.udpateSubmit(this.formData)
      }

    },

    onEmployee(employee) {
      if (employee) {
        this.formData.Employee = employee
      }
    },

    onClose() {
      this.$router.push({name: 'AdvanceDemandsList'})
    },
  },

  mounted() {
    if (this.$route.params.data) {

      this.formData = this.$route.params.data;
    }
  },

}
</script>
