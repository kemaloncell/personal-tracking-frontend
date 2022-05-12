<template>
  <default-layout>
    <div slot="content">
      <div class="p-grid p-fluid dashboard">
        <div class="p-col-12">
          <div class="card">
            <h1 style="font-size:16px">Balance</h1>
            <DataTable :value="products" class="p-datatable-customers" :rows="5" style="margin-bottom: 20px"
                       :paginator="true">
              <Column>
                <template #header>
                  Logo
                </template>
                <template #body="slotProps">
                  <img :src="'assets/layout/images/product/' + slotProps.data.image" :alt="slotProps.data.image"
                       width="50px"/>
                </template>
              </Column>
              <Column field="name" header="Name" sortable></Column>
              <Column field="category" header="Category" sortable></Column>
              <Column field="price" header="Price" sortable>
                <template #body="slotProps">
                  {{ formatCurrency(slotProps.data.price) }}
                </template>
              </Column>
              <Column>
                <template #header>
                  View
                </template>
                <template #body>
                  <Button icon="pi pi-search" type="button" class="p-button-success p-mr-2 p-mb-1"></Button>
                  <Button icon="pi pi-times" type="button" class="p-button-danger p-mb-1"></Button>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>


import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  data() {
    return {
      tasksCheckbox: [],
      dropdownCities: [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ],
      dropdownCity: null,
      options: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: '2019-01-01',
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true
      },
      events: null,
      products: null,
      selectedProducts: null,
      lineData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860'
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e'
          }
        ]
      },
    }
  },
  mounted() {
    let afId = this.$route.query['af_id'];
    if (afId) {
      let today = new Date();
      let expire = new Date();
      expire.setTime(today.getTime() + 3600000 * 24 * 7);
      document.cookie = 'primeaffiliateid=' + afId + ';expires=' + expire.toUTCString() + ';path=/; domain:primefaces.org';
    }
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }
  }
}
</script>
