var passenger = function (firstName, middleName, lastName,
  gender, passport, nationality, dob, address, city, state,
  zipcode, phone, email, inChina, dateChina, inRegions, dateRegion,
  fever, cough, shortBreathing) {
  this.firstName = firstName;
  this.middleName = middleName;
  this.lastName = lastName;
  this.gender = gender;
  this.passport = passport;
  this.nationality = nationality;
  this.dob = dob;
  this.address = address;
  this.city = city;
  this.state = state;
  this.zipcode = zipcode;
  this.phone = phone;
  this.email = email;
  this.inChina = inChina;
  this.dateChina = dateChina;
  this.inRegions = inRegions;
  this.dateRegion = dateRegion;
  this.fever = fever;
  this.cough = cough;
  this.shortBreathing = shortBreathing;
}
var flight = function (origin, destination, stop_number, airline, flightNo, seatNo) {
  this.origin = origin;
  this.destination = destination;
  this.stop_number = stop_number;
  this.airline = airline;
  this.flightNo = flightNo;
  this.seatNo = seatNo;
}
var layovers = [];
function layover(airport, airline, flightNo, seatNo) {
  this.airport = airport;
  this.airline = airline;
  this.flightNo = flightNo;
  this.seatNo = seatNo;
}
function addLayover(airport, airline, flightNo, seatNo) {
  var l = new layover(airport, airline, flightNo, seatNo);

  layovers.push(l);

}
(function ($) {

  var form = $("#health-form");

  // VALIDATION 
  form.validate({
    errorPlacement: function errorPlacement(error, element) {
      element.before(error);
    },
    rules: {
      //Passenger Info: 
      first_name: { required: true},
      last_name: {required: true},
      nationality: {required: true},
      passport: {required: true},
      address: {required: true},
      city: {required: true},
      state: {required: true},
      zipcode: {required: true, digits: true, minlength:5, maxlength:5},
      email: {required: true, email: true},
      phone_number: {required: true, digits:true, },
      //Flight Info:
      origin: {required: true},
      dest: {required: true}

    },
    messages: {
      //Passenger Info: 
      first_name: { required: 'Required field <i class="zmdi zmdi-info"></i>'},
      last_name: {required: 'Required field <i class="zmdi zmdi-info"></i>'},
      nationality: { required: 'Required field <i class="zmdi zmdi-info"></i>'},
      passport: {required: 'Required field <i class="zmdi zmdi-info"></i>'},
      zipcode: {
        required: 'Required field <i class="zmdi zmdi-info"></i>',
        digits: 'US postal code is 5 digits <i class="zmdi zmdi-info"></i>',
        minlength: 'US postal code is 5 digits <i class="zmdi zmdi-info"></i>',
        maxlength: 'US postal code is 5 digits <i class="zmdi zmdi-info"></i>'
      },
      email: {email: 'Not a valid email address <i class="zmdi zmdi-info"></i>'},
      phone_number: {digits: 'Not a valid phone number <i class="zmdi zmdi-info"></i>'},
      //Flight Info:
      origin: { required: 'Required field <i class="zmdi zmdi-info"></i>'},
      dest: {required: 'Required field <i class="zmdi zmdi-info"></i>'},
    },
    onfocusout: function (element) {
       $(element).valid();
     },
  });
  form.steps({
    headerTag: "h3",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    labels: {
      previous: 'Previous',
      next: 'Next',
      finish: 'Submit',
      current: ''
    },
    titleTemplate: '<div class="title"><span class="number">#index#</span>#title#</div>',
    onStepChanging: function (event, currentIndex, newIndex) {
      //form.validate().settings.ignore = ":disabled,:hidden";

      /////////////////////////////////////
      //  Personal Information Section  //
      ///////////////////////////////////

      // Update Passenger Information
      passenger.firstName = $('#first_name').val()
      passenger.middleName = $('#middle_name').val()
      passenger.lastName = $('#last_name').val()
      passenger.gender = $("input[name='gender']:checked").val();
      passenger.passport = $('#passport').val()
      passenger.nationality = $('#nationality').find(':selected').text()
      passenger.dob = $('#dob_month').find(':selected').text() + ' ' + $('#dob_date').find(':selected').text() + ' ' + $('#dob_year').find(':selected').text()
      passenger.address = $('#address').val()
      passenger.city = $('#city').val()
      passenger.state = $('#state').find(':selected').text()
      passenger.zipcode = $('#zipcode').val()
      passenger.phone = $('#phone_number').val()
      passenger.email = $('#email').val()


      //DEBUGGING
      //alert(form.steps("getCurrentIndex"));
      // alert('first: '+first_name+'\nmiddle: '+middle_name+'\nlast: '+last_name+'\ngender: '+gender);
      // alert('passport: '+passport+'\nnationality: '+nationality+'\nDOB: '+dob);
      // alert('address: '+address+'\ncity: '+city+'\nstate: '+state+'\nstate: '+zipcode);
      // alert('phone: '+phone+'\nemail: '+email);

      /////////////////////////////////////
      //   Flight Information Section   //
      ///////////////////////////////////

      // Update Flight Information

      flight.origin = $('#origin').val()
      flight.destination = $('#dest').val()
      flight.stop_number = $('#stop_number').find(':selected').val()

      // Seperate from direct flight and layovered flight

      // Direct flight: 
      // Display Airline, Flight Number and Seat Number
      if (flight.stop_number == 0) {
        flight.airline = $('#airline_0').val()
        flight.flightNo = $('#flightNo_0').val()
        flight.seatNo = $('#seatNo_0').val()
      }
      // Layover flight: 
      // Display info for each layover: Airport, airline, flight number, seat number
      else {

        //Clear all value in layovers
        while (layovers.length) {
          layovers.pop();
        }

        // Add new layover
        for (var i = 1; i <= flight.stop_number; i++) {
          var ap = $('#layover_' + i).val()
          var al = $('#airline_' + i).val()
          var fn = $('#flightNo_' + i).val()
          var sn = $('#seatNo_' + i).val()
          //alert(ap + " " + al + " " + fn + " " + sn)
          addLayover(ap, al, fn, sn)

        }
      }

      //DEBUGGING
      // alert('stop_number: '+ stop_number)
      // for (var i = 0; i < layovers.length; i++) {
      //   alert(layovers[i].airport);
      // }

      /////////////////////////////////////
      //         Travel History         //
      ///////////////////////////////////

      //In China or not
      var in_China = false

      if ($('#inChina').is(":checked")) {
        in_China = true
        var date_China = $.trim($("#date_China").val());
      }

      // In special countries or not
      var in_Regions = false
      if ($('#inRegions').is(":checked")) {
        in_Regions = true
        var recent_countries = $.trim($("#recent_countries").val());
      }

      // Update Passenger info
      passenger.inChina = in_China;
      passenger.dateChina = date_China;
      passenger.inRegions = recent_countries;

      //DEBUGGING
      //alert('inChina :' + inChina + '\ninRegions :' + inRegions + '\ndateChina :' + date_China + '\nrecentCountries :' + recent_countries)

      /////////////////////////////////////
      //             Symtoms            //
      ///////////////////////////////////

      //Get Symptoms Values
      var cough = "No", fever = "No", shortBreathing = "No"
      if ($('#isFever').hasClass('true')) {
        fever = "Yes"
      }
      if ($('#isCough').hasClass('true')) {
        cough = "Yes"
      }
      if ($('#isShortBreath').hasClass('true')) {
        shortBreathing = "Yes"
      }

      // Update Passenger info
      passenger.fever = fever;
      passenger.cough = cough;
      passenger.shortBreathing = shortBreathing;

      //DEBUGGING
      //alert('Fever: '+fever+'Cough: '+cough+'Short Breathing: '+shortBreathing)

      //////////////////////////////////////////////////
      //    Update information in Review Section     //
      ////////////////////////////////////////////////

      //Personal Information
      $('#r_first').html(passenger.firstName)
      $('#r_middle').html(passenger.middleName)
      $('#r_last').html(passenger.lastName)
      $('#r_passport').html(passenger.passport)
      $('#r_nationality').html(passenger.nationality)
      $('#r_dob').html(passenger.dob)
      $('#r_gender').html(passenger.gender)
      $('#r_address').html(passenger.address)
      $('#r_city').html(passenger.city)
      $('#r_state').html(passenger.state)
      $('#r_zipcode').html(passenger.zipcode)
      $('#r_phone').html(passenger.phone)
      $('#r_email').html(passenger.email)

      //Flight Information
      $('#r_origin').html(flight.origin)
      $('#r_destination').html(flight.destination)
      $('#r_stopNo').html(flight.stop_number)

      //Direct Flight
      if (flight.stop_number == 0) {

        //Show no_layover div
        $('#r_airline').html(flight.airline)
        $('#r_flightNo').html(flight.flightNo)
        $('#r_seatNo').html(flight.seatNo)

        //alert( $('#r_noLayover').hasClass('no_layover'))
      }
      //Layover Flight
      else {
        for (var i = 1; i <= flight.stop_number; i++) {

          //Show layover div
          $('#r_airport_' + i).html(layovers[i - 1].airport)
          $('#r_airline_' + i).html(layovers[i - 1].airline)
          $('#r_flightNo_' + i).html(layovers[i - 1].flightNo)
          $('#r_seatNo_' + i).html(layovers[i - 1].seatNo)
        }
      }

      //Travel History
      $('#r_inChina').html(passenger.inChina)
      $('#r_inRegion').html(passenger.inRegions)
      $('#r_dateChina').html(passenger.dateChina)
      $('#r_dateRegion').html(passenger.dateRegion)

      //Symptoms
      $('#r_fever').html(passenger.fever)
      $('#r_cough').html(passenger.cough)
      $('#r_breath').html(passenger.shortBreathing)


      return form.valid();
    },
    onFinishing: function (event, currentIndex) {
      form.validate().settings.ignore = ":disabled";
      //console.log(getCurrentIndex);
      //return form.valid();
      return form.submit();
    },
    onFinished: function (event, currentIndex) {
      alert('Submited');
      //window.location.href = 'newPage.html';
      //return form.submit();
    },
    // onInit : function (event, currentIndex) {
    //     event.append('demo');
    // }
  });

  jQuery.extend(jQuery.validator.messages, {
    required: "",
    remote: "",
    url: "",
    date: "",
    dateISO: "",
    number: "",
    digits: "",
    equalTo: "",
    minlength: "",
    maxlength:""
  });
  $.dobPicker({
    daySelector: '#dob_date',
    monthSelector: '#dob_month',
    yearSelector: '#dob_year',
    dayDefault: 'DD',
    yearDefault: 'YYYY',
    minimumAge: 0,
    maximumAge: 120
  });

  // $('#password').pwstrength();

  // $('#button').click(function () {
  //   $("input[type='file']").trigger('click');
  // })

  // $("input[type='file']").change(function () {
  //   $('#val').text(this.value.replace(/C:\\fakepath\\/i, ''))
  // })

})(jQuery);
///////////////////////////////////////////
//FLIGHT INFORMATION
/////////////////////////////////////////

