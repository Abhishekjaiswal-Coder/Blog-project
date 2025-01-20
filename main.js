let header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0);
});

$(document).ready(function () {
  // Filter functionality
  $(".filter-item").click(function () {
      const value = $(this).attr("data-filter");

      // Filter the posts based on the selected value
      if (value === "all") {
          $(".post-box").fadeIn(1000);
          $(".note-taking-box").fadeOut(500);
          $(".Textedit-box").fadeOut(500);
      } else if (value === "note-taking-box") {
          $(".post-box").fadeOut(500);
          $(".note-taking-box").fadeIn(1000);
          $(".Textedit-box").fadeOut(500);
      } else if (value === "Textedit-box") {
          $(".post-box").fadeOut(500);
          $(".note-taking-box").fadeOut(500);
          $(".Textedit-box").fadeIn(1000);
      } else {
          $(".post-box").fadeOut(500);
          $(".post-box." + value).fadeIn(1000);
          $(".note-taking-box").fadeOut(500);
          $(".Textedit-box").fadeOut(500);
      }

    
      $(this).addClass("active-filter").siblings().removeClass("active-filter");

      
      if (value === "Calendar") {
          $("#calendarContainer").fadeIn(1000);
      } else {
          $("#calendarContainer").fadeOut(500);
      }

      
      if (value === "GoalTracker") {
          $(".goal-tracker-box").fadeIn(1000);
      } else {
          $(".goal-tracker-box").fadeOut(500);
      }
  });

 
  $("#addPostBtn").click(function (e) {
      e.stopPropagation(); 
      $("#addPostForm").fadeIn(1000); 
  });

 
  $("#addPostForm").click(function (e) {
      e.stopPropagation(); 
  });

  
  $("#cancelPostBtn").click(function () {
      $("#addPostForm").fadeOut(500); 
  });

  
  $(document).click(function (e) {
      if (!$(e.target).closest("#addPostForm, #addPostBtn").length) {
          $("#addPostForm").fadeOut(500); 
      }
  });

 
  $("#postForm").submit(function (e) {
      e.preventDefault();

      
      const category = $("#postCategory").val();
      const title = $("#postTitle").val();
      const date = $("#postDate").val();
      const description = $("#postDescription").val();
      const profileName = $("#profileName").val();
      const postImageFile = $("#postImage")[0].files[0];
      const profileImageFile = $("#profileImage")[0].files[0]; // Get the profile image file
      const postImageReader = new FileReader();
      const profileImageReader = new FileReader();

      
      postImageReader.onload = function (event) {
          const postImgSrc = event.target.result;

    
          profileImageReader.onload = function (event) {
              const profileImgSrc = event.target.result;

              
              const newPost = `
                  <div class="post-box ${category.toLowerCase()}">
                      <img src="${postImgSrc}" alt="" class="post-img">
                      <h2 class="category">${category}</h2>
                      <a href="#" class="post-title">${title}</a>
                      <span class="post-date">${date}</span>
                      <p class="post-description">${description}</p>
                      <div class="profile">
                          <img src="${profileImgSrc}" alt="" class="profile-img"> <!-- Display profile image -->
                          <span class="profile-name">${profileName}</span>
                      </div>
                  </div>
              `;

             
              $(".post.container").append(newPost);

              
              $("#postForm")[0].reset();
              $("#addPostForm").fadeOut(1000);
          };

          if (profileImageFile) {
              profileImageReader.readAsDataURL(profileImageFile); // Read profile image
          } else {
              
              profileImageReader.onload = function () {
                  const defaultProfileImg = "blogimages/default-profile.png";
                  const newPost = `
                      <div class="post-box ${category.toLowerCase()}">
                          <img src="${postImgSrc}" alt="" class="post-img">
                          <h2 class="category">${category}</h2>
                          <a href="#" class="post-title">${title}</a>
                          <span class="post-date">${date}</span>
                          <p class="post-description">${description}</p>
                          <div class="profile">
                              <img src="${defaultProfileImg}" alt="" class="profile-img"> <!-- Default profile image -->
                              <span class="profile-name">${profileName}</span>
                          </div>
                      </div>
                  `;

                  
                  $(".post.container").append(newPost);

                 
                  $("#postForm")[0].reset();
                  $("#addPostForm").fadeOut(1000);
              };
          }
      };

      if (postImageFile) {
          postImageReader.readAsDataURL(postImageFile); // Read post image
      }
  });
});

// Calendar  js code here
let newDateFunction = new Date();

function renderDate() {
    newDateFunction.setDate(1);
    let day = newDateFunction.getDay(); 
    let currentDate = new Date(newDateFunction.getFullYear(), newDateFunction.getMonth() + 1, 0).getDate(); // Get last date of current month
    let prevDate = new Date(newDateFunction.getFullYear(), newDateFunction.getMonth(), 0).getDate(); // Get last date of previous month
    let today = new Date(); 

    
    let monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById("month").innerHTML = monthArr[newDateFunction.getMonth()] + " - " + newDateFunction.getFullYear();

    
    document.getElementById("date").innerHTML = today.toDateString();

    
    document.querySelectorAll(".week div").forEach(el => el.classList.remove("active"));

    
    if (newDateFunction.getMonth() === today.getMonth() && newDateFunction.getFullYear() === today.getFullYear()) {
        document.querySelector(`.week div:nth-child(${today.getDay() + 1})`).classList.add("active");
    }

    let DATES = "";

    
    for (let x = day; x > 0; x--) {
        DATES += `<div class='prev'>${prevDate - x + 1}</div>`;
    }

    
    for (let i = 1; i <= currentDate; i++) {
        if (i === today.getDate() && newDateFunction.getMonth() === today.getMonth() &&
            newDateFunction.getFullYear() === today.getFullYear()) {
            DATES += `<div class='today'>${i}</div>`;
        } else {
            DATES += `<div>${i}</div>`;
        }
    }

    let remainingDays = 42 - (day + currentDate); 
    for (let k = 1; k <= remainingDays; k++) {
        DATES += `<div class='next'>${k}</div>`;
    }

    document.querySelector('.dates').innerHTML = DATES;
}

