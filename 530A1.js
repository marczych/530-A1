window.addEvent('domready', function() {
   VariableFinder.initialize();
});

var VariableFinder = {
   initialize: function() {
      var programInput = $('programInput');
      var output = $('output');

      $('submitButton').addEvent('click', function() {
         var variables = this.getVariables(programInput.value);

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

   getVariables: function(input) {
      var variables = [];

      try {
         var ast = parse(input);
         this.getVariablesHelper(ast, variables);
         variables.sort();
      } catch (exc) {
         this.addVariable(variables,
          'Sorry there was a parse error with your javascript: ' +
          '<pre>' + exc + '</pre>');
      }

      return variables;
   },

   getVariablesHelper: function(ast, variables) {
      ast.each(function(node) {
         if (node == null) {
            return;
         }

         if (typeof node == 'object') {
            if (node[0] == 'name') {
               this.addVariable(variables, node[1]);
            } else {
               this.getVariablesHelper(node, variables);
            }
         }
      }.bind(this));

      return variables;
   },

   addVariable: function(variables, varName) {
      if (variables.indexOf(varName) == -1) {
         variables.push(varName);
      }
   }
}
