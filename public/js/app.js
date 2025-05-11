let $ = document;

const skillsContainer = $.querySelector("#skills-container");

async function getDataUserInfoFromAPI(api) {
  if (!skillsContainer) {
    console.error("❌ #skills-container not found in the document.");
    return;
  }

  try {
    const response = await fetch(api);
    const data = await response.json();

    const titleElem = document.createElement("h4");
    titleElem.innerHTML = "Skills";
    skillsContainer.insertAdjacentElement("beforebegin", titleElem);

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
  } catch (error) {
    console.error("❌ Failed to read local JSON file:", error);
  }
}

getDataUserInfoFromAPI("../src/data.json");
