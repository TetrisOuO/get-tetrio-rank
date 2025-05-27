import getTetrioData from "./getTetrioData.js";
const reFresh_interval = 60000; // 每1000為一秒

async function fetchTetrioData() {
  try {
    //調用l/api/userid獲取最新userID
    const getcurrentUserID = async () => {
      try {
        const res = await fetch("api/userid");
        const data = await res.json();
        return data.userID;
      } catch (error) {
        console.error(error);
      }
    };

    const userID = await getcurrentUserID();
    const data = await getTetrioData(userID.toLowerCase());
    if (!data) return null;

    // 格式化數據
    return {
      ...data,
      tr: Number(data.tr).toFixed(0), // TR 小數點後2位
      rd: Number(data.rd).toFixed(2), // RD 小數點後2位
      apm: Number(data.apm).toFixed(1), // APM 小數點後2位
      pps: Number(data.pps).toFixed(2), // PPS 小數點後1位
      vs: Number(data.vs).toFixed(1), // VS 小數點後2位
    };
  } catch (error) {
    console.error("Error fetching Tetrio data:", error);
    return null;
  }
}

async function createTetraLeagueDOM() {
  // Create outer container
  const outside = document.createElement("div");
  outside.className = "outside";

  // Create title
  const title = document.createElement("span");
  title.className = "title";
  title.textContent = "TETRA LEAGUE";
  outside.appendChild(title);

  // Create rating section
  const rating = document.createElement("div");
  rating.className = "rating";

  const rankImage = document.createElement("img");
  rankImage.src = "./rank_png/x+.png";
  rankImage.className = "rank_png";
  rating.appendChild(rankImage);

  const ratingInner = document.createElement("div");

  const tr = document.createElement("span");
  tr.className = "tr";
  tr.textContent = "24999";

  const s75 = document.createElement("span");
  s75.className = "s75";
  s75.textContent = "TR";

  ratingInner.appendChild(tr);
  ratingInner.appendChild(s75);
  rating.appendChild(ratingInner);
  outside.appendChild(rating);

  // Create stats section
  const stats = document.createElement("div");
  stats.className = "stats";

  // Helper function to create stat elements
  const createStat = (value, label) => {
    const stat = document.createElement("span");
    stat.className = "stat";

    const valueSpan = document.createElement("span");
    const strong = document.createElement("strong");
    strong.textContent = value;
    valueSpan.appendChild(strong);

    const labelSpan = document.createElement("span");
    labelSpan.textContent = label;

    stat.appendChild(valueSpan);
    stat.appendChild(labelSpan);
    return stat;
  };

  // Create each stat
  const apmStat = createStat("999", "APM");
  const ppsStat = createStat("9.99", "PPS");
  const vsStat = createStat("999", "VS");

  stats.appendChild(apmStat);
  stats.appendChild(ppsStat);
  stats.appendChild(vsStat);

  outside.appendChild(stats);

  // Update function
  const updateStats = async (newData) => {
    if (!newData) return;

    const {
      tr: newTR = "24999",
      rank = "x+",
      apm = "999",
      pps = "9.99",
      vs = "999",
    } = newData;

    // Update TR
    tr.textContent = newTR;

    // Update rank image
    rankImage.src = `./rank_png/${rank}.png`;

    // Update stats
    apmStat.querySelector("strong").textContent = apm;
    ppsStat.querySelector("strong").textContent = pps;
    vsStat.querySelector("strong").textContent = vs;
  };

  // Initial data fetch
  const initialData = await fetchTetrioData();
  if (initialData) {
    updateStats(initialData);
  }

  // Start auto-refresh
  setInterval(async () => {
    const data = await fetchTetrioData();
    if (data) {
      updateStats(data);
    }
  }, reFresh_interval);

  return {
    element: outside,
    updateStats,
  };
}

// Initialize and add to document
async function init() {
  const tetraLeague = await createTetraLeagueDOM();
  document.body.appendChild(tetraLeague.element);
}

init().catch(console.error);
