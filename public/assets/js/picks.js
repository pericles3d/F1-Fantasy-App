//Draggable script
$(function() {
  $( ".drag-hamilton" ).draggable({ revert: true });
  $( ".drag-vettel" ).draggable({ revert: true });
  $( ".drag-massa" ).draggable({ revert: true });
  $( ".drag-kvyat" ).draggable({ revert: true });
  $( ".drag-perez" ).draggable({ revert: true });
  $( ".drag-rosberg" ).draggable({ revert: true });
  $( ".drag-raikkonen" ).draggable({ revert: true });
  $( ".drag-bottas" ).draggable({ revert: true });
  $( ".drag-ricciardo" ).draggable({ revert: true });
  $( ".drag-hulkenberg" ).draggable({ revert: true });
  $( ".drag-grosjean" ).draggable({ revert: true });
  $( ".drag-verstappen" ).draggable({ revert: true });
  $( ".drag-ericsson" ).draggable({ revert: true });
  $( ".drag-alonso" ).draggable({ revert: true });
  $( ".drag-stevens" ).draggable({ revert: true });
  $( ".drag-maldonado" ).draggable({ revert: true });
  $( ".drag-sainz" ).draggable({ revert: true });
  $( ".drag-nasr" ).draggable({ revert: true });
  $( ".drag-button" ).draggable({ revert: true });
  $( ".drag-mehri" ).draggable({ revert: true });

  for (var i = 1; i <= 20; i++){
    $( "#droppable" + i ).droppable({
      hoverClass: "ui-state-hover",  //highlights the input field when the image hovers it. Class is default from Jquery-ui
      drop: function( event, ui ) {
        $( this )
          // .addClass( "ui-state-highlight" ) //not gonna be used in this project
          .find( "input" ) //looks for the input tag
            .val( ui.helper[0].alt ) //applies the alt DOM element of the current selected image into the value of the input.
              .trigger("input");
            console.log(ui.helper[0].alt);
      }
    });
  }
});

  // DIFFERENT WAY OF ACHIEVING THE FOR LOOP BELLOW
  // var obj={
  //   hoverClass: "ui-state-hover",  //highlights the input field when the image hovers it. Class is default from Jquery-ui
  //   drop: function( event, ui ) {
  //     $( this )
  //       // .addClass( "ui-state-highlight" ) //not gonna be used in this project
  //       .find( "input" ) //looks for the input tag
  //         .val( ui.helper[0].alt ); //applies the alt DOM element of the current selected image into the value of the input.
  //         console.log(ui.helper[0].alt);
  //   }
  // };
  // for (var i = 1; i <= 20; i++){
  //   $( "#droppable"+i ).droppable(obj);
  // }
  // });
