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
  Message,
  Row,
  InputNumber,
  Upload,
  Card
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
Vue.use(Row)
Vue.use(InputNumber)
Vue.use(Upload)
Vue.use(Card)

// Vue.use(Loading.directive)

// Vue.prototype.$loading = Loading.service
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
// Vue.prototype.$message = Message

// 修复elementui按需引入导致莫名奇妙的bug fix bug https://github.com/ElementUI/babel-plugin-component/issues/31
const _Loading = Loading
const { directive: loadingDirective, service: loadingService } = _Loading
const _MessageBox = MessageBox
const { alert, confirm, prompt } = _MessageBox

Vue.use(loadingDirective)

Vue.prototype.$loading = loadingService
Vue.prototype.$msgbox = _MessageBox
Vue.prototype.$alert = alert
Vue.prototype.$confirm = confirm
Vue.prototype.$prompt = prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
