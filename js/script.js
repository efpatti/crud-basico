document.addEventListener("DOMContentLoaded", () => {
 const port = 8080;
 const userForm = document.getElementById("user-form");
 const userList = document.getElementById("user-list");
 const userIdField = document.getElementById("user-id");

 const fetchUsers = async () => {
  try {
   const res = await fetch(`http://localhost:${port}/`);
   const users = await res.json();
   userList.innerHTML = users
    .map(
     (user) => `
                     <tr class="border-b hover:bg-gray-50">
                         <td class="py-4 px-6">${user.name}</td>
                         <td class="py-4 px-6">${user.type}</td>
                         <td class="py-4 px-6 text-center space-x-2">
                         <button onclick="editUser(${user.id})" class="text-red-500 hover:text-yellow-700">Editar</button>
                             <button onclick="deleteUser(${user.id})" class="text-red-500 hover:text-red-700">Excluir</button>
                         </td>
                     </tr>
                 `
    )
    .join("");
  } catch (error) {
   console.error("Erro ao carregar usuários", error);
  }
 };

 userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const userId = userIdField.value;
  const method = userId ? "PUT" : "POST";
  const url = userId
   ? `http://localhost:${port}/${userId}`
   : `http://localhost:${port}`;
  try {
   const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type }),
   });
   alert(await res.text());
   userForm.reset();
   userIdField.value = "";
   fetchUsers();
  } catch (error) {
   console.error("Erro ao salvar usuário", error);
  }
 });

 window.editUser = (id, name, type) => {
  document.getElementById("name").value = name;
  document.getElementById("type").value = type;
  userIdField.value = id;
 };

 window.deleteUser = async (id) => {
  if (!confirm("Tem certeza que deseja excluir?")) return;
  try {
   const res = await fetch(`http://localhost:${port}/${id}`, {
    method: "DELETE",
   });
   alert(await res.text());
   fetchUsers();
  } catch (error) {
   console.error("Erro ao excluir usuário", error);
  }
 };

 fetchUsers();
});
