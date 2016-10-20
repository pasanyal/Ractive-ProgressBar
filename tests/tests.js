(function () {
	'use strict';    
    
	describe( 'ractive', function () {
		before(function() {
            this.assert = chai.assert;
            this.template = '{{#each progressbars}}'+
                                    '<div class="row-pb">'+
                                        '<div class="display-label">{{showvalue < 0 ? 0 : showvalue}}%</div> '+
                                        '<div class="progress-bar{{value > 100 ? \'R\' : \'B\'}}" style="width: {{value > 100 ? 100 : ( value < 0 ? 0 : value )}}%"></div>'+
                                    '</div>'+
                                    '{{/each}} '+
                                    '<select value="{{selectedProgressBar}}" class="row-select">'+
                                        '<option selected value="select">Select Progress Bar</option> '+
                                        '{{#each progressbars :index}}'+
                                            '<option value="{{index}}">{{name}}</option>'+
                                        '{{/each}}'+
                                    '</select> '+
                                    '{{#each intervals}}'+
                                        '<button disabled="{{selectedProgressBar == \'select\'}}" on-click="@this.changeInterval(this)" class="btns">'+
                                            '{{this > 0 ? "+" : ""}}{{this}}'+
                                        '</button>'+
                                '{{/each}}';
            this.ractive = new Ractive({
                template: this.template,
                
                data: function () {
                    return {
                        selectedProgressBar: 'select',
                        progressbars: [],
                        intervals: [ +25, +10, -10, -25 ]
                    };
                },
                
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
                }
            });           
        });
        
        beforeEach(function() {
            var progressBarsArr = [
                            { name: 'ProgressBar1', value: 0, showvalue: 0 },
                            { name: 'ProgressBar2', value: 0, showvalue: 0 },
                            { name: 'ProgressBar3', value: 0, showvalue: 0 }
                        ];
            this.ractive.set("selectedProgressBar", "select");
            this.ractive.set("progressbars", progressBarsArr);
        });
        var testArr = [ 0, 1, 2 ];

        testArr.forEach(function(val) {
            var keyPath = 'progressbars[' + val + '].value';
            var keyPath1 = 'progressbars[' + val + '].showvalue';
            
            it( 'Test - ProgressBar ' + val + ': Initial Display Width: 100, Interval Change: 25, Expected Display Width: 125, Color: Red', function () {               
                this.ractive.set(keyPath, 100);
                this.ractive.set(keyPath1, 100);
                this.ractive.set("selectedProgressBar", val);
                this.ractive.changeInterval(25);                
                this.assert.equal( this.ractive.get(keyPath1), 125);                
            });
            
            it( 'Test - ProgressBar ' + val + ': Initial Display Width: 25, Interval Change: -25, 25, -10, Expected Display Width: 15, Color: Blue', function () {  
                this.ractive.set(keyPath, 25);
                this.ractive.set(keyPath1, 25);
                this.ractive.set("selectedProgressBar", val);
                this.ractive.changeInterval(-25); 
                this.ractive.changeInterval(25); 
                this.ractive.changeInterval(-10); 
                this.assert.equal( this.ractive.get(keyPath1), 15);
            });          
            
            it( 'Test - ProgressBar ' + val + ': Initial Display Width: 225, Interval Change: 10, -25, -10, Expected Display Width: 200, Color: Red', function () {  
                this.ractive.set(keyPath, 225);
                this.ractive.set(keyPath1, 225);
                this.ractive.set("selectedProgressBar", val);
                this.ractive.changeInterval(10); 
                this.ractive.changeInterval(-25); 
                this.ractive.changeInterval(-10); 
                this.assert.equal( this.ractive.get(keyPath1), 215);
            }); 
        });
	});

}());