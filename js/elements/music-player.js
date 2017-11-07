export const musicPlayer = (musicPlayerData) => {
  return (`
    <div class="player-wrapper">
      <div class="player">
        <audio src="${musicPlayerData}" preload="auto"></audio>
        <button class="player-control"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
  `);
};
