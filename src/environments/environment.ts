export const fetchData = async () => {
    try {
      let Items =  []
      const response = await fetch(environment.readAll)
      const res = await response.json();
      Items = res
      return Items
      }
       catch (error) {
        console.log(error);
      }
}

export const fetchNoteData = async () => {
  try {
    let NoteItems = []
    const response = await fetch(environment.readAllNote)
    const res = await response.json();
    NoteItems = res
    return NoteItems
  } catch( error) {
    console.log(error);
  }
}
export const fetchProjectNoteData = async (projectId) => {
  const urlLink = `${environment.readProjectNotesByProjectId}/${projectId.projectId}`;
  try {
    let NoteItems =  []
    const response = await fetch(urlLink)
    console.log('response', response)
    const res = await response.json();
    console.log('res', res)
    NoteItems = res
    return NoteItems
    }
     catch (error) {
      console.log(error);
    }
}

export const createData = async (name) => {
  try {
    const res = await fetch( environment.create, {
      method: 'POST', 
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
       name : name.name
      })   
    })
  } catch(error) {
    console.log(error)
  }}
  export const createNoteData = async (projectId, title, text) => {
    try {
      const res = await fetch(environment.createNote, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId : projectId.projectId,
        title: title.title,
        text: text.text  
      })
      })
    }catch(error) {
      console.log(error)
    }}


  
    export const updateProjectData = async (id, hours, date) => {
      const urlLink = `${environment.workinDay}/${id.id}`;
      const res =  await fetch(urlLink, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          hours: hours.hours,
          date: date.date
      })
      
      })
    } 
    export const updateProjectNoteData = async(id, title, text) => {
      const urlLink = `${environment.updateProjectNote}/${id.id}`
      const res = await fetch(urlLink, {
        method:'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }, 
      body : JSON.stringify({
        title: title.title,
        text: text.text
      })

      })
    }
    export const getDataWithId = async(id) => {
      const urlLink = `${environment.readById}/${id.id}`
      try {
        let Items =  []
        const response = await fetch(urlLink)
        console.log('resposne',response)
        const res = await response.json();
        console.log('res', res)
        Items = res
        return Items
        }
         catch (error) {
          console.log(error);
        }
    }
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

export const environment = {
    create: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/create',
    readAll: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/read',
    workinDay : 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/update',
    readById: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/project/api/read',
    createNote: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/create/note',
    readAllNote: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/read/notes',
    readProjectNotesByProjectId : 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/read/notes',
    readProjectNotesById : 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/read/note',
    updateProjectNote: 'https://us-central1-dpopt-a5acd.cloudfunctions.net/projectNote/api/update/note'

    
};