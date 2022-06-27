<template>
  <default-layout>
    <div slot="content">

      <i @click="goCommonDemands" class="pi pi-arrow-left font-bold mb-4" style="font-size: 1.3rem"></i>
      <p class="font-medium "> {{ getNameSurname }}</p>
      <div class="card">
        <TabView style="margin-left: 15rem; width: 70%">
          <TabPanel :header="tabName">

            <CommonDemandsForm
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :defaultDemands="demandsData"
                :type="demandsFormType"
            />

          </TabPanel>
          <TabPanel :header="'Mesaj Oluştur'">
            <CommonDemandsMessageForm
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :type="formType"
                :defaultDemands="demandsData"
            />

          </TabPanel>

        </TabView>
      </div>

      <commonDemandsMessageList
          :data="list"
          :loading="loading"
          @onDelete="onDelete"
      />
      <Toast position="top-right"/>

    </div>
  </default-layout>
</template>

<script>
import commonDemandsMessageList from "./CommonDemandsMessageList";
import commonDemandsMessageMixins from "@/components/demands/commonDemands/mixins/commonDemandsMessageMixins";
import CommonDemandsForm from "@/components/demands/commonDemands/CommonDemandsForm";
import CommonDemandsMessageForm from "@/components/demands/commonDemands/CommonDemandsMessageForm";

export default {
  mixins: [commonDemandsMessageMixins],
  components: {
    CommonDemandsForm,
    CommonDemandsMessageForm,
    commonDemandsMessageList
  },
  data() {
    return {
      demandsData: null,
      formType: 'CREATE',
      demandsFormType: null,
    }
  },

  computed: {
    tabName() {
      if (this.$route.params.type) {
        return this.$route.params.type === 'CREATE' ? 'İzin Oluştur' : 'İzin Düzenle';
      } else {
        return 'Müşteri Oluştur';
      }
    },
    getNameSurname() {
      if (this.demandsData != null) {
        return 'Seçilen İzin:' + ' ' + this.demandsData.title
      } else {
        return 'İzin Bilgileri'
      }

      if (this.$route.params != null) {
        return 'Seçilen İzin:' + ' ' + this.$route.params.data.name
      } else {
        return 'İzin Bilgileri'
      }
    },
  },

  methods: {

    goCommonDemands() {
      this.$router.push({name: 'CommonDemandsList'})
    },
  },

  mounted() {
    this.demandsFormType = this.$route.params.type
    this.$route.params.data != null ? this.demandsData = this.$route.params.data : this.demandsData = null
  },

  created() {
    this.getListCommonDemandsMessage(this.$route.params.data.id)
  },
}
</script>