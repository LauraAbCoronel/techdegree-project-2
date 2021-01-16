
// Setting the global variables.
// studentList contains a list of all the elements with the class "student-item"
// maxDisplay is the number of students to show on each page.
const studentList = document.querySelectorAll('.student-item');
const maxDisplay = 10;

// showPage function takes in the list of student and the page number
// The function will ten loop through the list and hide the students that are not within the index of the page number
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





// Remember to delete the comments that came with this file, and replace them with your own code comments.