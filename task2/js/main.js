document.querySelector("html").style.scrollBehavior = "smooth";
bookHeads = ["name", "image", "description", "price", "auth"];
// array to store inputs parent elements to use this later to remove error childs of this parent
inputsParent = [];
newEl = true;
contentWraper = document.querySelector("#contentWrap");
// retrive data from local storage
const getBooks = () => {
  books = localStorage.getItem("books") || "[]";
  return JSON.parse(books);
};
// store data in local storage
const setBooks = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};
// function for create custom html element
let newElement = (tag, body, classes, attributes, parent) => {
  element = document.createElement(tag);
  if (body != "") element.innerText = body;
  if (classes != "") element.className = classes;
  attributes.forEach((attr) => {
    element.setAttribute(attr.name, attr.value);
  });
  parent.appendChild(element);
  return element;
};
// function for create custom html input
let newInput = (label, placeHolder, type, name, id, colSize, parent) => {
  inputColDiv = newElement(
    "div",
    "",
    `col-${colSize ? colSize : 12}`,
    [{ name: "id", value: `${name}Div` }],
    parent,
  );
  if (label != "") {
    newElement(
      "label",
      label,
      "form-label",
      [{ name: "for", value: id }],
      inputColDiv,
    );
  }
  newElement(
    "input",
    "",
    "form-control",
    [
      { name: "type", value: type },
      { name: "name", value: name },
      { name: "id", value: id },
      { name: "placeholder", value: placeHolder },
    ],
    inputColDiv,
  );
  inputsParent.push(`${name}Div`);
};
// function for create custom error
let err = (msg, parent) => {
  let errBody = newElement(
    "div",
    "",
    "alert alert-danger d-flex align-items-center m-2",
    [{ name: "role", value: "alert" }],
    parent,
  );
  newElement("div", msg, "", [], errBody);
};
// create hide/show button
toggleBtn = newElement(
  "button",
  "show ",
  "btn btn-primary mt-2",
  [{ name: "id", value: "top" }],
  contentWraper,
);
hr = newElement("hr", "", "m-2", [], contentWraper);
// create form
formContainer = newElement(
  "form",
  "",
  "row border rounded border-primary m-2 w-100 d-none animate__animated animate__fadeOutUp",
  [],
  contentWraper,
);
// create input for name
nameInput = newInput(
  "book name",
  "enter book name",
  "text",
  "name",
  "nameInput",
  6,
  formContainer,
);
// create input for image url
imgInput = newInput(
  "book image",
  "add image url",
  "text",
  "image",
  "imageInput",
  6,
  formContainer,
);
// create input for description
descriptionInput = newInput(
  "description",
  "descripe your book",
  "text",
  "description",
  "descriptionInput",
  8,
  formContainer,
);
// create input for price
priceInput = newInput(
  "price",
  "",
  "number",
  "price",
  "priceInput",
  4,
  formContainer,
);
// create input for author
authInput = newInput(
  "auther name",
  "who is the auther",
  "text",
  "auth",
  "authInput",
  "",
  formContainer,
);
// create submit button
submtBtnDiv = newElement("div", "", "col-12", [], formContainer);
submtBtn = newElement(
  "input",
  "submit",
  "btn btn-primary my-2",
  [{ name: "type", value: "submit" }],
  submtBtnDiv,
);
// data wraper is the place to show user inputs
dataWraper = newElement("div", "", "row m-2", [], contentWraper);
// hide/show button event listener
toggleBtn.addEventListener("click", () => {
  if (formContainer.classList.contains("d-none")) {
    formContainer.classList.remove("animate__fadeOutUp");
    formContainer.classList.remove("d-none");
    formContainer.classList.add("animate__fadeInDown");
    toggleBtn.innerText = "hide";
  } else {
    formContainer.classList.remove("animate__fadeInDown");
    formContainer.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      formContainer.classList.add("d-none");
      toggleBtn.innerText = "show";
      if (submtBtn.value == "save edits") {
        newEl = true;
        formContainer.reset();
        removeAlerts(inputsParent);
        cancelBtn.remove();
        submtBtn.value = "submit";
        submtBtn.classList.remove("btn-success");
        submtBtn.classList.add("btn-primary");
      }
    }, 500);
  }
});
formContainer.addEventListener("submit", function (e) {
  let noErr = true;
  let book = { id: new Date().getTime() };
  e.preventDefault();
  removeAlerts(inputsParent);
  bookHeads.forEach((bhead) => {
    book[bhead] = this.elements[bhead].value;
  });

  if (!book.name) {
    noErr = false;
    err("please add name", nameDiv);
  }
  if (!book.image) {
    noErr = false;
    err("please add image url", imageDiv);
  }
  if (!book.description) {
    noErr = false;
    err("please add description", descriptionDiv);
  }
  if (!book.price) {
    noErr = false;
    err("please add price", priceDiv);
  }
  if (!book.auth) {
    noErr = false;
    err("please add auth", authDiv);
  }
  if (noErr) {
    //if the newEl == true user submit new book ,else user edit book
    if (newEl) {
      books = getBooks();
      books.push(book);
      setBooks(books);
    } else {
      books = getBooks();
      bookHeads.forEach((bhead) => {
        //when user click edit button the value of book index stored ad editElmntIndex variable then i use it later to retreive book from array
        books[editElmntIndex][bhead] = this.elements[bhead].value;
      });
      setBooks(books);
    }
    this.reset();
    displayBooks();
    cancelBtn.click();
  }
});
// display all books in the array
displayBooks = () => {
  dataWraper.innerText = "";
  books = getBooks();
  books.forEach((book) => {
    col4Div = newElement("div", "", "col-4 my-2", [], dataWraper);
    card = newElement("div", "", "card border-primary", [], col4Div);
    cardImg = newElement(
      "img",
      "",
      "card-img-top",
      [
        {
          name: "src",
          value: book.image,
        },
      ],
      card,
    );
    cardbody = newElement("div", "", "card-body", [], card);
    title = newElement("h5", book.name, "card-title", [], cardbody);
    text = newElement("p", book.description, "card-text", [], cardbody);
    price = newElement("p", `price:${book.price}$`, "card-text", [], cardbody);
    text2 = newElement("p", "", "card-text", [], cardbody);
    auth = newElement("small", `author:${book.auth}`, "text-muted", [], text2);
    edtBtn = newElement("button", "edit", "btn btn-warning mx-1", [], cardbody);
    delBtn = newElement("button", "delete", "btn btn-danger", [], cardbody);
    delBtn.addEventListener("click", function (e) {
      deleteElement(book);
    });
    edtBtn.addEventListener("click", function (e) {
      editElement(book);
    });
  });
};
// clear error alerts after submit
removeAlerts = (parents) => {
  parents.forEach((parent) => {
    nodes = document.getElementById(parent).childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].classList.contains("alert")) {
        nodes[i].remove();
      }
    }
  });
};
deleteElement = (Element) => {
  i = books.findIndex((b) => b.name == Element.name);
  books.splice(i, 1);
  setBooks(books);
  displayBooks();
};
editElement = (Element) => {
  newEl = false;
  location.href = "#top";
  removeAlerts(inputsParent);
  formContainer.classList.remove("animate__fadeOutUp");
  formContainer.classList.remove("d-none");
  formContainer.classList.add("animate__fadeInDown");
  toggleBtn.innerText = "hide";
  submtBtn.classList.remove("btn-primary");
  submtBtn.classList.add("btn-success");
  //   set form inputs values
  bookHeads.forEach((bhead) => {
    formContainer.elements[bhead].value = Element[bhead];
  });
  editElmntIndex = books.findIndex((b) => b.name == Element.name);
  if (submtBtn.value != "save edits") {
    submtBtn.value = "save edits";
    cancelBtn = newElement(
      "button",
      "cancel",
      "btn btn-warning mx-1",
      [],
      submtBtnDiv,
    );
  }
  cancelBtn.addEventListener("click", () => {
    newEl = true;
    cancelBtn.remove();
    submtBtn.value = "submit";
    submtBtn.classList.add("btn-primary");
    submtBtn.classList.remove("btn-success");
    formContainer.classList.remove("animate__fadeInDown");
    formContainer.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      formContainer.reset();
      formContainer.classList.add("d-none");
      toggleBtn.innerText = "show";
    }, 500);
  });
};
displayBooks();
