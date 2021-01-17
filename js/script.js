
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
   // keyup event listener is added to the input text box and will call the searchName, showPage, and appendPageLinks funtions
   input.addEventListener('keyup', () => {
      const filterList = searchName(input.value,studentList);
      showPage(filterList,1);
      appendPageLinks(filterList);
   })
   
   const button = document.createElement('button');
   button.textContent = 'Search';
   divSearch.appendChild(button);
   // click event listener is added to the search button and will call the searchName, showPage, and appendPageLinks funtions
   button.addEventListener('click', () => {
      const filterList = searchName(input.value,studentList);
      showPage(filterList,1);
      appendPageLinks(filterList);
   })
}

// searchName function takes in the parameters name and studentList 
// returns a new list of all the student names which include name
// this function also updates the DOM to show the search results
function searchName(search,studentList) {
   // Create a blank Document Fragment to append studentList
   let filterList = document.createDocumentFragment();
   for (let i = 0; i < studentList.length; i++) {
      // grab the student name that is stored in the h3 tags
      const studentName = studentList[i].querySelector('h3').textContent;

       // appends child if search is null OR studentName includes search query
      if (!search || studentName.toLowerCase().includes(search.toLowerCase())) {
         // filterList includes names of students that includes search query
         // If search is empty, filterList will hold the original list of students
         filterList.appendChild(studentList[i]);
      }
   }

   // the parent of the student list is grabbed to clear the list
   const ul = document.querySelector('.student-list');
   ul.innerHTML = '';
   if (filterList.childElementCount !== 0) {
      // the filteredList of student gets appended as a child to the ul if results where found
      ul.appendChild(filterList);
   } else {
      // if no results are found message is displayed to the user
      ul.innerHTML = "<center>THERE ARE NO MATCHES</center>"
   }
   // select the div element containing the pagination links to clear it 
   const divPage = document.querySelector('.page');
   divPage.removeChild(divPage.lastElementChild);
   // returns the new list of students 
   return ul.children;
}


// calls showPage function to show the first maxDisplay items 
showPage(studentList,1);
// adds the pagination links to the bottom of the web page
appendPageLinks(studentList);
// add the search box and event listener to them
appendSearchBox();
