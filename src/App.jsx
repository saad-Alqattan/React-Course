import { useState } from 'react';

import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from './components/ProjectsSidebar.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  console.log(projectsState)

  function handleStartAddProject() {           //this function will tergert after button  press from NoProjectSelected or from ProjectsSidebar
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,          
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {      //This will tergert after press save button in NewPROJECT 
                                                 /* onAdd({
                                                    title: enteredTitle,
                                                     description: enteredDescription,
                                                       dueDate: enteredDueDate,
    }); */
    setProjectsState((prevState) => {            
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
   
      return {
        ...prevState,
        selectedProjectId: undefined,     //selectedProjectId not the same  projectId
        projects: [...prevState.projects, newProject],

       
      };
    
      
    });
  }

  let content;

  if (projectsState.selectedProjectId === null) {   //This will be trgert to null after press button from NoProjectSelected OR  ProjectsSidebar BUTTON 
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} /> 
    );
  } else if (projectsState.selectedProjectId === undefined) { // this mean we dont have any project to show and mean undifine
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />; //NoProjectSelected will show imge becuse no project 
                                 // onStartAddProject Button tregert from  NoProjectSelected

  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}    //ADDED PROJECT FROM STATE ABOVE AND FORWARD TO PROJECT SIDE BAR 
      />
      {content}
    </main>
  );
}

export default App;
