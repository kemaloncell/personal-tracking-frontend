<template>
  <default-layout>
    <div slot="content">
      <div class="card">
        <div class=" mt-5">
          <Steps :model="items" :readonly="true" :exact="true" style="margin-bottom: 1rem"/>
        </div>

        <div class=" col-8" style="margin: auto">
          <keep-alive>
            <router-view :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)"
                         @complete="complete"/>
          </keep-alive>
        </div>

      </div>
    </div>
  </default-layout>
</template>

<script>
import GlobalForm from '@/components/globalMixins/globalForm'
import zoneMixin from './mixins/zoneMixins'

export default {
  mixins: [zoneMixin, GlobalForm],
  data() {
    return {
      submitted: false,
      items: [{
        label: 'Bölge Oluştur',
        to: 'create'
      },
        {
          label: 'Alan Oluştur',
          to: 'area-create'
        },
        {
          label: 'Çalışan Oluştur',
          to: 'employee-create'
        },
        {
          label: 'Doğrulama',
          to: 'confirmation'
        }],
      formObject: {}
    }
  },

  methods: {

    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }

      this.$router.push(this.items[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.items[event.pageIndex - 1].to);
    },
    complete() {
      this.$toast.add({
        severity: 'Başarılı',
        summary: 'Bölge Oluşturuldu',
        detail: 'Sayın, ' + this.formObject.firstname + ' ' + 'Bölge oluşturma başarıyla gerçekleştirildi.'
      });
    },


    /*   async submit() {
        this.$v.$touch()
        this.submitted = true

        if (this.$v.$invalid) {
          return
        }

        if (this.type === 'CREATE') {
          this.createSubmit(this.formData)
        }

        if (this.type === 'UPDATE') {
          this.udpateSubmit(this.formData)
        }
      },

      onClose() {
        this.$router.push({name: 'Supplier'});
      },

      onSelectCity(city) {
        if (city) {
          this.formData.Address.City = city
        }
      },

      onSelectDistrict(district) {
        console.log(district, 'on selecrt dist')
        if (district) {
          this.formData.Address.District = district
        }
      },

      onTaxOffice(taxOffice) {
        if (taxOffice) {
          this.formData.TaxOffice = taxOffice
        }
      },


    },

     mounted() {
       if (this.type === 'CREATE') {
         this.resetForm()
       } else {
         this.type = this.$route.params.type
         this.formData = this.$route.params.data
       }
     } */
  }
}
</script>
