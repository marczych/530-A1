window.addEvent('domready', function() {
   var programInput = $('programInput');

   $('submitButton').addEvent('click', function() {
      alert(programInput.value);
   }.bind(this));
});
