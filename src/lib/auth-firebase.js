import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "./exports.js";

export const auth = getAuth();

// Cadastrar um usuário com endereço de e-mail e senha
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Cadastrar um usuário e fazer login com google
const provider = new GoogleAuthProvider();
export function registerGoogle() {
  return signInWithPopup(auth, provider);
}

// Conectar um usuário com endereço de e-mail e senha
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Função para sair da rede social
export function userLogout() {
  return signOut(auth)
    .then(() => "Logout")
    .catch((error) => error);
}

export function updateUsername(name) {
  updateProfile(auth.currentUser, {
    displayName: name,
  });
}

export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Observar o estado do usuário, se está logado ou não
export function keepUserLoggedIn(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user != null);
  });
}
