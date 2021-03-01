const empList =  $("#employee-list");
const add_emp = $("#add-employee");

const alertAdd = document.querySelector('#showalert2');
const alertDelete = document.querySelector('#showalert');
const alertUpdate = document.querySelector('#showalert3');

const edit = document.querySelector("#update");

function fetchAllData(doc){
    empList.append(
        `<tr id="${doc.id}">
        <td>${doc.data().fullname}</td>
        <td>${doc.data().age}</td>
        <td>${doc.data().address}</td>
        <td>${doc.data().email}</td>
        <td style="width: 200px;"><a href="javascript:void(0)" class="edit btn btn-warning btn-sm" id="${doc.id}">Edit</a> | <a href="javascript:void(0)" class="del btn btn-danger btn-sm" id="${doc.id}">Delete</a><td>
        </tr>`
    );

    $('.del').click((e)=>{
        e.stopImmediatePropagation();
        if(confirm("Are you sure?")){

            alertAdd.style.display = 'none';
            alertUpdate.style.display = 'none';
            alertDelete.style.display = 'none';
            var id = e.target.id;
            db.collection('employee').doc(id).delete();
        }
    });

    $('.edit').click((e)=>{
        e.stopImmediatePropagation();
        alertAdd.style.display = 'none';
        alertUpdate.style.display = 'none';
        alertDelete.style.display = 'none';
        edit.style.display = 'block';
        var id = e.target.id;
        db.collection('employee').doc(id).get().then(doc=>{
            $('#fullname').val(doc.data().fullname);
            $('#age').val(doc.data().age);
            $('#address').val(doc.data().address);
            $('#email').val(doc.data().email);
            $('#id_edit').val(doc.id);
        })
    })

}

$("#update").on('click', ()=>{
    if($('#fullname').val(),$('#age').val(),$('#address').val(), $('#email').val() != ''){ 
    alertAdd.style.display = 'none';
    alertUpdate.style.display = 'block';
    alertDelete.style.display = 'none';
    var id = $('#id_edit').val();
    db.collection('employee').doc(id).set({
        fullname:$('#fullname').val(),
        age:$('#age').val(),
        address:$('#address').val(),
        email:$('#email').val(),
    },{
        merge: true
    });
}else{
    alert("All fields are required");
}
});

add_emp.on('submit', (e)=>{
    e.preventDefault();

    if($('#fullname').val(),$('#age').val(),$('#address').val(), $('#email').val() != ''){ 
        alertAdd.style.display = 'block';
        // alertAdd.fadeIn(3000);
        alertUpdate.style.display = 'none';
        alertDelete.style.display = 'none';
        db.collection('employee').add({
            fullname: $('#fullname').val(),
            age: $('#age').val(),
            address: $('#address').val(),
            added_at: Date(),
        });
    }else{
        alert("All fields are required");
    }
});

db.collection('employee').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type == 'added'){
            fetchAllData(change.doc);
        }else if(change.type == 'removed'){
            var id = change.doc.id;
            $('#'+id).remove();
        }else if(change.type == "modified"){
            var id = change.doc.id;
            $('#' + id).remove();
            fetchAllData(change.doc);
        }
    })
})


function ResetForm(){
    $('#fullname').val('');
    $('#age').val('');
    $('#address').val('');
    $('#email').val('');
}