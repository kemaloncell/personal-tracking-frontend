<template>
  <default-layout>
    <div slot="content">
      <div class="card">
        <div class="card grid col-6 mt-5" style="margin: auto">
          <form @submit.prevent="submit">
            <h2 class="text-2xl font-bold" style="margin-bottom: 50px">
              Çalışan
            </h2>
            <div class="grid mt-5 flex align-items-center">


              <div class="col-2 text-sm pb-0">Çalışan</div>
              <div class="col-4 pt-0 pb-0">
                <j-employees
                    @onEmployee="onEmployee"
                    :defaultEmployee="formData.Employee"
                />
              </div>


              <div class="col-2 text-sm">Başlangıç Tarihi</div>
              <div class="col-4">
                <j-date
                    class="w-full p-inputtext-sm"
                    v-model="formData.beginDate"
                    :defaultValue="formData.beginDate"
                    @onSelect="
                (beginDate) => {
                  formData.beginDate = beginDate
                }
              "
                ></j-date>

              </div>

              <div class="col-2 text-sm">Bitiş Tarihi</div>
              <div class="col-4">
                <j-date
                    class="w-full p-inputtext-sm"
                    v-model="formData.endDate"
                    :defaultValue="formData.endDate"
                    @onSelect="
                (endDate) => {
                  formData.endDate = endDate
                }
              "
                ></j-date>

              </div>

              <div class="col-2 text-sm">İstek Durumu</div>
              <div class="col-4">
                <Dropdown
                    v-model="formData.requestStatus"
                    :options="RequestStatus"
                    optionLabel="name"
                    :showClear="true"
                    class="w-full h-full city-search p-inputtext-sm"
                />
              </div>

              <div class="col-2 text-sm">İzin günü aralığı</div>
              <div class="col-4">
                <Dropdown
                    v-model="formData.offDayPeriod"
                    :options="OffDayPeriod"
                    optionLabel="name"
                    :showClear="true"
                    class="w-full h-full city-search p-inputtext-sm"
                />
              </div>

              <div class="col-2 text-sm">Açıklama</div>
              <div class="col-4">
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
    </div>
  </default-layout>
</template>

<script>
import GlobalForm from '@/components/globalMixins/globalForm'
import offDayDemandsMixins from "./mixins/offDayDemandsMixins";
import {OffDayPeriod, RequestStatus} from "@/constants/enums";

export default {
  mixins: [offDayDemandsMixins, GlobalForm],
  data: () => ({
    submitted: false,
  }),

  computed: {
    RequestStatus() {
      return RequestStatus
    },

    OffDayPeriod() {
      return OffDayPeriod;
    },
  },


  methods: {
    async submit() {

      if (this.type === 'CREATE') {
        {
          this.formData.requestStatus = this.formData.requestStatus.code;
        }
        {
          this.formData.offDayPeriod = this.formData.offDayPeriod.code;
        }
        await this.createSubmit(this.formData)
      }

      if (this.type === 'UPDATE') {
        await this.udpateSubmit(this.formData)
      }

    },

    onClose() {
      this.$router.push({name: 'Demands'})
    },

    onEmployee(employee) {
      if (employee) {
        this.formData.Employee = employee
      }
    },
  },

  mounted() {
    console.log(this.$route.params.data, 'router')
    if (this.$route.params.data) {
      this.formData = this.$route.params.data;
    }
  },

}
</script>
