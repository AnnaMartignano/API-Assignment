//chiamare il backend

var url = "https://thawing-plateau-51300.herokuapp.com/api/assignments";

function load() {
  fetch(url)
    .then(response => { return response.json()})
    .then(responseJson => {
    //console.log(responseJson);
      var list = document.getElementById("list");
      var table = document.createElement("table");

      for(var i = 0; i < responseJson.length; i++) {
        var tr = document.createElement("tr");

        var studentID = document.createElement("td");
        studentID.innerHTML = responseJson[i].studentID;
        tr.appendChild(studentID);

        var assignmentType = document.createElement("td");
        assignmentType.innerHTML = responseJson[i].assignmentType;
        tr.appendChild(assignmentType);

        var delivery = document.createElement("td");
        delivery.innerHTML = responseJson[i].delivery;
        tr.appendChild(delivery);

        var date = document.createElement("td");
        date.innerHTML = responseJson[i].date;
        tr.appendChild(date);

        var button_cell_create = document.createElement("td");
        var create_button = document.createElement("button");
        create_button.id = responseJson[i]._id;
        create_button.onclick = function() {
          click(this.id);
        }
        create_button.innerHTML = "Modify assignment";
        button_cell_create.appendChild(create_button)
        tr.appendChild(button_cell_create);

        var button_cell_delete = document.createElement("td");
        var delete_button = document.createElement("button");
        delete_button.id = responseJson[i]._id;
        delete_button.onclick = function() {
          deleteAssignment(this.id);
        }
        delete_button.innerHTML = "Delete assignment";
        button_cell_delete.appendChild(delete_button)
        tr.appendChild(button_cell_delete);

        table.appendChild(tr);
      }
      list.appendChild(table);
   })
   .catch(e => console.log(e))
}

function click(id) {
    var studentID = prompt("Insert the studentID of the assignment");
    var assignmentType = prompt("Insert the assignmentType of the assignment");
    var delivery = prompt("Insert the delivery of the assignment");

    var assignment = {
        "studentID" : studentID,
        "assignmentType" : assignmentType,
        "delivery": delivery
    }

    fetch(url + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(assignment)
    })
        .then(response => { return response.json()})
        .then(responseJson => {
            console.log(JSON.stringify(responseJson))
            location.reload();
        })
    .catch(e => console.log(e))
 }

/**
 * Function called when the user click the delete button of a assignment
 */
function deleteAssignment(id) {
    fetch(url + '/' + id, {
        method: 'DELETE',
    })
        .then(response => { return response.json()})
        .then(responseJson => {
            console.log(JSON.stringify(responseJson))
            location.reload();
        })
    .catch(e => console.log(e))
 }
