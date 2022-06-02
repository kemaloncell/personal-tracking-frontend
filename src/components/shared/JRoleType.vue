<template>

  <Dropdown
      v-model="selectedRoleType"
      :options="roleList"
      optionLabel="UserType.name"
      :showClear="true"
      class="w-full h-full city-search p-inputtext-sm"
      @change="setSelectedRoleType"
  />

</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  props: {
    defaultRole: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedRoleType: null
    }
  },
  computed: {
    ...mapGetters({
      roleList: 'definitions/roleList'
    })
  },
  methods: {
    ...mapActions({
      callRoleList: 'definitions/callRoleList'
    }),

    setSelectedRoleType() {
      this.$emit('onRoleType', this.selectedRoleType)
    }
  },
  watch: {
    defaultRole: function (val) {
      if (!val) {
        this.selectedRoleType = null
        return
      }

      if (typeof val === 'string') {
        this.selectedRoleType = val
      } else {
        this.selectedRoleType = val
      }

      this.callRoleList()

    }
  },
  created() {
    if (!this.roleList.length) {
      this.callRoleList()
    }
  },
  mounted() {
    this.callRoleList()

    if (this.defaultRole) {
      this.selectedRoleType = this.defaultRole
    }
  }
}
</script>
