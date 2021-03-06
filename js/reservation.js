function populateSite() {
  document.getElementById("addy").innerHTML = "Address: " + localStorage.getItem("Address");
  var temp  = localStorage.getItem("Phone");
  document.getElementById("phone").innerHTML = "Contact Us: " + '(' + temp.substring(0,3) + ') - ' + temp.substring(3,6) + ' - ' + temp.substring(6) ;
  console.log(localStorage.getItem("id"))
}

function submitForm(){
  var first_name = document.getElementById("first_name").value;
  var last_name = document.getElementById("last_name").value;
  var email  = document.getElementById("email").value;
  var phone = document.getElementById("phone_num").value;
  var month = document.getElementById("month").value;
  var date = document.getElementById("date").value;
  var year = document.getElementById("year").value;
  var time = document.getElementById("time").value;
  var num_of_people = document.getElementById("num_peeps").value;
  console.log(num_of_people)
  var restaurantID = localStorage.getItem("id");
  var restaurantAddress = localStorage.getItem("Address");
  var restaurantNumber = localStorage.getItem("Phone");
  var name = first_name.concat(' ');
  name = name.concat(last_name);
  var count = 0;
  console.log(name);

  if (first_name == null || first_name.length == 0){
    document.getElementById("error_first_name").style.display = "block";
  }
  else {
    document.getElementById("error_first_name").style.display = "none";
    count = count + 1;
  }

  if (last_name == null || last_name.length == 0){
    document.getElementById("error_last_name").style.display = "block";
  }
  else {
    document.getElementById("error_last_name").style.display = "none";
    count = count + 1;
  }



  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(email)){
    document.getElementById("error_email").style.display = "block";
  }
  else{
    document.getElementById("error_email").style.display = "none";
    count = count + 1;
  }

  re =  /^\d{10}$/;
  console.log(phone);
  if(!re.test(phone)){
    document.getElementById("error_phone").style.display = "block";
  }
  else{
    document.getElementById("error_phone").style.display = "none";
    count = count + 1;
  }

  if(count == 4){
    console.log("All Entries Valid." , restaurantID);
    console.log("full name", name);
    reservation = {restaurantID:restaurantID, restaurantAddress:restaurantAddress, restaurantNumber:restaurantNumber,name:name,
       email:email, phone:phone, month:month, date:date, year:year, time:time, guests:num_of_people}

    var xhr = new XMLHttpRequest();
    var url = 'https://shrouded-badlands-47801.herokuapp.com/processResveration' ;
    xhr.open('POST', url , true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          if (json['success'] == 1){
              localStorage.setItem('First_Name', first_name);
              localStorage.setItem('Full_Name', name);
              localStorage.setItem('Email', email);
              localStorage.setItem('Guests', num_of_people);

              window.location.href = "conf.html";
          }
          else{
              document.getElementById("error_msg").innerHTML = json['message']
              document.getElementById("error_msg").style.display = "block";
          }
          console.log(json);
      }
    };
    var data = JSON.stringify(reservation);
    xhr.send(data);



  }


}
