"use strict";
let $ = document;

const skillsContainer = $.querySelector("#skills-container");
const projectsContainer = $.querySelector("#projects-container");
const menuItems = $.querySelectorAll("#menu li");
const animElem = $.querySelector(".animElem");

async function getDataUserInfoFromAPI(api) {
  if (!skillsContainer) {
    console.error("❌ #skills-container not found in the document.");
    return;
  }

  try {
    const response = await fetch(api);
    const data = await response.json();

    data.skills.forEach((item) => {
      skillsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <a class="skill-link" target="_blank" href="${item.reference}">
          <div class="max-w-160 h-85 rounded-xl shadow-md bg-gradient-to-t from-slate-800 to-slate-700 shadow-slate-800 border-1 border-slate-600 ">
            <div class="h-[70%] bg-white rounded-2xl overflow-hidden">
              <img loading="lazy" class="block sm:w-full h-full object-contain md:object-cover mx-auto" src="${
                item.src
              }" alt="">
            </div>
            <div class="px-4 text-center mt-4">
              <h5 class="font-inter text-xl text-slate-300 font-bold tracking-wider">${
                item.name
              }</h5>
              <p class="text-sm text-slate-400 mt-2">
                ${item.level && `Level: ${item.level}`}
              </p>
            </div>
          </div>
        </a>
        `
      );
    });

    data.projects.forEach((item) => {
      projectsContainer.insertAdjacentHTML(
        "beforeend",
        `
            <!--* project start -->
            <div
                class="w-1/2 pb-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 shadow-2xl shadow-blue-950 overflow-hidden">
                <div class="overflow-hidden">
                    <img src="${item.image}" loading="lazy" alt="">
                </div>
                <!--! texts -->
                <div class="flex flex-col items-center capitalize *:w-fit *:transition-colors">
                    <h5 class="text-2xl lg:text-3xl font-bold my-3 text-slate-500 hover:text-slate-600 ">
                        <a title="${item.name}" href="${
          item.site
        }" target="_blank">${item.name}</a>
                    </h5>
                    <p class="text-xl md:text-2xl text-slate-300 flex gap-2 items-center tracking-widest hover:text-slate-600">
                        <svg class="w-6 h-6 fill-current">
                            <use href="#github" />
                        </svg>
                        <a title="${"Go to " + item.git_link}"  href="${
          item?.git_link || ""
        }" target="_blank">GitHub</a>
                    </p>
                </div>
                <!-- !texts -->
            </div>
            <!--* project end -->
          `
      );
    });
  } catch (error) {
    console.error("❌ Failed to read local JSON file:", error);
  }
}

menuItems.forEach((menu) => {
  menu.addEventListener("mouseenter", (event) => {
    animElem.style.left = event.target.offsetLeft + "px";
    animElem.style.width = event.target.offsetWidth + "px";
  });
});

getDataUserInfoFromAPI("../src/data.json");
