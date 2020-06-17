import Vue from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Menu,
  MenuItem,
  Submenu,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Col,
  DatePicker,
  TimePicker,
  Switch,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Alert,
  Table,
  TableColumn,
  Tag,
  Tree,  
  Loading,
  MessageBox,
  Notification,
  Message
} from 'element-ui'

// 设置语言
// import lang from 'element-ui/lib/locale/lang/zh-CN'
// import locale from 'element-ui/lib/locale'
// locale.use(lang)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Scrollbar)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Button)
Vue.use(Alert)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Tree)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message