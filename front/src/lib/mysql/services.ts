
import api from './api';


export async function signInAccount(user: {email:string; password:string}){
      
    try {

    console.log(user);    
    const session = await api.post("/api/auth/login",user);

    if(!session) throw Error;
    localStorage.setItem("cookieFallback", JSON.stringify(session.data.id));
    return session;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getCurrentUser() {
    try {
    //   const currentAccount = await account.get();
    //   console.log(currentAccount);
    //   if(!currentAccount) throw Error;
      const userId = localStorage.getItem('cookieFallback');
      if (typeof userId === 'string') {
      const currentUser = await api.get(`/api/user/${userId}`);
      
         if(!currentUser) throw Error;
         return currentUser.data;
      }
    } catch (error) {
      console.log(error);
      
    }
    
  };

  export async function signOutAccount(){

    try {
        localStorage.removeItem("cookieFallback");
        const session = await api.get("/api/auth/logout");

         return session;
  
  } catch (error) {
    console.error(error);
    throw error;
  }
  };


  //  Cursos - Util
  export async function getCourses() {

    try {
      const response = await api.get('/api/util/lista/10/1');
    //  console.log(response.data.data[0])
      return response.data.data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

    //  Cursos - Prestamos
    export async function getCoursesPrestamos(pOperacion: number,pIdCourse: number) {

        try {
          const response = await api.get(`/api/prestamo/getcourseprestamo/${pOperacion}/${pIdCourse}`);
     //     console.log(response.data)
          return response.data ;
        } catch (error) {
         return [];
        }
      }

      //  Books - Util
  export async function getBooks( findtitle : string ) {

    try {
      let response = null;
      if (findtitle === "") {
       response = await api.get('/api/util/lista/11/1');}
      else{
         response = await api.get(`/api/util/lista/libros?search=${findtitle}`);
      }
     console.log(response.data.data[0])
      return response.data.data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

