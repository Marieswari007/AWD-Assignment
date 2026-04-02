interface Job {
  id: number;
  title: string;
  company: string;
  salary: string;
  location: string;
  role: string;
}

const jobs: Job[] = [
  { id: 1, title: "Frontend Dev", company: "Google", salary: "10 LPA", location: "Bangalore", role: "Frontend" },
  { id: 2, title: "Backend Dev", company: "Amazon", salary: "12 LPA", location: "Hyderabad", role: "Backend" },
  { id: 3, title: "UI Designer", company: "Microsoft", salary: "9 LPA", location: "Chennai", role: "Frontend" },
  { id: 4, title: "Full Stack Dev", company: "Infosys", salary: "8 LPA", location: "Pune", role: "Backend" },

  { id: 5, title: "React Developer", company: "Google", salary: "11 LPA", location: "Mumbai", role: "Frontend" },
  { id: 6, title: "Node.js Developer", company: "Amazon", salary: "13 LPA", location: "Delhi", role: "Backend" },
  { id: 7, title: "UX Designer", company: "Microsoft", salary: "10 LPA", location: "Coimbatore", role: "Frontend" },
  { id: 8, title: "Software Engineer", company: "Infosys", salary: "7 LPA", location: "Noida", role: "Backend" },
  { id: 9, title: "Angular Developer", company: "Google", salary: "10 LPA", location: "Trichy", role: "Frontend" },
  { id: 10, title: "Java Developer", company: "Amazon", salary: "12 LPA", location: "Chennai", role: "Backend" }
];

let savedJobs: Job[] = [];

const jobList = document.getElementById("jobList") as HTMLElement;
const savedJobsDiv = document.getElementById("savedJobs") as HTMLElement;


function getLogo(company: string): string {
  switch (company) {
    case "Google":
      return "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg";
    case "Amazon":
      return "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg";
    case "Microsoft":
      return "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg";
    case "Infosys":
      return "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg";
    default:
      return "https://via.placeholder.com/50";
  }
}


function renderJobs(data: Job[], container: HTMLElement, isSaved: boolean = false) {
  container.innerHTML = "";

  data.forEach(job => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img class="logo" src="${getLogo(job.company)}" alt="${job.company}" />
      <h3>${job.title}</h3>
      <p><b>${job.company}</b></p>
      <p>${job.salary}</p>
      <p>${job.location}</p>
      ${
        isSaved
          ? `<button class="remove-btn" onclick="removeJob(${job.id})">Remove</button>`
          : `<button onclick="saveJob(${job.id})">Save</button>`
      }
    `;

    container.appendChild(card);
  });
}


function saveJob(id: number) {
  const job = jobs.find(j => j.id === id);
  if (job && !savedJobs.some(j => j.id === id)) {
    savedJobs.push(job);
    renderJobs(savedJobs, savedJobsDiv, true);
  }
}


function removeJob(id: number) {
  savedJobs = savedJobs.filter(job => job.id !== id);
  renderJobs(savedJobs, savedJobsDiv, true);
}


function applyFilters() {
  const search = (document.getElementById("search") as HTMLInputElement).value.toLowerCase();
  const company = (document.getElementById("companyFilter") as HTMLSelectElement).value;
  const role = (document.getElementById("roleFilter") as HTMLSelectElement).value;

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search) &&
    (company === "" || job.company === company) &&
    (role === "" || job.role === role)
  );

  renderJobs(filtered, jobList);
}


(document.getElementById("search") as HTMLInputElement).addEventListener("input", applyFilters);
(document.getElementById("companyFilter") as HTMLSelectElement).addEventListener("change", applyFilters);
(document.getElementById("roleFilter") as HTMLSelectElement).addEventListener("change", applyFilters);

renderJobs(jobs, jobList);
