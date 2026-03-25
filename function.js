
// //Card Loader
let borderColor;
let src;
let priorityBgColor;
let priorityTxtColor;
let openArr = [];

function loading(status){
  if(status==true){
      document.getElementById("loading").classList.remove("hidden")
      document.getElementById("classContainer").classList.add("hidden")
  }
  else{
     document.getElementById("loading").classList.add("hidden")
      document.getElementById("classContainer").classList.remove("hidden")
  }

}
const cardLoader = () => {
  loading(true)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((json) => displayCards(json.data));
};

const displayCards = (cards) => {
  
  const issueNum = document.querySelector(".issueNumber");
  issueNum.innerHTML = "";
  const issueNumDiv = document.createElement("div");
  issueNumDiv.innerHTML = `
        <p class="issue-Num font-bold">${cards.length} Issues</p>
        <p class="text-[#64748B]">Track and manage your project issues</p>
    `;
  issueNum.append(issueNumDiv);

  const cardContainer = document.getElementById("classContainer");
  cardContainer.innerHTML = ``;

  for (let card of cards) {
    const cardDiv = document.createElement("div");

    // Condition for top border color
    if (card.status === "open") {
      borderColor = "#00A96E";
      src = "./assets/Open-Status.png";
    } else {
      borderColor = "#A855F7";
      src = "./assets/Closed- Status .png";
    }

    // Condition for priority color
    if (card.priority === "high") {
      priorityBgColor = "#FAD4D4";
      priorityTxtColor = "#B31313";
    } else if (card.priority === "medium") {
      priorityBgColor = "#FFF6D1";
      priorityTxtColor = "#F59E0B";
    } else {
      priorityBgColor = "#EEEFF2";
      priorityTxtColor = "#9CA3AF";
    }

    cardDiv.innerHTML = `
             <p class="${card.id}"></p>
            <div class="card bg-base-100 p-4 h-11/12 text-base shadow-sm border-[${borderColor}] border-t-6 flex flex-col justify-center">
                <div class="top-status p-1 flex justify-between">
                    <img src="${src}" alt="Open-status" class="status-icon" />
                    <div class="priority border px-4 bg-[${priorityBgColor}] text-[${priorityTxtColor}] text-center rounded-xl">
                        ${card.priority}
                    </div>
                </div>
                <div class="desc-label m-3 space-y-3">
                    <div class="problem-descBox">
                        <p class="problem-title font-bold text-lg">${card.title}</p>
                        <p class="problem-desc font-light">${card.description}</p>
                    </div>
                    <div class="labels flex flex-col gap-2 md:flex-row justify-between"></div> <!-- Labels will go here -->
                </div>
                <hr />
                <div class="identity&date p-3">
                    <p class="author-name">${card.author}</p>
                    <p class="issue-date">${card.createdAt}</p>
                </div>
            </div>
        `;

    cardContainer.append(cardDiv);

    // add labels to the card
    const cardLabelsContainer = cardDiv.querySelector(".labels");
    addLabels(cardLabelsContainer, card.labels);
    //  open modal
    const event = cardDiv.querySelector(".card");
    event.addEventListener("click", function () {
      my_modal_1.showModal();

      const modalContainer = document.querySelector(".modal-box");
      modalContainer.innerHTML = "";
      //card status
      if (card.status === "open") {
        borderColor = "#00A96E";
      } else {
        borderColor = "#A855F7";
      }
      //priority status
      if (card.priority === "high") {
        priorityBgColor = "#EF4444";
      } else if (card.priority === "medium") {
        priorityBgColor = "#F59E0B";
      } else {
        priorityBgColor = "#9CA3AF";
      }
      const modalDiv = document.createElement("div");
      modalDiv.innerHTML = `
                <h3 class="text-lg font-bold">${card.title}</h3>
                <div class="status-div flex items-center gap-2 py-2">
                    <div class="status w-2/12 p-3 bg-[${borderColor}] text-[white] rounded-xl flex justify-center items-center">
                        <p class="text-xs font-bold">${card.status}</p>
                    </div>
                    <div class="p-1 h-1 rounded-full bg-slate-300"></div>
                    <p>Opened by ${card.assignee.length === 0 ? (card.assignee = "Not Found") : card.assignee}</p>
                    <div class="p-1 h-1 rounded-full bg-slate-300"></div>
                    <p>${card.updatedAt}</p>
                </div>
                <div class="labels w-9/12 my-2 flex flex-col items-start md:flex-row gap-4 items-center"></div> 
                <div class="my-2 font-thin">
                    <p>${card.description}</p>
                </div>
                <div class="p-2 rounded-lg text-xs flex justify-around bg-[#F8FAFC]">
                    <div class="flex flex-col justify-between">
                        <p class="text-base font-medium text-[#64748B]">Assignee:</p>
                        <p class="text-base font-semibold">${card.assignee}</p>
                    </div>
                    <div class="flex flex-col justify-between w-3/12">
                        <p class="text-base font-medium text-[#64748B]">Priority:</p>
                        <div class=" px-2 py-1 bg-[${priorityBgColor}] rounded-xl flex justify-center items-center">
                            <p class="font-bold text-center text-[white]">${card.priority}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn bg-[#4A00FF] text-[white]">Close</button>
                    </form>
                </div>
            `;

      modalContainer.appendChild(modalDiv);

      // add labels to the modal
      const modalLabelsContainer = modalDiv.querySelector(".labels");
      addLabels(modalLabelsContainer, card.labels);
    });
  }
  loading(false)
};

