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
        <div class="max-w-75 h-85  bg-slate-600 rounded-xl shadow-md shadow-slate-700">
            <div class="h-[70%] bg-white rounded-2xl overflow-hidden">
                <img loading="lazy" class="block w-full h-full object-cover text-center" src="${
                  item.src
                }" alt="">
            </div>
            <div class="px-4 text-center" >
                <h5 class="">${item.name}</h5>
                <p id="paragraph">${
                  item.level ? "level : " + item.level : ""
                }</p>

            </div>
        </div>
        <!-- item end -->

         `
      );
    });
  });
