async function getTetrioData(userID) {
  const proxyUrl = "https://api.allorigins.win/raw?url=";
  const apiUrl = `https://ch.tetr.io/api/users/${userID}`;
  const leagueUrl = `https://ch.tetr.io/api/users/${userID}/summaries/league`;

  try {
    const userResponse = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    const userDataJson = await userResponse.json();

    const tlResponse = await fetch(proxyUrl + encodeURIComponent(leagueUrl));
    const tlDataJson = await tlResponse.json();

    // console.log("userData", userDataJson);

    const data = {
      name: userDataJson.data.username,
      tr: tlDataJson.data.tr ?? undefined,
      rd: tlDataJson.data.rd ?? undefined,
      rank: tlDataJson.data.rank ?? undefined,
      prev_rank: tlDataJson.data.prev_rank ?? undefined,
      prev_at: tlDataJson.data.prev_at ?? undefined,
      next_rank: tlDataJson.data.next_rank ?? undefined,
      next_at: tlDataJson.data.next_at ?? undefined,
      gamesplayed: tlDataJson.data.gamesplayed ?? undefined,
      gameswon: tlDataJson.data.gameswon ?? undefined,
      apm: tlDataJson.data.apm ?? undefined,
      pps: tlDataJson.data.pps ?? undefined,
      vs: tlDataJson.data.vs ?? undefined,
    };
    return data;
  } catch (error) {
    console.log("error:", error);
  }
}

export default getTetrioData;