function moveDate(direction) {
    if (direction === 'prev') {
        newDateFunction.setMonth(newDateFunction.getMonth() - 1);
    } else if (direction === 'next') {
        newDateFunction.setMonth(newDateFunction.getMonth() + 1);
    }
    renderDate();
}

// Digital Clock Function
function digitalClock() {
    let datefunction = new Date();
    let hours = datefunction.getHours();
    let minutes = datefunction.getMinutes();
    let seconds = datefunction.getSeconds();
    let timeFormat = 'AM';

    timeFormat = hours >= 12 ? 'PM' : 'AM';
    hours = hours === 0 ? 12 : hours;
    hours = hours > 12 ? hours - 12 : hours;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.querySelector('.hours').innerHTML = hours;
    document.querySelector('.minutes').innerHTML = minutes;
    document.querySelector('.seconds').innerHTML = seconds;
    document.querySelector('.format').innerHTML = timeFormat;
}


setInterval(digitalClock, 1000);


renderDate();

// Goal Tracker

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
   if (inputBox.value === '') {
       alert("You must write something");
   } else {
       let li = document.createElement("li");
       li.innerHTML = inputBox.value;
       listContainer.appendChild(li);

       let span = document.createElement("span");
       span.innerHTML = "\u00d7";  // Close icon (×)
       li.appendChild(span);
   }
   inputBox.value = "";
   saveData();
}

listContainer.addEventListener("click", function (e) {
   if (e.target.tagName === "LI") {
       e.target.classList.toggle("checked");
       saveData();
   } else if (e.target.tagName === "SPAN") {
       e.target.parentElement.remove();
       saveData();
   }
}, false);

function saveData() {
   localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
   let savedData = localStorage.getItem("data");
   if (savedData) {
       listContainer.innerHTML = savedData;
   }
}

// Initialize task list on page load
showTask();

// Note taking tool

// Save note function
function saveNote() {
    const noteContent = document.getElementById("note-editor").value.trim();

    if (noteContent) {
        const noteList = document.getElementById("note-list");
        const listItem = document.createElement("li");

        listItem.textContent = noteContent;

    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => {
            noteList.removeChild(listItem);
        };

        listItem.appendChild(deleteButton);
        noteList.appendChild(listItem);

        
        document.getElementById("note-editor").value = "";
        alert("Note saved successfully!");
    } else {
        alert("Please write something before saving.");
    }
}
document.querySelector(".save-button").addEventListener("click", saveNote);

// Text Editor section 

let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let listButtons = document.querySelectorAll("#insertOrderedList, #insertUnorderedList");

// Font Color & Highlight Color
let fontColorPicker = document.getElementById("foreColor");
let highlightColorPicker = document.getElementById("backColor");

// Font List
let fontList = ["Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "cursive"];

// Initializer Function
const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Font Names
  fontList.forEach((font) => {
    let option = document.createElement("option");
    option.value = font;
    option.innerHTML = font;
    fontName.appendChild(option);
  });

  // Font Sizes (1 to 7)
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 3; // Default font size
};

// Function to Modify Text
const modifyText = (command, defaultUi = false, value = null) => {
  document.execCommand(command, defaultUi, value);
  writingArea.focus();
};

// Button Event Listeners
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => modifyText(button.id));
});

// Font Change - Apply CSS Instead of execCommand
fontName.addEventListener("change", () => {
  let selectedFont = fontName.value;
  writingArea.style.fontFamily = selectedFont; // Directly apply CSS
});

// Font Size Change
fontSizeRef.addEventListener("change", () => {
  let selectedSize = fontSizeRef.value;
  document.execCommand("fontSize", false, selectedSize);
});

// List Button Fix
listButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let command = button.id; // Get the command from button ID
    modifyText(command); // Apply the command to modify the text
  });
});

// Advanced Option Buttons
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => modifyText(button.id, false, button.value));
});

// Font Color Change
fontColorPicker.addEventListener("input", () => {
  let selectedColor = fontColorPicker.value;
  document.execCommand("foreColor", false, selectedColor);
  fontColorPicker.style.backgroundColor = selectedColor; // Update background color of input
});

// Highlight Color Change
highlightColorPicker.addEventListener("input", () => {
  let selectedColor = highlightColorPicker.value;
  document.execCommand("hiliteColor", false, selectedColor);
  highlightColorPicker.style.backgroundColor = selectedColor; // Update background color of input
});

// Link Creation
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (userLink) {
    if (!/^https?:\/\//i.test(userLink)) {
      userLink = "http://" + userLink;
    }
    modifyText("createLink", false, userLink);
  }
});

// Highlighter for Active Buttons
const highlighter = (buttons, needsRemoval) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = button.classList.contains("active");
        
        // Remove the 'active' class from all buttons except the clicked one
        highlighterRemover(buttons);
        
        // If the button wasn't already active, add the 'active' class
        if (!alreadyActive) button.classList.add("active");
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

// Remove Highlights from Buttons
const highlighterRemover = (buttons) => {
  buttons.forEach((button) => button.classList.remove("active"));
};

// Run Initializer when Page Loads
window.onload = initializer;


// end