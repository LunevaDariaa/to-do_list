export class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
  }

  _addProjectSide(title) {
    const text = `<div class="projects_project"> -- ${title} </div>`;
    const ProjectContainerSide = document.querySelector(".projects_page");
    ProjectContainerSide.insertAdjacentHTML("beforeend", text);
  }

  _addProjectMain(project) {
    const text = `<div class="project">${project}</div>`;
    projectsContainer.insertAdjacentHTML("beforebegin", text);
  }
}
