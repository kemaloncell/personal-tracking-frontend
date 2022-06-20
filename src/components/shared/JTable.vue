<template>
  <DataTable
      class="p-datatable-sm p-datatable-striped j-table"
      v-bind="$attrs"
      responsiveLayout="scroll"
      columnResizeMode="fit"
      :resizableColumns="true"
      showGridlines
      ref="dt"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Toplam {totalRecords} kayıttan {first}-{last} arası gösteriliyor"
      dataKey="id"
      :selection.sync="selections"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50]"
      @page="onPage($event)"
      @sort="sort($event)"
      :first="0"
      :multiSortMeta="multiSortMeta"
  >
    <Column
        v-if="selection"
        selectionMode="multiple"
        :headerStyle="{ width: '2em' }"
        :exportable="false"
        class="j-table-multiple"
    ></Column>
    <slot name="columns"></slot>

    <Column v-if="showAction">
      <template #body="{ data }">
        <div class="flex justify-content-end pr-1">


          <router-link v-if="documentType" :to="{ name: `Document`, params:{id:data.id, data:data } }"
                       type="button"
                       class="p-button-primary p-button-sm table-update-button mr-2">
            <i class="pi pi-file-o" style="color:white"></i>
          </router-link>

          <router-link v-if="addUser" :to="{ name: `AddCustomer`, params:{id:data.id, data:data } }"
                       type="button"
                       v-tooltip.top="'Hesap oluşturmak için tıklayın'"
                       class="p-button-sm table-message-button mr-2" style="border-radius: 4px">
            <i class="pi pi-user-plus" style="color:white"></i>
          </router-link>


          <Button
              v-if="isMessage"
              type="button"
              class=" p-button-sm table-message-button mr-2"
              @click="() => onMessageClick(data)"
          >
            <i class="pi pi-envelope"></i>

          </Button>

          <Button
              v-if="!isVisibleUpdateButton"
              type="button"
              class="p-button-primary p-button-sm table-update-button mr-2"
              @click="() => onUpdateClick(data)"
          >
            <img alt="logo" src="../../assets/icons/update.svg"/>
          </Button>

          <Button
              type="button"
              class="p-button-danger table-delete-button"
              @click="() => onDeleteClick(data)"
          >
            <img alt="logo" src="../../assets/icons/delete.svg"
            /></Button>
        </div>
      </template>
    </Column>

    <Dialog :modal="true" :visible.sync="displayModal" class="alert-modal">
      <div class="flex align-items-start mt-3" style="max-width: 400px">
        <img src="../../assets/icons/alert.svg" alt=""/>
        <div class="ml-4">
          <p>Kalıcı Olarak Silinecektir !</p>
          <p style="font-size: 0.875rem; margin-top: 10px">
            Kaydı kalıcı olarak silmek istediğinizden emin misiniz? Bu durum
            bağlantılı kayıtlarda geri dönülemez hatalara neden olabilir.
          </p>
        </div>
      </div>

      <div>
        <div class="flex justify-content-end mt-3">
          <Button

              @click="deleteCancel"
              class="p-button p-button-primary ml-3 p-button-sm"
              style="
              background: linear-gradient(#61adfa, #1182fe);
              margin-right: 10px;
            "
          >Vazgeç
          </Button
          >
          <Button
              @click="deleteYes"
              class="p-button p-button-danger p-button-sm"
              style="background-color: #ea0000"
          >Sil
          </Button
          >
        </div>
      </div>
    </Dialog>
  </DataTable>
</template>

<script>
export default {
  props: {
    showAction: {
      default: () => true,
      type: Boolean
    },
    selection: {
      default: () => true,
      type: Boolean
    },
    documentType: {
      default: () => false,
      type: Boolean
    },

    addUser: {
      default: () => false,
      type: Boolean
    },
    isMessage: {
      default: () => false,
      type: Boolean
    },
    isVisibleUpdateButton: {
      default: () => false,
      type: Boolean
    },
  },

  data() {
    return {
      selections: [],
      page: 0,
      displayModal: false,
      deleteId: null,
      multiSortMeta: [],
    }
  },

  watch: {
    selections: function (newVal) {
      this.$emit('selections', newVal)
    },

    displayModal(val) {
      if (!val) {
        this.deleteId = null
      }
    }
  },

  methods: {
    onPage(page) {
      this.$emit('onPageChange', {page: page, size: 10})
    },

    onMessageClick(id) {
      this.$emit('onMessage', id)
    },

    onUpdateClick(id) {
      this.$emit('onUpdate', id)
    },

    onDeleteClick(id) {
      this.deleteId = id
      this.displayModal = true
    },

    deleteYes() {
      this.$emit('onDelete', this.deleteId)
      this.displayModal = false
    },

    deleteCancel() {
      this.displayModal = false
    },

    sort(val) {
      if (this.$attrs.sortMode && this.$attrs.sortMode === 'multiple') {
        const sortItem = this.multiSortMeta.findIndex(
            (item) => item.field === val.multiSortMeta[0].field
        )

        if (sortItem === -1) {
          this.multiSortMeta.push({
            field: val.multiSortMeta[0].field,
            order: val.multiSortMeta[0].order
          })
        } else {
          this.multiSortMeta.splice(sortItem, 1)

          this.multiSortMeta.push({
            field: val.multiSortMeta[0].field,
            order: val.multiSortMeta[0].order
          })
        }

        this.$emit('onHandleSort', this.multiSortMeta)
      } else {
        this.$emit('onHandleSort', val)
      }
    }
  }
}
</script>

<style lang="scss">
.alert-modal {
  .p-dialog {
    border: 1px solid #c8c8c8 !important;
    border-radius: 6px !important;

    .p-dialog-content {
      padding: 0 20px 20px 20px !important;
      border-bottom-left-radius: 5px !important;
      border-bottom-right-radius: 5px !important;
    }
  }

  .p-dialog-header {
    justify-content: flex-end !important;
    padding: 2px 10px !important;
    background: linear-gradient(#ebeaeb, #d3d2d3);
    border-top-right-radius: 5px !important;
    border-top-left-radius: 5px !important;
  }
}

.p-component-overlay {
  background-color: rgba(255, 255, 255, 0.432) !important;
}

.table-message-button,
.table-update-button,
.table-delete-button {
  width: 26px !important;
  height: 26px !important;
  padding: 5px !important;

  img {
    width: 16px !important;
    height: 16px !important;
    position: relative !important;
    left: 50% !important;
    transform: translatex(-50%) !important;
  }
}

.table-delete-button {
  background-color: #fc3f3f !important;
}

.table-update-button {
  background-color: #3f9bfc !important;
}

.table-message-button {
  background-color: #22a22d !important;
}


</style>
