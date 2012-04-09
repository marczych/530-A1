window.addEvent('domready', function() {
   VariableFinder.initialize();
});

var VariableFinder = {
   initialize: function() {
      var programInput = $('programInput');
      var output = $('output');

      $('submitButton').addEvent('click', function() {
         var ast = parse(programInput.value);
         var variables = this.getVariables(ast);

         output.getChildren().each(function(element) {
            element.dispose();
         });

         variables.each(function(varName) {
            var row = new Element('p', {
               html: varName
            });

            row.inject(output);
         }.bind(this));
      }.bind(this));
   },

   getVariables: function(ast) {
      return ['var1', 'var2', 'var3'];
   }
}
