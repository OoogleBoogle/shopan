$(function() {

  $('.button-holder').on('click', 'button', function() {
    switch ($(this).text()) {
      case "Add Item":
        console.log("open menu");
        if ($('.dropdown').is(':visible')) {
          $('.dropdown').slideUp();
        } else
          $('.dropdown').slideDown();
        break;
      case "Add to List":
        console.log("adding");
        break;
      case "Done":
        console.log('list complete');
        break;
      case "Delete":
        console.log('deleting');
        break;
      default:
        console.log('no match');
    }
  })

  // when #menu-open button clicked, menu slides down 

  // when #add-to-list is pressed 
    // check for important 
    // create html 
    // add to list, menu stays open

    // when .list-complete is pressed - checks for value (if blank, don't add) - close menu



  //when item pressed add to delete staging queue


  // when delete is pressed, delete any staged

});