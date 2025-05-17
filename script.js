// Function to speak the given text
function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

// Event listener for the submit button
document.getElementById("submit-btn").addEventListener("click", function () {
  const text = document.getElementById("text-input").value;
  const linesContainer = document.getElementById("lines-container");

  if (text.trim() === "") {
    alert("Please enter some text!");
    return;
  }

  // Clear previous lines
  linesContainer.innerHTML = "";

  // Split the text into words
  const words = text.split(/\s+/).filter((word) => word.trim() !== "");
  const maxWordsPerLine = 6; // Maximum 6 words per line
  const lines = [];

  // Group words into chunks of six
  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    const line = words.slice(i, i + maxWordsPerLine).join(" ");
    lines.push(line);
  }

  lines.forEach((line) => {
    // Create a flex container to hold the line and the button
    const lineDiv = document.createElement("div");
    lineDiv.classList.add("line-text");

    // Create a span for the text
    const lineText = document.createElement("span");
    lineText.textContent = line;
    lineText.classList.add("line-content");

    // Create the speak button
    const speakButton = document.createElement("button");
    speakButton.textContent = "Speak";
    speakButton.classList.add("line-button");
    speakButton.addEventListener("click", () => speakText(line));

    // Append the text and button to the line div
    lineDiv.appendChild(lineText);
    lineDiv.appendChild(speakButton);

    // Append the line div to the container
    linesContainer.appendChild(lineDiv);
  });

  // Add a "Speak All" button at the end
  const speakAllButton = document.createElement("button");
  speakAllButton.textContent = "Speak All";
  speakAllButton.classList.add("speak-all-button");
  speakAllButton.addEventListener("click", () => speakText(text));

  // Append the Speak All button
  linesContainer.appendChild(speakAllButton);
});
