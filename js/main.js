const token = window.localStorage.getItem("token");
if (!token) {
  window.location.pathname = "./login.html";
}

const elLogOutBtn = document.querySelector(".js-log-out-btn");
elLogOutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("token");
  window.location.reload();
});


const elTodoForm = document.querySelector(".js-todo-form");
const elTodoInputText = elTodoForm.querySelector(".js-todo-text");
const elTodoList = document.querySelector(".js-todo-list");

// render function

function renderTodos(arr, node) {
  node.innerHTML = ""
  arr.forEach(item => {
    node.innerHTML += `
    <div class="todo-list-info-wrapper">
    <li class="todo-item" style="margin-block:10px" contenteditable="true">${item.todo_value}</li>
    <button class="edit-todo" type="button" data-id = ${item.id}>Edit</button>
    <button class="remove-todo" type="button" data-id = ${item.id}>Delete</button>
    </div>
    `

  });
}



// CRUD functions

async function getTodoText() {
  try {
    const respone = await fetch("http://10.40.13.28:5000/todo", {

      headers: {
        Authorization: token
      }

    }
    );
    const data = await respone.json();
    console.log(data);

    renderTodos(data, elTodoList);
  } catch (error) {
    console.log(error);
  }
}

async function postTodoText() {
  try {
    const respone = await fetch("http://10.40.13.28:5000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        text: elTodoInputText.value.trim()

      }
      )
    }
    );
    // const data = await respone.json();
    getTodoText();
  } catch (error) {
    console.log(error);
  }
}

async function editTodoText(id) {
  try {
    const newValue = prompt("Edit todo value..");
    const respone = await fetch(`http://10.40.13.28:5000/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token

      },
      body: JSON.stringify({
        text: newValue
      })
    });
    const data = await respone.json();
    console.log(data);


    getTodoText();




  } catch (error) {
    console.log(error);
  }
}

async function deleteTodoText(id) {
  try {
    const respone = await fetch(`http://10.40.13.28:5000/todo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token

      }
    });
    const data = await respone.json();
    console.log(data);


    getTodoText();




  } catch (error) {
    console.log(error);
  }
}

getTodoText();


elTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  postTodoText();

});


elTodoList.addEventListener("click", evt => {
  if (evt.target.matches(".edit-todo")) {
    const editBtnTodoId = evt.target.dataset.id;
    editTodoText(editBtnTodoId);
  }
  if (evt.target.matches(".remove-todo")) {
    const removeBtnTodoId = evt.target.dataset.id;
    deleteTodoText(removeBtnTodoId)
  }
})

