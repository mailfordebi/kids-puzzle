const pieces = document.querySelectorAll("img[draggable]");
const zones = document.querySelectorAll(".drop-zone");

pieces.forEach(piece => {
  piece.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", piece.id);
  });
});

zones.forEach(zone => {
  zone.addEventListener("dragover", (e) => e.preventDefault());
  zone.addEventListener("drop", (e) => {
    const id = e.dataTransfer.getData("text/plain");
    if (zone.dataset.piece === id) {
      const piece = document.getElementById(id);
      zone.appendChild(piece);
      piece.setAttribute("draggable", "false");
      zone.style.border = "2px solid green";
    } else {
      alert("Oops! Try again.");
    }
  });
});