var stop_element = document.getElementById("stop_number")

if (stop_element) {
  stop_element.addEventListener("change", function (e) {
    var stop_num = stop_element.options[stop_element.selectedIndex].value;
    var many_stops = document.getElementsByClassName("many_stops")
    var r_layover = document.getElementsByClassName("r_layover")
    
    if (stop_num == 0) {
      document.getElementById("no_stops").style.display = "inline-block"
      document.getElementById("r_noLayover").style.display = "inline-block"
      for (var i = 0; i < many_stops.length; i++) {
        //Hide many_stop div in Flight Infomation
        many_stops[i].style.display = "none"
        // Hide layover div in Review
        r_layover[i].style.display = "none"
      }
      //document.getElementsByClassName("many_stops").style.display = "none"
      
    }
    else {
      document.getElementById("no_stops").style.display = "none"
      for (var i = 0; i < many_stops.length; i++) {
        //Hide many_stop div in Flight Infomation
        many_stops[i].style.display = "none"
        // Hide layover div in Review
        r_layover[i].style.display = "none"
      }
      for (var i = 0; i < stop_num; i++) {
        many_stops[i].style.display = "block"
        r_layover[i].style.display = "inline-block"
      }
    }
  });
}
///////////////////////////////////////////////
// Travel History                            //
///////////////////////////////////////////////

