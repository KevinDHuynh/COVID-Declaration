///////////////////////////////////////////////
// Form, Next Button, Previous Button        //
///////////////////////////////////////////////

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

// Add listeners for Button
//var prevBtn = document.getElementById("prevBtn");
//prevBtn.addEventListener("click",nextPrev(-1));
//var nextBtn= document.getElementById("nextBtn");
//nextBtn.addEventListener("click",nextPrev(1));


function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

///////////////////////////////////////////////
// Travel History                            //
///////////////////////////////////////////////

// Ask how long traveler have been in China 
var inChina = document.getElementById("inChina");
inChina.addEventListener("change", function (e) {

  if (this.checked) {
    document.getElementById("dateChina").style.display = "block"
  }
  else {
    document.getElementById("dateChina").style.display = "none"
  }
});

// Ask how long traveler have been in countries/regions
var inRegion = document.getElementById("inRegion");
inRegion.addEventListener("change", function (e) {

  if (this.checked) {
    document.getElementById("dateRegion").style.display = "block"
  }
  else {
    document.getElementById("dateRegion").style.display = "none"
  }
});

///////////////////////////////////////////////
// Flight Information                        //
///////////////////////////////////////////////

//Airport Auto Complete
var options = {
  shouldSort: true,
  threshold: 0.4,
  maxPatternLength: 32,
  keys: [{
    name: 'iata',
    weight: 0.5
  }, {
    name: 'name',
    weight: 0.3
  }, {
    name: 'city',
    weight: 0.2
  }]
};

var fuse = new Fuse(airports, options)

$('.autocomplete').each(function() {
  var ac = $(this);
  
   ac.on('click', function(e) {
    e.stopPropagation();
  })
  .on('focus keyup', search)
  .on('keydown', onKeyDown);
  
  var wrap = $('<div>')
    .addClass('autocomplete-wrapper')
    .insertBefore(ac)
    .append(ac);
  
    var list = $('<div>')
      .addClass('autocomplete-results')
      .on('click', '.autocomplete-result', function(e) {
        e.preventDefault();
        e.stopPropagation();
        selectIndex($(this).data('index'), ac);
    })
    .appendTo(wrap);
});

$(document)
  .on('mouseover', '.autocomplete-result', function(e) {
    var index = parseInt($(this).data('index'), 10);
    if (!isNaN(index)) {
      $(this).attr('data-highlight', index);
    }
  })
  .on('click', clearResults);

function clearResults() {
  results = [];
  numResults = 0;
  $('.autocomplete-results').empty();
}

function selectIndex(index, autoinput) {
  if (results.length >= index + 1) {
    autoinput.val(results[index].iata);
    clearResults();
  }  
}

var results = [];
var numResults = 0;
var selectedIndex = -1;

function search(e) {
  if (e.which === 38 || e.which === 13 || e.which === 40) {
    return;
  }
  var ac = $(e.target);
  var list = ac.next();
  if (ac.val().length > 0) {
    results = _.take(fuse.search(ac.val()), 7);
    numResults = results.length;
    
    var divs = results.map(function(r, i) {
        return '<div class="autocomplete-result" data-index="'+ i +'">'
             + '<div><b>'+ r.iata +'</b> - '+ r.name +'</div>'
             + '<div class="autocomplete-location">'+ r.city +', '+ r.country +'</div>'
             + '</div>';
     });
    
    selectedIndex = -1;
    list.html(divs.join(''))
      .attr('data-highlight', selectedIndex);

  } else {
    numResults = 0;
    list.empty();
  }
}

function onKeyDown(e) {
  var ac = $(e.currentTarget);
  var list = ac.next();
  switch(e.which) {
    case 38: // up
      selectedIndex--;
      if (selectedIndex <= -1) {
        selectedIndex = -1;
      }
      list.attr('data-highlight', selectedIndex);
      break;
    case 13: // enter
      selectIndex(selectedIndex, ac);
      break;
    case 9: // enter
      selectIndex(selectedIndex, ac);
      e.stopPropagation();
      return;
    case 40: // down
      selectedIndex++;
      if (selectedIndex >= numResults) {
        selectedIndex = numResults-1;
      }
      list.attr('data-highlight', selectedIndex);
      break;

    default: return; // exit this handler for other keys
  }
  e.stopPropagation();
  e.preventDefault(); // prevent the default action (scroll / move caret)
}

//Number of stops
var stop_element = document.getElementById("stop_number")
stop_element.addEventListener("change", function (e) {
  var stop_num = stop_element.options[stop_element.selectedIndex].value;
  var many_stops= this.parentNode.getElementsByClassName("many_stops")
  if (stop_num == 0) {
    document.getElementById("no_stops").style.display = "block"
    for(var i=0; i<many_stops.length;i++)
    {
      many_stops[i].style.display="none"
    }
    //document.getElementsByClassName("many_stops").style.display = "none"
    //alert(stop_num)
  }
  else {
    document.getElementById("no_stops").style.display = "none"

    for (var i = 0; i <stop_num; i++) {
      many_stops[i].style.display="block"
    }
  }
});







