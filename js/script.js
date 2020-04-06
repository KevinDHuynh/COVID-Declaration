
///////////////////////////////////////////////
// Tab                                      //
/////////////////////////////////////////////
function showTableContent(evt, Name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " active";
    //alert("graph: "+document.getElementById("graphs").style.display)
  //alert("passenger: "+document.getElementById("passenger").style.display)
  }
  
  // Get the element with id="defaultOpen" and click on it
 //document.getElementById("defaultOpen").click();

// Search
var search_form= document.getElementById("search-form");
search_form.addEventListener("submit",function(){
  
   document.getElementById("graphs").style.display="none"
   document.getElementById("passenger").style.display="block"
  //   alert("graph: "+document.getElementById("graphs").style.display)
  //   alert("passenger: "+document.getElementById("passenger").style.display)
});

///////////////////////////////////////////////
// Chart                                   //
/////////////////////////////////////////////