// Ask how long traveler have been in China 
var inChina = document.getElementById("inChina");
if (inChina) {
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
var inRegions = document.getElementById("inRegions");
if (inRegions) {
  inRegions.addEventListener("click", function (e) {

    if (this.checked) {
      document.getElementById("dateRegion").style.display = "block"
    }
    else {
      document.getElementById("dateRegion").style.display = "none"
    }
  });
}

///////////////////////////////////////////////
// Symptoms                                  //
///////////////////////////////////////////////

// Get all symtoms elements
var isFever = document.getElementById("isFever");
var notFever = document.getElementById("notFever");
var isCough = document.getElementById("isCough");
var notCough = document.getElementById("notCough");
var isShortBreath = document.getElementById("isShortBreath");
var notShortBreath = document.getElementById("notShortBreath");

// Fever = True
if (isFever) {
  isFever.addEventListener("click", function () {
    if (notFever.classList.contains("false")) {
      notFever.classList.remove("false")
    }
    isFever.classList.add("true")
    //alert(isFever.className)
  });
}

// Fever = False
if (notFever) {
  notFever.addEventListener("click", function () {
    if (isFever.classList.contains("true")) {
      isFever.classList.remove("true")
    }
    notFever.classList.add("false")
    //alert(notFever.className)
  });
}


// Cough = True
if (isCough) {
  isCough.addEventListener("click", function () {
    if (notCough.classList.contains("false")) {
      notCough.classList.remove("false")
    }
    isCough.classList.add("true")
    // alert(isCough.className)
  });
}

// Cough = False

if (notCough) {
  notCough.addEventListener("click", function () {
    if (isCough.classList.contains("true")) {
      isCough.classList.remove("true")
    }
    notCough.classList.add("false")
    //alert(notCough.className)
  });
}

// Short Breath = True

if (isShortBreath) {
  isShortBreath.addEventListener("click", function () {
    if (notShortBreath.classList.contains("false")) {
      notShortBreath.classList.remove("false")
    }
    isShortBreath.classList.add("true")
    //alert(isShortBreath.className)
  });
}

// Short Breath = False

if (notShortBreath) {
  notShortBreath.addEventListener("click", function () {
    if (isShortBreath.classList.contains("true")) {
      isShortBreath.classList.remove("true")
    }
    notShortBreath.classList.add("false")
    //alert(notShortBreath.className)
  });
}

///////////////////////////////////////////////
// Submit                              //
///////////////////////////////////////////////



