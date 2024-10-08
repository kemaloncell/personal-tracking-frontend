import Vue from 'vue';

import DefaultLayout from "@/layout/DefaultLayout";

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'


//Jack Russel Components
import JTable from '@/components/shared/JTable'
import JModal from '@/components/shared/JModal'
import JImageUpload from "@/components/shared/JImageUpload";
import JInputText from "@/components/shared/JInputText";
import JInputMask from "@/components/shared/JInputMask";
import JSubmitButton from "@/components/shared/JSubmitButton";
import JTaxOffice from "@/components/shared/JTaxOffice";
import JEmployeeType from "@/components/shared/JEmployeeType";
import JEducationLevelType from "@/components/shared/JEducationLevelType";
import JDate from "@/components/shared/JDate";
import JEmployeeDocumentType from "@/components/shared/JEmployeeDocumentType";
import JCityDistrict from "@/components/shared/JCityDistrict";
import JCity from "@/components/shared/JCity";
import JDistrict from "@/components/shared/JDistrict";
import JRoleType from "@/components/shared/JRoleType";
import JEmployees from "@/components/shared/JEmployees";


import AutoComplete from 'primevue/autocomplete';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button';
import Breadcrumb from 'primevue/breadcrumb';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Chart from 'primevue/chart';
import Checkbox from 'primevue/checkbox';
import Chips from 'primevue/chips';
import ColorPicker from 'primevue/colorpicker';
import Column from 'primevue/column';
import ContextMenu from 'primevue/contextmenu';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import Fieldset from 'primevue/fieldset';
import FileUpload from 'primevue/fileupload';
import FullCalendar from 'primevue/fullcalendar';
import InlineMessage from 'primevue/inlinemessage';
import Inplace from 'primevue/inplace';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';
import MegaMenu from 'primevue/megamenu';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Spinner from 'primevue/progressspinner'
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OrderList from 'primevue/orderlist';
import OrganizationChart from 'primevue/organizationchart';
import OverlayPanel from 'primevue/overlaypanel';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import PanelMenu from 'primevue/panelmenu';
import Password from 'primevue/password';
import PickList from 'primevue/picklist';
import ProgressBar from 'primevue/progressbar';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import SelectButton from 'primevue/selectbutton';
import Slider from 'primevue/slider';
import Sidebar from 'primevue/sidebar';
import SplitButton from 'primevue/splitbutton';
import Steps from 'primevue/steps';
import TabMenu from 'primevue/tabmenu';
import TieredMenu from 'primevue/tieredmenu';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tooltip from 'primevue/tooltip';
import ToggleButton from 'primevue/togglebutton';
import Tree from 'primevue/tree';
import TreeTable from 'primevue/treetable';
import TriStateCheckbox from 'primevue/tristatecheckbox';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';
import '../assets/layout/layout.scss';

Vue.use(ToastService);
Vue.directive('tooltip', Tooltip);
Vue.directive('ripple', Ripple);

Vue.prototype.$appState = Vue.observable({inputStyle: 'outlined'});
Vue.prototype.$primevue = Vue.observable({ripple: true});

Vue.config.productionTip = false;

//Jack Russell Components
Vue.component('j-table', JTable)
Vue.component('j-modal', JModal)
Vue.component('j-input-text', JInputText)
Vue.component('j-input-mask', JInputMask)
Vue.component('j-city-district', JCityDistrict)
Vue.component('j-city', JCity)
Vue.component('j-district', JDistrict)
Vue.component('j-submitbutton', JSubmitButton)
Vue.component('j-taxOffice', JTaxOffice)
Vue.component('j-image-upload', JImageUpload)
Vue.component('j-employee-type', JEmployeeType)
Vue.component('j-education-level-type', JEducationLevelType)
Vue.component('j-date', JDate)
Vue.component('j-employee-document-type', JEmployeeDocumentType)
Vue.component('j-role-type', JRoleType)
Vue.component('j-employees', JEmployees)


Vue.component('Accordion', Accordion);
Vue.component('AccordionTab', AccordionTab);
Vue.component('AutoComplete', AutoComplete);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('Button', Button);
Vue.component('Calendar', Calendar);
Vue.component('Card', Card);
Vue.component('Carousel', Carousel);
Vue.component('Chart', Chart);
Vue.component('Checkbox', Checkbox);
Vue.component('Chips', Chips);
Vue.component('ColorPicker', ColorPicker);
Vue.component('Column', Column);
Vue.component('ContextMenu', ContextMenu);
Vue.component('DataTable', DataTable);
Vue.component('DataView', DataView);
Vue.component('DataViewLayoutOptions', DataViewLayoutOptions);
Vue.component('Dialog', Dialog);
Vue.component('Dropdown', Dropdown);
Vue.component('Spinner', Spinner);
Vue.component('Fieldset', Fieldset);
Vue.component('FileUpload', FileUpload);
Vue.component('FullCalendar', FullCalendar);
Vue.component('InlineMessage', InlineMessage);
Vue.component('Inplace', Inplace);
Vue.component('InputMask', InputMask);
Vue.component('InputNumber', InputNumber);
Vue.component('InputSwitch', InputSwitch);
Vue.component('InputText', InputText);
Vue.component('Listbox', Listbox);
Vue.component('MegaMenu', MegaMenu);
Vue.component('Menu', Menu);
Vue.component('Menubar', Menubar);
Vue.component('Message', Message);
Vue.component('MultiSelect', MultiSelect);
Vue.component('OrderList', OrderList);
Vue.component('OrganizationChart', OrganizationChart);
Vue.component('OverlayPanel', OverlayPanel);
Vue.component('Paginator', Paginator);
Vue.component('Panel', Panel);
Vue.component('PanelMenu', PanelMenu);
Vue.component('Password', Password);
Vue.component('PickList', PickList);
Vue.component('ProgressBar', ProgressBar);
Vue.component('RadioButton', RadioButton);
Vue.component('Rating', Rating);
Vue.component('SelectButton', SelectButton);
Vue.component('Slider', Slider);
Vue.component('Sidebar', Sidebar);
Vue.component('SplitButton', SplitButton);
Vue.component('Steps', Steps);
Vue.component('TabMenu', TabMenu);
Vue.component('TabView', TabView);
Vue.component('TabPanel', TabPanel);
Vue.component('Textarea', Textarea);
Vue.component('TieredMenu', TieredMenu);
Vue.component('Toast', Toast);
Vue.component('Toolbar', Toolbar);
Vue.component('ToggleButton', ToggleButton);
Vue.component('Tree', Tree);
Vue.component('TreeTable', TreeTable);
Vue.component('TriStateCheckbox', TriStateCheckbox);

Vue.component('default-layout', DefaultLayout);
