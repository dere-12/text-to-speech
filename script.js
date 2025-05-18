let voices = [];

// Load and apply the theme from local storage
function loadTheme() {
  const isDark = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark", isDark);
  document.getElementById("theme-toggle").checked = isDark;
}

// Save the theme preference
function saveTheme(isDark) {
  localStorage.setItem("darkMode", isDark);
}

// Toggle the theme between light and dark
function toggleTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  saveTheme(isDark);
}

// Event listener for theme toggle
document.getElementById("theme-toggle").addEventListener("change", function () {
  toggleTheme(this.checked);
});

// Load voices from the Web Speech API
function loadVoices() {
  voices = window.speechSynthesis.getVoices();
}

// Set the default US voice if available
function setDefaultUSVoice(utterance) {
  const usVoice = voices.find((voice) => voice.lang === "en-US");
  utterance.voice = usVoice || voices[0];
}

// Speak the given text
function speakText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  setDefaultUSVoice(speech);
  speech.rate = parseFloat(document.getElementById("rate").value);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

// Speak all text at once
function speakAllText(text) {
  const speech = new SpeechSynthesisUtterance(text);
  setDefaultUSVoice(speech);
  speech.rate = parseFloat(document.getElementById("rate").value);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

// Save the last text to local storage
function saveLastText(text) {
  localStorage.setItem("lastText", text);
}

// Load the last saved text from local storage
function loadLastText() {
  const savedText = localStorage.getItem("lastText");
  if (savedText) {
    document.getElementById("text-input").value = savedText;
  }
}

// Create the "Speak All" button
function createSpeakAllButton(text) {
  const speakAllButton = document.createElement("button");
  speakAllButton.textContent = "Speak All";
  speakAllButton.classList.add("speak-all-button");
  speakAllButton.style.display = "none"; // Hidden initially

  speakAllButton.addEventListener("click", () => {
    speakAllText(text);
  });

  return speakAllButton;
}

// Toggle visibility of long text and manage the Speak All button

// Toggle visibility of long text and manage the Speak All button
function toggleLinesVisibility(container, isExpanded, text) {
  const lines = container.querySelectorAll(".line-text");
  const speakAllButton = document.querySelector(".speak-all-button");

  // Toggle line visibility
  lines.forEach((line, index) => {
    line.style.display = isExpanded || index < 3 ? "flex" : "none";
  });

  // Always show the "Speak All" button if text is short or expanded
  if (lines.length <= 3 || isExpanded) {
    speakAllButton.style.display = "block";
  } else {
    speakAllButton.style.display = "none";
  }
}

// Create the "Speak All" button container
function createSpeakAllContainer(text) {
  const container = document.createElement("div");
  container.classList.add("speak-all-container");

  const speakAllButton = document.createElement("button");
  speakAllButton.textContent = "Speak All";
  speakAllButton.classList.add("speak-all-button");
  speakAllButton.style.display = "none"; // Hidden initially

  speakAllButton.addEventListener("click", () => {
    speakAllText(text);
  });

  container.appendChild(speakAllButton);
  return container;
}

// Create the "See More/Less" button
function createToggleButton(container, text) {
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "See More";
  toggleButton.classList.add("see-more");

  toggleButton.addEventListener("click", () => {
    const isExpanded = toggleButton.textContent === "See Less";
    toggleButton.textContent = isExpanded ? "See More" : "See Less";
    toggleButton.classList.toggle("see-more", isExpanded);
    toggleButton.classList.toggle("see-less", !isExpanded);
    toggleLinesVisibility(container, !isExpanded, text);
  });

  return toggleButton;
}

// Handle text submission and display
// Handle text submission and display
function handleTextSubmission(text, linesContainer) {
  if (text.trim() === "") {
    alert("Please enter some text!");
    return;
  }

  saveLastText(text);
  linesContainer.innerHTML = "";

  const words = text.split(/\s+/).filter((word) => word.trim() !== "");
  const maxWordsPerLine = 6;
  const lines = [];

  for (let i = 0; i < words.length; i += maxWordsPerLine) {
    const line = words.slice(i, i + maxWordsPerLine).join(" ");
    lines.push(line);
  }

  // Create a fragment for better performance
  const fragment = document.createDocumentFragment();

  // Add each line with a "Speak" button
  lines.forEach((line, index) => {
    const lineDiv = document.createElement("div");
    lineDiv.classList.add("line-text");

    const lineText = document.createElement("span");
    lineText.textContent = line;
    lineText.classList.add("line-content");

    const speakButton = document.createElement("button");
    speakButton.textContent = "Speak";
    speakButton.classList.add("line-button");
    speakButton.addEventListener("click", () => speakText(line));

    lineDiv.appendChild(lineText);
    lineDiv.appendChild(speakButton);
    fragment.appendChild(lineDiv);

    // Initially show only the first 3 lines
    if (index >= 3) lineDiv.style.display = "none";
  });

  // Create "Speak All" button and place after the last line
  const speakAllContainer = createSpeakAllContainer(text);
  fragment.appendChild(speakAllContainer);

  // Add "See More/Less" button if needed
  if (lines.length > 3) {
    const toggleButton = createToggleButton(linesContainer, text);
    fragment.appendChild(toggleButton);
  } else {
    // Show the Speak All button if text is short (1-3 lines)
    speakAllContainer.querySelector(".speak-all-button").style.display =
      "block";
  }

  // Append the fragment to the container
  linesContainer.appendChild(fragment);
}

// Event listener for the submit button
document.getElementById("submit-btn").addEventListener("click", function () {
  const text = document.getElementById("text-input").value;
  const linesContainer = document.getElementById("lines-container");
  handleTextSubmission(text, linesContainer);
});

// Update rate value display
document.getElementById("rate").addEventListener("input", function () {
  document.getElementById("rate-value").textContent = this.value;
});

// Load theme, voices, and last text on page load
window.addEventListener("load", () => {
  loadTheme();
  loadLastText();
  loadVoices();
});

speechSynthesis.addEventListener("voiceschanged", loadVoices);
