import { initializeApp } from "firebase/app";
import { getFirestore,collection, getDocs, addDoc, setDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig  = {
  apiKey: "AIzaSyAmCo3zhE28dHFBCvWbZ6l0oAe-Th2w8jY",
  authDomain: "solifriends.firebaseapp.com",
  projectId: "solifriends",
  storageBucket: "solifriends.appspot.com",
  messagingSenderId: "508301161390",
  appId: "1:508301161390:web:1a78b9ce4534457adb4e3f",
  measurementId: "G-6ZSXC1KBQQ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export async function getData () {
  const querySnapshot = await getDocs(collection(db, "pessoas"));
    let pessoas = []
    querySnapshot.forEach((doc) => {
      pessoas.push(
        {
          "id":doc.id,
          "data":doc.data()
        }
      )
    });

    return pessoas;
}

export async function setData(data){
  try {
    console.log(data)
    const docRef = await addDoc(collection(db, "pessoas"), {
      cpf: data.cpf,
      endereco:data.endereco,
      necessidade:data.necessidade,
      nome:data.nome,
      np_casa:data.np_casa,
      pcd:data.pcd,
      profissao:data.profissao,
      resp_cad:data.resp_cad,
      rg:data.rg,
      situacao:data.situacao,
      telefone:data.telefone
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function editData(id, data={}){
  await updateDoc(doc(db, "pessoas", id), {
    nome: 'edit'
  });
}

export async function deleteData(id){
  console.log("id",id)
  await deleteDoc(doc(db, "pessoas", id));
}
