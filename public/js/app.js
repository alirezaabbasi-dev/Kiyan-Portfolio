"use strict";
let $ = document;

const skillsContainer = $.querySelector("#skills-container");
const projectsContainer = $.querySelector("#projects-container");
const menuItems = $.querySelectorAll("#menu li");
const animElem = $.querySelector(".animElem");
const swiperWrapper = $.querySelector(".swiper-wrapper");

const sectionIDs = ["skills", "projects", "about"];
let sectionOffsets = [];
let currentIndex = -1;

function getOffsetTop(id) {
  const elem = $.getElementById(id);
  return elem ? elem.offsetTop : 0;
}

function handleScroll() {
  for (let i = sectionOffsets.length - 1; i >= 0; i--) {
    if (scrollY >= sectionOffsets[i] - 100) {
      if (currentIndex !== i) {
        currentIndex = i;
        animElem.style.left = menuItems[i].offsetLeft + "px";
        animElem.style.width = menuItems[i].offsetWidth + "px";
      }
      break;
    }
  }
}

async function getDataUserInfoFromAPI(api) {
  if (!skillsContainer) {
    console.error("❌ #skills-container not found in the document.");
    return;
  }

  try {
    const response = await fetch(api);
    const data = await response.json();

    // Skills
    data.skills.forEach((item) => {
      skillsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <a class="skill-link transition-all ease-linear duration-200 delay-100 hover:opacity-80" target="_blank" href="${
          item.reference
        }" title="Go to the ${item.name} Documentation">
          <div class="max-w-160 h-85 rounded-xl shadow-lg bg-gradient-to-t from-zinc-950 to-zinc-900 shadow-zinc-900">
            <div class="h-[70%] bg-zinc-900 rounded-2xl overflow-hidden p-10">
              <img loading="lazy" class="block  sm:w-full h-full object-contain  mx-auto" src="${
                item.src
              }" alt=${item.name + " " + item.level}>
            </div>
            <div class="px-4 text-center mt-4">
              <h5 class="font-inter text-xl text-zinc-300 font-bold tracking-wider">${
                item.name
              }</h5>
              <p class="text-sm text-zinc-400 mt-2">
                ${item.level ? `Level: ${item.level}` : ""}
              </p>
            </div>
          </div>
        </a>
        `,
      );
    });

    // Projects
    data.projects.forEach((item) => {
      projectsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="w-1/2 pb-8 rounded-2xl bg-black border-4 border-zinc-300 shadow-xl shadow-yellow-950 overflow-hidden">
          <div class="overflow-hidden">
            <img src="${item.image}" loading="lazy" alt="">
          </div>
          <div class="flex flex-col items-center capitalize *:w-fit *:transition-colors">
            <h5 class="text-2xl lg:text-3xl font-bold my-5 text-zinc-500 hover:text-zinc-600">
              <a title="${item.name}" href="${item.site}" target="_blank">${
                item.name
              }</a>
            </h5>
            <div class="flex gap-2">
              <p class="bg-zinc-400 rounded-xl text-lg md:text-xl text-black flex gap-2 p-1 items-center tracking-widest cursor-pointer hover:text-zinc-800">
                <svg class="w-6 h-6 fill-current">
                <use href="#arrow-top-right-on-square" />
                </svg>
                <a title="Go to ${item.site}" href="${
                  item.site || "#"
                }" target="_blank">Live Preview</a>
              </p>
              <p class="bg-zinc-400 rounded-xl text-lg md:text-xl text-black flex gap-2 p-1 items-center tracking-widest cursor-pointer hover:text-zinc-800">
                <svg class="w-6 h-6 fill-current">
                  <use href="#code-bracket" />
                </svg>
                <a title="Go to ${item.git_link}" href="${
                  item.git_link || "#"
                }" target="_blank">Source</a>
              </p>
            </div>
          </div>
        </div>
        `,
      );
    });

    data.sub_skills.forEach((item) => {
      console.log(data);
      swiperWrapper.insertAdjacentHTML(
        "beforeend",
        `
        <div class="size-50 object-contain bg-slate-600 flex items-center justify-center p-10 rounded-2xl"><img src="${item.img}" alt="${item.name}"/></div>
          `,
      );
    });

    sectionOffsets = sectionIDs.map(getOffsetTop);
    handleScroll();
  } catch (error) {
    console.error("❌ Failed to fetch JSON data:", error);
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", () => {
  sectionOffsets = sectionIDs.map(getOffsetTop);
  handleScroll();
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    handleScroll();
  });
});

getDataUserInfoFromAPI("../src/data.json");
