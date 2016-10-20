/* Name- app.js
  Description- The entry js of the ractive application
  Version- 1.0
*/

import Ractive from 'ractive';  
import template from '../views/app.html'; /* Imports template to be used in ractive instance */
import ProgressbarHandlerComponent from './components/progressbarHandler'; /* Imports component to be used in ractive instance */

require("../styles/scss/_build.scss"); /* Incorporates the scss styles */

/* Creates a new ractive instance,
  el: the element to show the content,
  template: the content to be shown,
  components: the component modules to be used in the ractive instance */
var App = new Ractive({  
  el: '#app',
  template: template,
  components: {
      ProgressbarHandler: ProgressbarHandlerComponent
  }
});

export default App;