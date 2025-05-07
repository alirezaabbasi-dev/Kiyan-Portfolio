let $ = document;

const skillsContainer = $.querySelector("#skills-container");

let getDataFromAPI = fetch("../src/data.json")
  .then((result) => {
    return result.json();
  })
  .then((data) => {
    let titleElem = $.createElement("h4");
    titleElem.innerHTML = data.skills;
    data.skills.forEach((item) => {
      console.log(item);

      skillsContainer.insertAdjacentHTML(
        "beforeend",

        `
        <!-- item start -->
        <div class="max-w-160 h-85 rounded-xl shadow-md bg-gradient-to-t from-slate-800 to-slate-700 shadow-slate-800 border-1 border-slate-600 ">
            <div class="h-[70%] bg-white rounded-2xl overflow-hidden">
                <img loading="lazy" class="block sm:w-full h-full object-contain md:object-cover  mx-auto" src="${
                  item.src
                }" alt="">
            </div>
            <div class="px-4 text-center mt-4" >
                <h5 class="font-inter text-xl text-slate-300 font-bold tracking-wider">${
                  item.name
                }</h5>
                <p id="paragraph" class="text-sm text-slate-400 mt-2">${
                  item.level ? "Level : " + item.level : ""
                }</p>

            </div>
        </div>
        <!-- item end -->

         `
      );
    });
  });
