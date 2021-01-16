
// Setting the global variables.
// studentList contains a list of all the elements with the class "student-item"
// maxDisplay is the number of students to show on each page.
const studentList = document.querySelectorAll('.student-item');
const maxDisplay = 10;

// showPage function takes in the list of student and the page number
// The function will then loop through the list and hide the students that are not within the index of the page number
function showPage(studentList,page) {
   for (let i = 0; i < studentList.length; i++) {
      const startIndex = (maxDisplay*page)-maxDisplay;
      const endIndex = maxDisplay*page;
      if (i>=startIndex && i<endIndex) {
         studentList[i].style.display = '';
      } else {
         studentList[i].style.display = "none";
      }
   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(studentList) {
   const pages = Math.ceil(studentList.length/maxDisplay);
   const divPage = document.querySelector('.page');
   const div = document.createElement('div');
   div.className = "pagination";
   const ul = document.createElement('ul');

   for (let i = 0; i < pages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i+1;
      if (i===0) {
         a.className = 'active';
      }
      a.href = '#';
      li.appendChild(a);
      ul.appendChild(li);
   }
   div.appendChild(ul);
   divPage.appendChild(div);
}

appendPageLinks(studentList);


// Remember to delete the comments that came with this file, and replace them with your own code comments.