/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const fruits = {
	header:
		['fruit',
		'price'],
	things:
	[
		['apple', 1.70,],
		['berry', 1],
		['banana', 1.2],
		['cherry', 1.3],
		['pear', 1.9]
	]
}
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		initializeDB()
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = lookup(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
function createTable(object, table){
	//iterate through object
	var row = table.insertRow(-1) //insert header row
	object.header.forEach(head => {
		row.classList.add("header") //make header
		var cell = row.insertCell(-1)
		cell.innerHTML = head //set value to element in header
	})
	object.things.forEach(thing => {
		var row = table.insertRow(-1) //create row for each element in object
		for (var innerThing in thing){
			//create cell for each value in object
			var cell = row.insertCell(-1)
			cell.innerHTML = thing[innerThing]
		}
	})
}
function initializeDB(){
		dropDown(lookup('sort'), fruits.header)
		drawTable(fruits, lookup("searchResults"), fruits.header.indexOf(lookup("sort").value))
		lookup("search").onkeyup = function(){
			searchDatabase('searchResults', 'search') //set searchbar to search database
		}
		lookup("sort").onchange = function(){
			drawTable(fruits, lookup("searchResults"), fruits.header.indexOf(lookup("sort").value))
		}
}
function drawTable(array, table, sorting, ascending = true){
	table = deleteTable(table) //delete all rows in table
	array.things.sort(function(a, b){
		console.log(sorting)
		if (a[sorting]== b[sorting]) {
        return 0;
    }
    else {
        return (a[sorting] < b[sorting]) ? -1 : 1; //sort by whichever element is given by dropdown
    }
	})
	createTable(array, table) //create table from object
}


function lookup(id){
	return document.getElementById(id); //lookup using id
}

function searchDatabase(table, input) {
  // Declare variables
  var tr, td, i, txtValue;
  table = lookup(table)
  input = lookup(input)
  filter = input.value.toUpperCase();
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
	if (tr[i].classList.contains("header")){ //check if header
		continue;
	}
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function remove(obj, thing){
	index = obj.indexOf(thing);
	if (index > -1) {
		obj.splice(index, 1);
	}
	return obj
}
function dropDown(ele, options) { //make dropdown based on elements
    ele.length = 0
    options.forEach(key => {
        let o = document.createElement("option");
        o.coin = key;
        o.text = key;
        ele.appendChild(o);
    })
}
function deleteTable(table){
	table.innerHTML = "";
	return table
}


app.initialize();