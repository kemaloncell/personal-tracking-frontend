<template>
  <default-layout>
    <div slot="content">
      <div class="card">
        <div class=" mt-5">
          <Steps :model="items" :exact="false"
                 style="margin-bottom: 1rem"/>
        </div>

        <div class="col-8" style="margin: auto">
          <keep-alive>
            <router-view :isActive="isActive" :formData="formObject" @prevPage="prevPage($event)"
                         @nextPage="nextPage($event)"
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
      isActive: true,
      submitted: false,
      items: [{
        label: 'Bölge Oluştur',
        to: 'create',
        name: 'zone'
      },
        {
          label: 'Alan Oluştur',
          to: 'area-create',
          name: 'Area'
        },
        {
          label: 'Çalışan Oluştur',
          to: 'employee-create',
          name: 'Employee'
        },
        {
          label: 'Doğrulama',
          to: 'confirmation',
          name: 'Confirmation'
        }],
      formObject: {}
    }
  },

  methods: {
    nextPage(event) {
      var a = document.querySelectorAll(".p-steps ul li");
      for (var i = 0, length = a.length; i < length; i++) {
        if (event.pageIndex == i) {
          a[i].classList.remove("p-disabled");
        }
      }

      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }

      this.$router.push(this.items[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.items[event.pageIndex - 1].to);
    },
    async complete() {

      try {
        await this.createSubmit(this.formObject)
        
        this.$toast.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Alan ekleme başarılı !',
          life: 3000
        })
      } catch {
        this.$toast.add({
          severity: 'error',
          summary: 'Başarısız',
          detail: 'Alan ekleme başarısız !',
          life: 3000
        })
      } finally {
        await this.$router.push({name: 'ZoneList'})
      }
    },
  },

}
</script>
