"use strict";
const titles = document.querySelector(".titles");
const formDiv = document.querySelector(".form");
const tableContent = document.querySelector(".table-content");

const saveBtn = document.querySelector(".btn-save");

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Save");
});
const typeValues = {
  action: "Action",
  adventure: "Adventure",
  fighting: "Fighting",
  platformer: "Platformer",
  puzzle: "Puzzle",
  racing: "Racing",
  rolePlaying: "Role-playing",
  shooter: "Shooter",
  simulation: "Simulation",
  sports: "Sports",
  strategy: "Strategy",
};
const representativesValues = {
  action: ["Call of Duty", "Halo", "Mortal Kombat", "Street Fighter"],
  adventure: ["Far Cry", "Death Stranding ", "Back 4 Blood", "The Last of Us"],
  fighting: ["Dead or Alive", "Mortal Kombat", "Street Fighter", "Tekken"],
  platformer: ["Castlevania", "Shadow Blade", "Duke Nukem", "Super Mario"],
  puzzle: ["Luxor", "Magical Drop", "Zuma", "2048"],
  racing: ["Forza Horizon ", "Dirt Rally", "F1", "Need for Speed"],
  rolePlaying: [
    "World of Warcraft",
    "The Elder Scrolls",
    "Deus Ex",
    "Mass Effect",
  ],
  shooter: [
    "F.E.A.R",
    "Team Fortress",
    "Bioshock Infinite",
    "Half-Life",
    " Counter-Strike",
  ],
  simulation: [
    "Microsoft Flight Simulator",
    "ARMA 3",
    "F1 2020",
    "Train Simulator",
  ],
  sports: ["FIFA", "Professional Baseball Spirits", "UFC"],
  strategy: ["Total War", "Civilization", "Command & Conquer", "StarCraft"],
};
console.log(titles);
console.log("Hello");

function initGameTypes() {
  let selectContainer = document.getElementById("gameType");

  for (const element of Object.entries(typeValues)) {
    let opt = document.createElement("option");
    opt.value = element[0];
    opt.text = element[1];
    selectContainer.add(opt);
  }
}

/*
название, описание, вид, возраст, класс, размер соцветия, класс опасности, ареал произрастания, область применения (в пищевой промышленности, в получении лекарственных препаратов, в сельском хозяйстве...), первооткрыватель, место произрастания и т.д.

*/
class VideoGame {
  constructor(title, type, representatives, sales, mode) {
    this.title = title; //string (название)
    this.mode = mode; //string - select (options) :SPV or MPV (мультиплеер или одиночная)
    this.type = type; //select (options):  (жанр)
    this.representatives = representatives; // array (примеры игр)
    this.sales = sales || 1000000; //number
  }

  // createVideoGame(gameTitle, gameType, representativesValues, gameSales, gameMode) {
  //   // let gameTitle = document.querySelector("#gameTitle");
  //   // let gameMode = document.querySelector("#gameMode");
  //   // let gameType = document.querySelector("#gameType");
  //   // let gameSales = document.querySelector("#gameSales");
  //   let newGame = VideoGame(gameTitle, gameType, representativesValues[gameType], gameSales, gameMode);
  //   console.log(newGame)
  //   // this.renderRow(newGame)
  // }

  renderRow(game) {
    let tr = tableContent.createElement(tr);
    game.forEach((option) => {
      let optionTd = tr.createElement(td);
      optionTd.innerText = option;
    });
    let delBtn = tr.createElement(td);
    delBtn.innerHTML = `<button id="btn-del" class="btn">Delete</button>`;
    this.tableContent.append(tr);

    //   return `
    //   <tr class="table-content">
    //   <td data-column="title">${this.title}</td>
    //   <td data-column="mode">${this.mode}</td>
    //   <td data-column="type">${this.type}</td>
    //   <td data-column="representatives">${this.representatives}</td>
    //   <td data-column="delete-btn">
    //     <button id="btn-del" class="btn">Delete</button>
    //   </td>
    // </tr>
    //   `;
  }

  save() {
    let storedGames = JSON.parse(localStorage.getItem("games")) || [];
    storedGames.push(this);
    localStorage.setItem("games", JSON.stringify(storedGames));
  }
}

class SinglePlayer extends VideoGame {
  constructor(...args) {
    super(...args);
    this.isModsAllowed = true; //true
  }
}

class MultiPlayer extends VideoGame {
  constructor(
    title,
    type,
    representatives,
    sales,
    mode,
    multiType,
    gameRealms
  ) {
    super(title, type, representatives, sales, mode);
    this.multiType = multiType;
    this.gameRealms = gameRealms || 1; //миры и серверы, локации
  }
}

initGameTypes();

saveBtn.addEventListener("click", (e) => {
  let gameTitle = document.querySelector("#gameTitle").value;
  let gameMode = document.querySelector("#gameMode").value;
  let gameType = document.querySelector("#gameType").value;
  let gameSales = Number(document.querySelector("#gameSales").value);
  console.log(gameType);
  const createNewGame = (gameTitle, gameMode, gameType, gameSales) => {
    switch (gameMode) {
      case "single":
        return new SinglePlayer(
          gameTitle,
          gameType,
          representativesValues[gameType],
          gameSales,
          gameMode
        );
      case "multi":
        return new MultiPlayer(
          gameTitle,
          gameType,
          representativesValues[gameType],
          gameSales,
          gameMode,
          ["Real-time SHIT", "Simulations"],
          1
        );
      default:
        throw Error("Shit happens!");
    }
  };

  let newGame = createNewGame(gameTitle, gameMode, gameType, gameSales);
  console.log(newGame);
  newGame.save();
});
// let g = new VideoGame("BAR", "mp", representativesValues.action, 1000, "MP");
// let g1 = new VideoGame("FOO", "mp", representativesValues.action, 1000, "MP");

// console.log(g);
// g.save();
// g1.save();
