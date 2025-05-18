# Text-to-Speech Web App

A simple and interactive web application that converts typed text into speech using the Web Speech API. The app allows users to input text, adjust the speech rate, and listen to the text line-by-line or all at once. It also features a light/dark theme toggle and remembers your last input and theme preference.

## Features

- **Text to Speech**: Enter any text and have it read aloud using your browser's built-in speech synthesis.
- **Line-by-Line Playback**: Text is split into lines (6 words per line) with individual "Speak" buttons for each line.
- **Speak All**: Listen to the entire text at once.
- **Speech Rate Control**: Adjust the speed of the speech output.
- **Theme Toggle**: Switch between light and dark mode. Your preference is saved.
- **Persistent Input**: The last entered text is saved and restored on reload.
- **Responsive UI**: Clean, modern, and mobile-friendly design.

## Live Preview

Click [here](https://dere-12.github.io/text-to-speech/) for live demo.

## Usage

1. Open `index.html` in your web browser.
2. Type or paste your text into the textarea.
3. Adjust the speech rate if desired.
4. Click **Submit** to split the text into lines.
5. Use the **Speak** buttons to listen to individual lines, or **Speak All** to hear the entire text.
6. Use the theme toggle in the top-right corner to switch between light and dark mode.

## Requirements

- A modern web browser with [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) support (e.g., Chrome, Edge, Firefox).

## File Structure

- `index.html` – Main HTML file
- `styles.css` – App styling (light/dark themes, layout)
- `script.js` – App logic (text splitting, speech synthesis, theme, persistence)
- `README.md` – Project documentation

## Customization

- You can adjust the number of words per line by changing the `maxWordsPerLine` variable in `script.js`.
- The app uses the default US English voice if available, but you can modify the voice selection logic in `script.js`.
