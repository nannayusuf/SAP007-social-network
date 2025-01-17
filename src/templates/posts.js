import { userLogout, auth } from "../lib/auth-firebase.js";
import { creatPost } from "../lib/firestore-firebase.js";
import { printProfilePosts } from "../componentes/perfil.js";

export default function posts() {
  const profilePage = document.createElement("div");
  profilePage.classList.add("body-post");

  profilePage.innerHTML = `
    <img src="images/wowlogo_1.svg" class="logo">

    <input type="checkbox" id=check>
    <label for="check" class="label-user-icon"><img class="profile-user-icon-posts" src="./images/user-icon.png" alt="ícone contorno do usuário"></label>
    <nav class="menu">
      <ul class="menu-options">
        <li><a class="link-menu-post" href="#home">Feed</a></li>
        <li><a id="link-logoff" class="link-menu-post">Sair</a></li>
      </ul>
    </nav>
        
    <div id="new-post" class="section-new-post">
      <div class="new-post">
        <div id="name" class="name-user">Olá, ${auth.currentUser.displayName}</div>
        <form class="form-post">
          <input type="text" id="title-post" class="title-post" placeholder="Título do quadrinho"/>
          <textarea name="textarea" id="message" class="new-post-message" placeholder="Conte em mais de 20 caracteres sobre o quadrinho que você esta lendo"></textarea>
          <span id="error-msg" class="error-msg"></span>
          <div class="buttons-post-delete">
            <button id="post-button" class="post-button">postar</button>
            <button id="delete-button" class="delete-button">excluir</button>
          </div>  
        </form>
      </div>
    </div>

    <div class="posts-profilePage">
      <ul id="user-all-posts" class="ul-posts"></ul>
    </div>
    `;

  const message = profilePage.querySelector("#message");
  const titleHQ = profilePage.querySelector("#title-post");
  const error = profilePage.querySelector("#error-msg");

  // Validação dos campos menssagem e título antes de mandar para o firebase
  function checkNewPostFields() {
    let isValid = true;
    if (titleHQ.value === "") {
      error.textContent = "O campo título não pode estar vazio";
      isValid = false;
    }
    if (message.value === "") {
      error.textContent = "O campo título não pode estar vazio";
      isValid = false;
    } else if (message.value.length <= 20) {
      error.textContent = "Conte um pouco mais";
      isValid = false;
    }
    return isValid;
  }

  // Função para mandar os dados da nova postagem para o Clound Firestore
  const postButton = profilePage.querySelector("#post-button");
  postButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isValid = checkNewPostFields();
    if (isValid) {
      creatPost(message.value, titleHQ.value)
        .then(() => {
          printProfilePosts(profilePage);
          message.value = "";
          titleHQ.value = "";
        }).catch(() => {
          if (message.value === "") {
            error.textContent = "O campo de mensagem não pode estar vazio";
          } else if (message.value.length <= 20) {
            error.textContent = "Esse campo precisa ter mais que 20 caracteres";
          }
          if (titleHQ.value === "") {
            error.textContent = "O campo título não pode estar vazio";
          }
        });
    }
  });

  // Quando clicar no botão excluir da nova postagem, antes de enviar, o campo fique limpo
  const deleteButton = profilePage.querySelector("#delete-button");
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    titleHQ.value = "";
    message.value = "";
  });

  // apenas os posts do usuario na tela
  printProfilePosts(profilePage);

  // Função para sair da rede social
  const logOut = profilePage.querySelector("#link-logoff");
  logOut.addEventListener("click", (e) => {
    e.preventDefault();
    userLogout().then(() => {
      window.location.hash = "";
    });
  });

  return profilePage;
}
