 var login_container = document.getElementById("login_container");
        var home_container = document.getElementById("home_container");
        var email = document.getElementById("email");
        var user_email = document.getElementById("user_email");
        var password = document.getElementById("password");
        var todo_input = document.getElementById("todo_input");

        function checkIsUserLogin() {
            var email = localStorage.getItem("email");
            if (email) {
                login_container.style.display = "none";
                home_container.style.display = "block";
                user_email.innerText = email;
                showTodos();
            } else {
                login_container.style.display = "block";
                home_container.style.display = "none";
            }
        }

        checkIsUserLogin();

        function loginUser() {
            if (!email.value || !password.value) return alert("Please add all details");
            localStorage.setItem("email", email.value);
            localStorage.setItem("password", password.value);
            checkIsUserLogin();
            email.value = "";
            password.value = "";
        }

        function logout() {
            localStorage.removeItem("email");
            checkIsUserLogin();
        }

        function addTodo() {
            if (!todo_input.value.trim()) return alert("Fill all instructions");
            var email = localStorage.getItem("email");
            var obj = {
                email: email,
                todo: todo_input.value.trim()
            };
            var todos = localStorage.getItem("todos");
            if (todos) {
                todos = JSON.parse(todos);
                todos.push(obj);
                localStorage.setItem("todos", JSON.stringify(todos));
            } else {
                todos = [obj];
                localStorage.setItem("todos", JSON.stringify(todos));
            }
            showTodos();
        }

        function showTodos() {
            var todos = localStorage.getItem("todos");
            var list = document.getElementById("list");
            var email = localStorage.getItem("email");
            if (todos) {
                todos = JSON.parse(todos);
                list.innerHTML = "";
                todos.forEach(function (data) {
                    if (data.email === email) {
                        var li = document.createElement("li");
                        li.innerHTML = `${data.todo} <button class="btn1" onclick="del(this)">Delete</button>`;
                        list.appendChild(li);
                    }
                });
            }
        }

        function del(button) {
            var li = button.parentElement;
            li.parentElement.removeChild(li);
        }

        showTodos();
