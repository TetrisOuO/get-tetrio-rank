async function getTetrioData(userID) {
  try {
    const userResponse = await fetch(`https://ch.tetr.io/api/users/${userID}`);

    const userDataJson = await userResponse.json();

    const tlResponse = await fetch(
      `https://ch.tetr.io/api/users/${userID}/summaries/league`
    );

    const tlDataJson = await tlResponse.json();

    const userData = userDataJson.data;
    const tlData = tlDataJson.data;

    const data = {
      name: userData.username,
      tr: tlData.tr.toFixed(2) ?? undefined,
      rd: tlData.rd.toFixed(2) ?? undefined,
      rank: tlData.rank ?? undefined,
      prev_rank: tlData.prev_rank ?? undefined,
      prev_at: tlData.prev_at ?? undefined,
      next_rank: tlData.next_rank ?? undefined,
      next_at: tlData.next_at ?? undefined,
      gamesplayed: tlData.gamesplayed ?? undefined,
      gameswon: tlData.gameswon ?? undefined,
    };
    return data;
  } catch (error) {
    console.log("error:", error);
  }
}

export default getTetrioData;
