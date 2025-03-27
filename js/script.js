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
                            <button onclick="editUser(${user.id}, '${user.name}', '${user.type}')" class="bg-yellow-500/80 hover:bg-yellow-500/70 text-slate-200 p-2 rounded-lg">Editar</button>
                                <button onclick="deleteUser(${user.id})" class="bg-red-500/80 hover:bg-red-500/70 text-slate-200 p-2 rounded-lg">Excluir</button>
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
   const message = await res.text();
   Swal.fire({ icon: "success", title: "Sucesso!", text: message });
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
  const confirmDelete = await Swal.fire({
   title: "Tem certeza?",
   text: "Essa ação não pode ser desfeita!",
   icon: "warning",
   showCancelButton: true,
   confirmButtonColor: "#d33",
   cancelButtonColor: "#3085d6",
   confirmButtonText: "Sim, excluir!",
   cancelButtonText: "Cancelar",
  });

  if (!confirmDelete.isConfirmed) return;

  try {
   const res = await fetch(`http://localhost:${port}/${id}`, {
    method: "DELETE",
   });
   const message = await res.text();
   Swal.fire({ icon: "success", title: "Excluído!", text: message });
   fetchUsers();
  } catch (error) {
   console.error("Erro ao excluir usuário", error);
  }
 };

 fetchUsers();
});
