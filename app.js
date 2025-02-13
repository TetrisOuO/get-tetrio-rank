import getTetrioData from "./getTetrioData.js";

const userID = "oUo"; //Tetr.io 使用者名稱
const reFresh_interval = 10000; //每1000為一秒

async function fetchTetrioData() {
  try {
    const data = await getTetrioData(userID.toLowerCase());

    //----------------------------------
    //-------------rehtml---------------

    console.log("hi");

    //----------------------------------

    return;
  } catch (error) {
    console.log("error", error);
  }
}
fetchTetrioData();
setInterval(() => fetchTetrioData(), reFresh_interval);
