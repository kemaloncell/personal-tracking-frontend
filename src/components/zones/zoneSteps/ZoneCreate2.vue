<template>
  <div>

    <form @submit.prevent="submit" class="mt-5">

      <div class="grid mt-5">

        <div class="col-2 text-sm">Yetkili Kişi</div>
        <div class="col-4">
          <InputText
              name="authorizedPerson"
              class="w-full p-inputtext-sm"
              v-model="formData.name"
              maxLength="64"
          />
        </div>


        <j-city
            required
            @onSelectCity="onSelectCity"
            :defaultCity="formData.City"
            v-model="formData.City"
        />

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

</template>


<script>
import zoneMixins from "../mixins/zoneMixins";

export default {
  mixins: [zoneMixins],
  data() {
    return {
      formData: {
        name: null,
        City: null,
      },
    }
  },

  props: {
    type: {
      type: String,
      default: 'CREATE',
    },
  },


  methods: {
    async submit() {
      this.submitted = true;


      if (this.type === 'CREATE') {
        await this.createSubmit(this.formData)
        await this.$router.push({path: "/zone/area-create", params: {data: this.formData}});
      }

      if (this.type === 'UPDATE') {
        await this.udpateSubmit(this.formData)
      }


    },
    /* nextPage(isFormValid) {
       this.submitted = true;

       if (!isFormValid) {
         return;
       }

       this.$emit('nextPage', {
         formData: {firstname: this.firstname, lastname: this.lastname, age: this.age},
         pageIndex: 0
       });
     }, */


    onSelectCity(city) {
      if (city) {
        this.formData.City = city
      }
    },


    onClose() {
      this.$router.push({name: 'Supplier'});
    },

  }
}
</script>