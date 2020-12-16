import AsyncStorage from '@react-native-async-storage/async-storage';

//done
export const fetchData = async () => {
  try {
    const value = await AsyncStorage.getItem('@idToken')
      if(value !== null) {
        const urlLink = `${environment.readAll}`
       let Items =  []
        const response = await fetch(urlLink, {
        method : 'GET',
        headers: {
          Authorization: `Bearer ${value}`,
        }
      })
      const res = await response.json()
      Items = res
      return Items
    }
  } catch (error) {
        console.log(error.response.data.error.message)
      }
      }


export const fetchEndProjectData = async () => {
  try {
    const value = await AsyncStorage.getItem('@idToken')
    if(value !== null) {
      const urlLink = `${environment.readEndProjects}`
      let endItems = []
      const response = await fetch(urlLink, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${value}`,
        }
      })
      const res = await response.json()
      endItems = res
      return endItems
    }
  }
  catch (error) {
    console.log(error.response.data.error.message)
  }
}
//test
export const fetchNoteData = async () => {
  try {
    const idToken = await AsyncStorage.getItem('@idToken')
    if(idToken !== null ) {
      const urlLink = `${environment.readAllNote}`
      let NoteItems = []
      const response = await fetch(environment.readAllNote, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      })
      const res = await response.json();
      NoteItems = res
      return NoteItems
    }
  } catch (error) {
    console.log(error.response.data.error.message)
  }
}
//done
export const fetchProjectNoteData = async (projectId) => {
  try {
    const urlLink = `${environment.readProjectNotesByProjectId}/${projectId.projectId}`;
    console.log(urlLink)
    const value = await AsyncStorage.getItem('@idToken')
    console.log(value)
      if(value !== null) {
       let Items =  []
        const response = await fetch(urlLink, {
        method : 'GET',
        headers: {
          Authorization: `Bearer ${value}`,
        }
      })
      const res = await response.json()
      Items = res
      console.log('Items', Items)
      return Items
    }
  } catch (error) {
        console.log(error.response.data.error.message)
      }
      }
  
//done
export const createData = async (name) => {
  try {
    const token = await AsyncStorage.getItem('@idToken')
      if(token !== null) {
        const urlLink = `${environment.create}`
       let Items =  []
        const response = await fetch(urlLink, {
          method: 'POST', 
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({
           name : name.name
          })   
        })
      const res = await response.json()
      Items = res
      return Items
    }
  } catch (error) {
        console.log(error.response.data.error.message)
      }
    }

  export const createNoteData = async (projectId, title, text, uid) => {
    try {
      const token = await AsyncStorage.getItem('@idToken')
        if(token !== null) {
          const urlLink = `${environment.createNote}`
         let Items =  []
          const response = await fetch(urlLink, {
            method: 'POST', 
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId : projectId.projectId,
            title: title.title,
            text: text.text,
            uid: uid.uid
          })
          })
        const res = await response.json()
        Items = res
        return Items
      }
    } catch (error) {
          console.log(error.response.data.error.message)
        }
      }


      //done
    export const updateProjectData = async (id, hours, date, worker) => {
      try {
        const token = await AsyncStorage.getItem('@idToken')
          if(token !== null) {
            const urlLink = `${environment.workinDay}/${id.id}`;
          let Items =  []
          const response = await fetch(urlLink, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
           Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          hours: hours.hours,
          date: date.date,
          worker: worker.worker
      })
      })
      const res = await response.json()
      console.log(res)
        Items = res
        console.log('Item', Items)
        return Items
   }
  } catch (error) {
    console.log(error.response.data.error.message)
  }
}
//test
    export const updateProjectNoteData = async(id, title, text) => {
      try {
        const token = await AsyncStorage.getItem('@idToken')
          if(token !== null) {
            const urlLink = `${environment.updateProjectNote}/${id.id}`
            console.log(urlLink)
            console.log(token)
            let Items =  []
             const response = await fetch(urlLink, {
            method:'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
             'Content-Type': 'application/json',
      }, 
      body : JSON.stringify({
        title: title.title,
        text: text.text
      })
      })
          const res = await response.json()
          console.log(res)
           Items = res
            console.log('Item', Items)
           return Items
    }
  } catch (error) {
    console.log(error.response.data.error.message)
  }
}
//done
    export const getDataWithId = async(id) => {
      try {
        const token = await AsyncStorage.getItem('@idToken')
          if(token !== null) {
            const urlLink = `${environment.readById}/${id.id}`
            console.log(urlLink)
            console.log(token)
          let Items =  []
          const response = await fetch(urlLink, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
           Accept: 'application/json',
          'Content-Type': 'application/json',
      },
     
      })
      const res = await response.json()
      console.log(res)
        Items = res
        console.log('Item', Items)
        return Items
   }
  } catch (error) {
    console.log(error.response.data.error.message)
  }
    }

    //??
    export const getProjectNotesDataWithId= async(id) => {
      const urlLink = `${environment.readProjectNotesById}/${id.id}`
      try {
        let Items =  []
        const response = await fetch(urlLink)
        console.log('response', response)
        const res = await response.json();
        console.log('res', res)
        Items = res
        console.log('Items', Items)
        return Items
      } catch (error) {
        console.log(error);
      }
    }
    //delete prokjectNote
    export const deleteProjectNotesData = async(id) => {
      try {
        const idToken = await AsyncStorage.getItem('@idToken')
        if(idToken !== null) {
          const urlLink = `${environment.deleteProjectNote}/${id.id}`
          console.log(urlLink)
          const res = await fetch(urlLink, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          })
          const response = await res.json()
          console.log(response)
        }
      }
      catch (error) {
        console.log(error.response.data.error.message)
      }
     
    }

    export const deleteProjectData = async(id) => {
      console.log('id', id.id)
      try {
        const idToken = await AsyncStorage.getItem('@idToken')
        if(idToken !== null) {
          const urlLink = `${environment.deleteProject}/${id.id}`
          console.log('urlink',urlLink)
          const res= await fetch(urlLink, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          })
          const response = await res.json()
          console.log(response)
        }
      }
      catch (error) {
        console.log(error.response.data.error.message)
      }
    }
    export const endProjectData = async(id) => {
      try {
        const idToken = await AsyncStorage.getItem('@idToken')
        if(idToken !== null) {
          const urlink = `${environment.endProject}/${id.id}`
          console.log(urlink)
          const res = await fetch(urlink, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          })
          const response = await res.json()
         return response
        }
      } 
      catch (error) {
        console.log(error.response.data.error.message)
      }
    }
   

    export const deleteEndProjectData = async(id) => {
      console.log('id', id.id)
      try {
        const idToken = await AsyncStorage.getItem('@idToken')
        if(idToken !== null) {
          const urlLink = `${environment.deleteEndProject}/${id.id}`
          console.log('urlink',urlLink)
          const res= await fetch(urlLink, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          })
          const response = await res.json()
          console.log(response)
        }
      }
      catch (error) {
        console.log(error.response.data.error.message)
      }
    }

export const environment = {
    create: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/create',
    readAll: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/read',
    workinDay : 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/update',
    readById: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/read',
    createNote: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/create/note',
    readAllNote: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/read/notes',
    readProjectNotesByProjectId : 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/read/notes',
    readProjectNotesById : 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/read/note',
    updateProjectNote: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/update/note',
    deleteProjectNote: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/delete',
    deleteProject: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/delete',
    endProject : 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/move',
    readEndProjects: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/read/endProjects',
    deleteEndProject: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/endProjects/delete'

    
};