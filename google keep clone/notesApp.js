const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');

showNotes();
// JSON.stringify converts notes array into string
// localStorage.setItem('notes', JSON.stringify(notes));

//Local storage vs session storage
//JSON: JavaScript object notation (used to store and transform the data)


function addNotes(){
    //2) now this function searches wether it has anything like "notes", if no then....
    let notes = localStorage.getItem('notes');
    //it finds null then returns..
    if(notes == null){
        //empty array
        notes = [];
    }else{
        //but if it finds sth like "notes", it returns in object form
        notes = JSON.parse(notes);
    }
    //3) if value is empty the it will give alert message
   if (addText.value == '') {
    alert('note area can not be empty!'); 
    return;
   }
   
   //4) created a new object
   const noteObj = {
    title: addTitle.value,
    text: addText.value,
   }   
   //whenever we complete a note and click "add", the text fiels becomes empty again
   addTitle.value = '';
   addText.value = '';
   //5)new object should be in my notes , 
   //in order to check wether it is array👇👇

   if (!Array.isArray(notes)) {
    notes = [noteObj];
   }else{

   //6) added into array
    notes.push(noteObj);
   }

  //7)updated text put into the storage
   localStorage.setItem('notes', JSON.stringify(notes));
  //8)calling the showNotes function
   showNotes();
}
   
function showNotes(){
    
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    //iterating all the notes to show in the textarea
    for(let i=0; i<notes.length; i++) {
        console.log(notes[i]);  
        notesHTML += ` <div class="note">
                        <button class="deleteNote" data-index="${i}">Delete</button>
                        <button class="archiveNote">Archive</button>
                        <button class="editNote">Edit</button>
                        <div class="title">${notes[i].title === '' ? 'Note' : notes[i].title}</div>
                        <div class="text">${notes[i].text}</div>
                   </div>

      `
    }

    notesDiv.innerHTML = notesHTML;
    const deleteButtons = document.querySelectorAll('.deleteNote');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteNote);
    });
}

function deleteNote() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const index = this.dataset.index;
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}
 //1) first we introduced click event which calls "addNote" function👆👆
addNoteButton.addEventListener('click', addNotes);
