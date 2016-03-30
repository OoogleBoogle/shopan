var toDelete = [];

$(function() {
  // jQuery UI sortable options:
  $('.list').sortable({
    opacity: 0.8,
    cursor: "move "
  });
  // renaming
  $('.list').on('click', 'span', function(e) {
    $this = this;
    console.log($this);
    $('.rename-container').css('top', (e.pageY - 50) ).fadeIn('fast');
    $('#new-name').focus().val($this.textContent);
    $('#rename').on('click', function(e) {
      e.preventDefault();
      var newName = $('#new-name').val();
      if (newName !== "") {
        if (newName[newName.length - 1] === "!") {
          $this.parentElement.className = "imp-item";
        } else {
          $this.parentElement.className = "item";
        }
        $this.textContent = newName;
        $('.rename-container').fadeOut('fast');
      }
    })
  });

  // button manager
  $('.button-holder').on('click', 'button', function(e) {
    e.preventDefault();
    switch (this.id) {
      // when #menu-open button clicked, 
      case "menu-open":
        if ($('.dropdown').is(':visible')) {
          // menu slides up
          $(this).text('Open Menu');
          $('.dropdown').slideUp(200, function() {
            $('hr').animate({
              width: '3%'
            }, 200);
          }); 
        } else {          
          $this = $(this);
          $('hr').animate({ 
            width: '78%'
            // 'margin-left': "11%"
          }, 200, function() {
            //menu slides down
            $('.dropdown').slideDown();
            $($this).text('Close Menu');
            $('#item-to-add').focus();
          });
        }
        break;
      // when #add-to-list is pressed 
      case "add-to-list":
        addToList($('#item-to-add').val(), $('#important').prop('checked'));
        $('#item-to-add').focus();
        break;
      // when delete is pressed
      case "delete-all":
        $('.warning').fadeIn('fast');
        break;
      case "undo":
        $('.warning').fadeOut('fast');
        break;
      case "delEverything":
        $('.warning').fadeOut('fast');
        // delete all items - Duh.
        $('.list').children().slideUp(500, function() {
          $(this).remove();
        });
        // clear toDelete array
        toDelete = [];
        break;
      case "rename":
        break;
      case "cancel":
        $('.rename-container').fadeOut('fast');
        break;
      default:
        console.log('Mama?...sumthang goin wrong ere...');
    }
  });
  //when items icon is pressed...
  $('.list').on('click', 'i', function() {
    var $parent = $(this).parent();
    // check if a tick
    if (this.id === 'check') {
      // create an object holding cuttent properties for 'undeletion'
      var imp = $parent.hasClass('imp-item');
      // store properties in an object, just in case
      var props = {name: $parent.text(), important: imp};
      toDelete.push(props);
      // remove and add to the bottom of the list
      $parent.slideUp(500, function() {
        var $item = $(this).detach().attr('class', 'complete');
        $item.find('i').remove()
        .end().prepend('<i id="put-back" class="fa fa-undo"></i><i id="delete-item" class="fa fa-times"></li>');
        $('.list').append($item);
        $('.list').children().last().slideDown();
      });
    // if undo pressed
    } else if (this.id === "put-back") {
      var item;
      for (var i = 0; i < toDelete.length; i++) {
        if (toDelete[i].name === $(this).parent().text()) {
          item = toDelete[i];
          toDelete.splice(i,1);
        }
      }
      $(this).parent().slideUp();
      addToList(item.name, item.important);
    // or cancel
    } else if (this.id === "delete-item") {
      $parent.slideUp(500, function() {
        $(this).remove();
      });
    }
  });
  // faffing with color
  $('#color').on('change', function() {
    $('html').css('background-color', $(this).val());
  });
});






function addToList(val) {
  // check textbox has value
  if (val !== "") {
    var imp = val[val.length - 1] === "!" ? true : false;
    // create element to escape HTML tags
    var listEl = document.createElement('li');
    var itemText = document.createTextNode(val);
    var tick = document.createElement('i');
    var span = document.createElement('span');
    tick.className = "fa fa-check";
    tick.id = "check";
    span.appendChild(itemText);
    listEl.appendChild(tick);
    listEl.appendChild(span);
    // if important is ticked
    if (imp) {
      // add to top of the list
      listEl.className = 'imp-item';
      $('.list').prepend(listEl);
      $('.imp-item:first').slideDown();
      // $('#important').prop('checked', false);
    // otherwise...
    } else {
      // build html
      listEl.className = 'item';
      // check to see if there are already important items
      if ($('.list').children().hasClass('imp-item')) {
        // if so, append after last one
        $('.imp-item').last().after(listEl).slideDown();
        $('.item:first').slideDown();
      } else {
        // otherwise add to top
        $('.list').prepend(listEl);
        $('.list li:first').slideDown();
      }
    }
  }
  // clear text box, menu stays open
  $('#item-to-add').val('');
}