function addLabels(container, labelsArray) {
  container.innerHTML = "";

  for (let labelName of labelsArray) {
    let labelBgColor, labelTxtColor, labelIcon;

    const lbl = labelName.trim().toLowerCase();

    if (lbl === "bug") {
      labelBgColor = "#FAD4D4";
      labelTxtColor = "#B31313";
      labelIcon = `<i class="fa-solid fa-bug"></i>`;
    } else if (lbl === "help wanted") {
      labelBgColor = "#FFF8DB";
      labelTxtColor = "#CA8A04";
      labelIcon = `<i class="fa-solid fa-handshake-angle"></i>`;
    } else {
      labelBgColor = "#DEFCE8";
      labelTxtColor = "#16A34A";
      labelIcon = `<i class="fa-solid fa-tag"></i>`;
    }

    const labelDiv = document.createElement("div");
    labelDiv.innerHTML = `
            <div class="type-label border px-3 w-[100%] bg-[${labelBgColor}] text-[${labelTxtColor}] text-sm rounded-xl flex gap-1 items-center justify-center">
                ${labelIcon} ${labelName}
            </div>
        `;

    container.appendChild(labelDiv);
  }
}

cardLoader();
//search function

document.getElementById("btn-search").addEventListener("click", function () {
  const input = document.getElementById("search-box");
  const search = input.value.trim().toLowerCase();
  loading(true)
  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${search}`,
  )
    .then((response) => response.json())
    .then((json) => searchItems(json.data));

  const searchItems = (items) => {
    console.log(items);
    for (let item of items) {
      const cards = document.querySelectorAll(".card");
      for (let card of cards) {
        card.classList.remove("hidden");
      }
      if (item.title.trim().toLowerCase().includes(search)) {
        displayCards(items);
      }
    }
  };
  console.log(searchItems);
});

document.getElementById("btnOpen").addEventListener("click", function () {
  toggling("btnOpen");
  openArr = [];
  const cards = document.querySelectorAll(".card");
  // all card hidden
  for (let card of cards) {
    card.classList.add("hidden");
  }
  loading(true)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((json) => displayOpenCards(json.data));
  const displayOpenCards = (Cards) => {
    for (let Card of Cards) {
      if (Card.status === "open") {
        openArr.push(Card);
      }
    }

    displayCards(openArr);
  };
});

document.getElementById("btnClosed").addEventListener("click", function () {
  openArr = [];
  toggling("btnClosed");
  const cards = document.querySelectorAll(".card");
  // all card hidden
  for (let card of cards) {
    card.classList.add("hidden");
  }
  loading(true)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((json) => displayClosedCards(json.data));
  const displayClosedCards = (Cards) => {
    for (let Card of Cards) {
      if (Card.status === "closed") {
        openArr.push(Card);
      }
    }

    displayCards(openArr);
  };
});

document.getElementById("btnAll").addEventListener("click", function () {
  toggling("btnAll");
  loading(true)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((json) => displayClosedCards(json.data));
  const displayClosedCards = (Cards) => {
    displayCards(Cards);
  };
});

function toggling(id) {
  
  const buttons = document.querySelectorAll(".btnA");

  buttons.forEach((button) => {
    button.classList.remove("btn-primary");
    button.classList.remove("btn-outline");

    button.classList.remove("btn-outline");
    button.classList.remove("bg-[#4a00ff]");
    button.classList.remove("text-[white]");
  });
  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.add("btn-primary");
  selectedBtn.classList.add("btn-outline");
  selectedBtn.classList.add("bg-[#4a00ff]");
  selectedBtn.classList.add("text-[white]");
}
