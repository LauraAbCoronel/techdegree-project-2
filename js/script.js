
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


// appendPageLinks function takes in the list of students and generates functional pagination links. 
function appendPageLinks(studentList) {
   // numPageButton is the number of page buttons needed to only display maxDisplay items at a time 
   const numPageLinks = Math.ceil(studentList.length/maxDisplay);

   // we select the div with the class "page" to eventually add our pagination buttons to.
   const divPage = document.querySelector('.page');

   const div = document.createElement('div');
   div.className = "pagination";
   const ul = document.createElement('ul');
   // For each number of pagination links needed, an li element is created with an a element with its corresponding page number as the text content.
   for (let i = 0; i < numPageLinks; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i+1;
      // sets the first pagination link to active
      if (i===0) {
         a.className = 'active';
      }
      a.href = '#';
      // adds an event listener to all pagination links. Sets all pagination links class name to '' and only the selected link class name to 'active'. 
      // then updates the page to show the student for the corresponding page by calling showPage function.
      a.addEventListener('click', (e) => {
         const page = a.textContent;
         const liList = ul.children;
         // loops through all the li children of ul and sets the a element class name to ''
         for (let i = 0; i < numPageLinks; i++) {
            liList[i].firstElementChild.className = "";
         }
         e.target.className = 'active';
         showPage(studentList,page);
      })
      li.appendChild(a);
      ul.appendChild(li);
   }
   div.appendChild(ul);
   divPage.appendChild(div);
}

// appendSearchBox function adds a search input box as a child of the div with the class "page-header"
function appendSearchBox() {
   // grab the div where we will want to insert the search input box
   const divHeader = document.querySelector('.page-header');   
   
   const divSearch = document.createElement('div');
   divSearch.className = 'student-search';
   divHeader.appendChild(divSearch);
   
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   divSearch.appendChild(input);
   
   const button = document.createElement('button');
   button.textContent = 'Search';
   divSearch.appendChild(button);
}

// searchName function takes in the parameters name and studentList 
//    returns filterList: a new list of all the student names which include name
function searchName(search,studentList) {
   // This list will contain the list of students whos names match the search parameter
   let filterList = [];
   for (let i = 0; i < studentList.length; i++) {
      // grab the student name that is stored in the h3 tags
      const studentName = studentList[i].querySelector('h3').textContent;
      if (search.length !== 0 && studentName.toLowerCase().includes(search.toLowerCase())) {
         // adds the student name to the back of the filterList array
         filterList.push(studentList[i]);
      }
   }
   return filterList;
}


// calls showPage function to show the first maxDisplay items 
showPage(studentList,1);
// adds the pagination links to the bottom of the web page
appendPageLinks(studentList);
// add the search box and event listener to them
appendSearchBox();
