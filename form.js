///////////////////////////////////////////////
// Form, Next Button, Previous Button        //
///////////////////////////////////////////////

(function ( $ ) {
  $.fn.multiStepForm = function(args) {
      if(args === null || typeof args !== 'object' || $.isArray(args))
        throw  " : Called with Invalid argument";
      var form = this;
      var tabs = form.find('.tab');
      var steps = form.find('.step');
      steps.each(function(i, e){
        $(e).on('click', function(ev){
        });
      });
      form.navigateTo = function (i) {/*index*/
        /*Mark the current section with the class 'current'*/
        tabs.removeClass('current').eq(i).addClass('current');
        // Show only the navigation buttons that make sense for the current section:
        form.find('.previous').toggle(i > 0);
        atTheEnd = i >= tabs.length - 1;
        form.find('.next').toggle(!atTheEnd);
        // console.log('atTheEnd='+atTheEnd);
        form.find('.submit').toggle(atTheEnd);
        fixStepIndicator(curIndex());
        return form;
      }
      function curIndex() {
        /*Return the current index by looking at which section has the class 'current'*/
        return tabs.index(tabs.filter('.current'));
      }
      function fixStepIndicator(n) {
        steps.each(function(i, e){
          i == n ? $(e).addClass('active') : $(e).removeClass('active');
        });
      }
      /* Previous button is easy, just go back */
      form.find('.previous').click(function() {
        form.navigateTo(curIndex() - 1);
      });

      /* Next button goes forward iff current block validates */
      form.find('.next').click(function() {
        if('validations' in args && typeof args.validations === 'object' && !$.isArray(args.validations)){
          if(!('noValidate' in args) || (typeof args.noValidate === 'boolean' && !args.noValidate)){
            form.validate(args.validations);
            if(form.valid() == true){
              form.navigateTo(curIndex() + 1);
              return true;
            }
            return false;
          }
        }
        form.navigateTo(curIndex() + 1);
      });
      form.find('.submit').on('click', function(e){
        if(typeof args.beforeSubmit !== 'undefined' && typeof args.beforeSubmit !== 'function')
          args.beforeSubmit(form, this);
        /*check if args.submit is set false if not then form.submit is not gonna run, if not set then will run by default*/        
        if(typeof args.submit === 'undefined' || (typeof args.submit === 'boolean' && args.submit)){
          form.submit();
        }
        return form;
      });
      /*By default navigate to the tab 0, if it is being set using defaultStep property*/
      typeof args.defaultStep === 'number' ? form.navigateTo(args.defaultStep) : null;

      form.noValidate = function() {
        
      }
      return form;
  };
}( jQuery ));

///////////////////////////////////////////////
// Travel History                            //
///////////////////////////////////////////////

// Ask how long traveler have been in China 
var inChina = document.getElementById("inChina");
if(inChina){
  inChina.addEventListener("click", function (e) {
    if (this.checked) {
      document.getElementById("dateChina").style.display = "block";
    }
    else {
      document.getElementById("dateChina").style.display = "none";
    }
  });
}


// Ask how long traveler have been in countries/regions
var inRegion = document.getElementById("inRegion");
if(inRegion){
  inRegion.addEventListener("click", function (e) {

    if (this.checked) {
      document.getElementById("dateRegion").style.display = "block"
    }
    else {
      document.getElementById("dateRegion").style.display = "none"
    }
  });
}


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
if(stop_element){
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
}

///////////////////////////////////////////////
// Symptoms                                  //
///////////////////////////////////////////////

// Get all symtoms elements
var isFever= document.getElementById("isFever");
var notFever= document.getElementById("notFever");
var isCough= document.getElementById("isCough");
var notCough= document.getElementById("notCough");
var isShortBreath= document.getElementById("isShortBreath");
var notShortBreath= document.getElementById("notShortBreath");

// Fever = True
if(isFever){
  isFever.addEventListener("click",function(){
    if(notFever.classList.contains("false")){
      notFever.classList.remove("false")
    }
    isFever.classList.add("true")
    //alert(isFever.className)
  });
}

// Fever = False
if(notFever){
  notFever.addEventListener("click",function(){
    if(isFever.classList.contains("true")){
      isFever.classList.remove("true")
    }
    notFever.classList.add("false")
    //alert(notFever.className)
  });
}


// Cough = True
if(isCough){
  isCough.addEventListener("click",function(){
    if(notCough.classList.contains("false")){
      notCough.classList.remove("false")
    }
    isCough.classList.add("true")
   // alert(isCough.className)
  });
}

// Cough = False

if(notCough){
  notCough.addEventListener("click",function(){
    if(isCough.classList.contains("true")){
      isCough.classList.remove("true")
    }
    notCough.classList.add("false")
    //alert(notCough.className)
  });
}

// Short Breath = True

if(isShortBreath){
  isShortBreath.addEventListener("click",function(){
    
    isShortBreath.classList.add("true")
    //alert(isShortBreath.className)
  });
}

// Short Breath = False

if(notShortBreath){
  notShortBreath.addEventListener("click",function(){
    notShortBreath.classList.add("false")
    //alert(notShortBreath.className)
  });
}






