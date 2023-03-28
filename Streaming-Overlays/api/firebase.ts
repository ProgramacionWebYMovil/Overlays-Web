import { initializeApp } from 'firebase/app';
import { getDatabase , ref , child , get } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAsuH7-qkHfQ6URnLkaFJaA74zVtIY3JKE",
  authDomain: "streamingoverlays-3f50d.firebaseapp.com",
  databaseURL: "https://streamingoverlays-3f50d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "streamingoverlays-3f50d",
  storageBucket: "streamingoverlays-3f50d.appspot.com",
  messagingSenderId: "41682838097",
  appId: "1:41682838097:web:779a9ea11636d896e24e70",
  measurementId: "G-CV3M01YLZG"
};

const app = initializeApp(firebaseConfig);
const database =getDatabase(app)

const dbRef = ref(database);
const valor = get(child(dbRef,'header')).then((snapshot) => {
  if(snapshot.exists())console.log(snapshot.val());
  else console.log("no data");


}).catch((error) => {
  console.log(error);

});
export function llamada(){
  valor;
}


