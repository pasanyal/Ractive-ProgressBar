/* Name- progressbarHandler.js
  Description- The Ractive Component - ProgressbarHandler
  Version- 1.0
*/

import Ractive from 'ractive';  
import Template from '../../views/progressbar.html'; /* Imports template to be used in ractive component */

/* Creates a ractive component encapsulating properties and methods */
var ProgressbarHandler = Ractive.extend({  
    isolated: true,
    template: Template,

    /* Event handler method to be called upon width change button clicks */
    changeInterval: function (val) {
        
        /* Holds the selected progress bar value from drop down */
        var selectedBar = this.get('selectedProgressBar');
        if(selectedBar == null) return;
        
        var keyPath = 'progressbars[' + selectedBar + '].value';
        var keyPath1 = 'progressbars[' + selectedBar + '].showvalue';
        
        if(this.get(keyPath1) < 0) 
        {
            this.set(keyPath, 0);
            this.set(keyPath1, 0);
        }
        var nextVal = this.get(keyPath1) + val;
        this.set(keyPath1, nextVal);
        this.animate(keyPath, nextVal);        
    },
    
    /* Initializes data */
    data: function () {
        return {
            selectedProgressBar: 'select',
            progressbars: [
                { name: 'ProgressBar1', value: 0, showvalue: 0 },
                { name: 'ProgressBar2', value: 0, showvalue: 0 },
                { name: 'ProgressBar3', value: 0, showvalue: 0 }
            ],
            intervals: [ +25, +10, -10, -25 ]
        };
    }    
});

export default ProgressbarHandler;  