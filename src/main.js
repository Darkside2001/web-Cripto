import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faLock, faUnlock, faKey, faBolt, faGraduationCap, faMobileScreen, 
  faFont, faChartBar, faGear, faTrash, faClipboard, faSync, 
  faBook, faBookOpen, faScaleBalanced, faQuestionCircle, faBars, faTimes ,faChevronDown 
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faLock, faUnlock, faKey, faBolt, faGraduationCap, faMobileScreen, 
  faFont, faChartBar, faGear, faTrash, faClipboard, faSync, 
  faBook, faBookOpen, faScaleBalanced, faQuestionCircle, faBars, faTimes,faChevronDown 

)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
