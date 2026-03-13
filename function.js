//Card Loader
 let borderColor;
 let src;
 let priorityBgColor;
 let priorityTxtColor;


const cardLoader=()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response)=>response.json())
    .then((json)=>displayCards(json.data));
}
const displayCards=(cards)=>{
     console.log(cards)
     for(let card of cards){
             console.log(card)
     }
    //get empty container
   const cardContainer=document.getElementById("classContainer")
  
   cardContainer.innerHTML=``
   for(let card of cards){
    console.log(card.id)
    const cardDiv=document.createElement("div")
   //conditions
     //condition for top border color
     if(card.status==="open"){
       borderColor="#00A96E";
       src="./assets/Open-Status.png"
     }
     else{
      borderColor="#A855F7"
       src="./assets/Closed- Status .png"
     }
     //condition for top border color
     if(card.priority==="high"){
       priorityBgColor="#FAD4D4";
       priorityTxtColor="#B31313"
     }
     else if(card.priority==="medium"){
      priorityBgColor="#FFF6D1"
      priorityTxtColor="#F59E0B"
     }
     else{
        priorityBgColor="#EEEFF2"
        priorityTxtColor="#9CA3AF"
     }
    cardDiv.innerHTML=`
    <div class="card bg-base-100  p-6 shadow-sm border-[${borderColor}] border-t-6 flex flex-col ">
          <div class="top-status flex justify-between">
            <img
              src="${src}"
              alt="Open-status"
              class="status-icon"
            />
            <div
              class="priority border px-4 bg-[${priorityBgColor}] text-[${priorityTxtColor}] text-center rounded-xl"
            >
              ${card.priority}
            </div>
          </div>
          <div class="desc-lebel m-3 space-y-3">
            <div class="problem-descBox">
              <p class="problem-title font-bold text-lg">
                ${card.title}
              </p>
              <p class="problem-desc font-light">
                ${card.description}
              </p>
            </div>

            <div class="lebels flex justify-between">
              <div
                class="type-lebel border px-3 bg-[#FAD4D4] text-[#B31313] text-center rounded-xl flex gap-1 items-center justify-center"
              >
                <i class="fa-solid fa-bug"></i>Bug
              </div>
              <div
                class="wanted-lebel border px-3 bg-[#FAD4D4] text-[#B31313] text-center rounded-xl flex gap-1 items-center justify-center"
              >
                <i class="fa-solid fa-handshake-angle"></i>Help wanted
              </div>
            </div>
          </div>
          <hr />
          <div class="identity&date m-3">
            <p class="author-name">#1 by john_doe</p>
            <p class="issue-date">1/15/2024</p>
          </div>
    `
    cardContainer.append(cardDiv)
   }
}
cardLoader();