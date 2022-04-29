import { getPosts } from "../lib/firestore-firebase.js"


// Mostrar todos os posts
export const mostrarPosts = (dataPost, user,idPost) => {
  const mostraPosts = document.createElement('div');
  mostraPosts.classList.add('painelPost');

  mostraPosts.innerHTML = `
  <div class="usuarioPost" id= "${idPost}">
      <div class="infoUsuarioPost">
          <div class="nomeUsuarioPost"><p>${user.username}</p></div>
      </div>
  </div>
  </div>
  <div class=""> 
    <i class="like" name= "${idPost}"}></i>
    <p>${dataPost.likes.length}</p>
    <i class="ph-chat-centered-dots comment" name= "${idPost}"}></i>
    <p>${dataPost.likes.length}</p>   
  </div>
  `;

  return mostraPosts;
};

/* export default function home() {
    const homePage = document.createElement("div");
    homePage.classList.add("profile-user")
  
    homePage.innerHTML = `
      <body class="home-page">
        <section class="section-search-icon-user">
          <input type="search" id="search-field" class="search-field" placeholder="Buscar">
          <button id="button-search" class="button-search">Buscar</button>
        </section>
        <button id="button-user" class="button-user"><img src="./images/user-icon.png" class="profile-user" alt="ícone contorno do usuário"></button>
      </body>
    `;

  getPosts()

    return homePage
  
  }

  const userPosts = container.querySelector('.feed');


  const showAllPosts = async () => {
    const allPosts = await getPost();
    allPosts.forEach((item) => {
      const postElement = card(item);
      userPosts.prepend(postElement);
    });
  };
  showAllPosts(); */