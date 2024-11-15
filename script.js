// Check if the browser supports Speech Recognition
if (!("webkitSpeechRecognition" in window)) {
    alert("Sorry, your browser does not support Speech Recognition. Please try Chrome.");
  } else {
    // Initialize Speech Recognition API
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true; // Display interim results while speaking
    recognition.continuous = false; // Stop after each speech input
  
    // DOM Elements
    const startBtn = document.getElementById("start-btn");
    const refreshBtn = document.getElementById("refresh-btn");
    const statusDisplay = document.getElementById("status");
    const resultDisplay = document.getElementById("result");
    const indianLanguageSelect = document.getElementById("indian-languages");
    const foreignLanguageSelect = document.getElementById("foreign-languages");
    const languageToggle = document.getElementById("language-toggle");
    const indianSection = document.getElementById("indian-section");
    const foreignSection = document.getElementById("foreign-section");
  
    let listening = false;
  
    // Set the language based on the selected option
    function setLanguage() {
      let selectedLang;
      if (languageToggle.value === "indian") {
        selectedLang = indianLanguageSelect.value;
      } else {
        selectedLang = foreignLanguageSelect.value;
      }
      recognition.lang = selectedLang;
    }
  
    // Toggle speech recognition (start/stop)
    function toggleRecognition() {
      if (listening) {
        recognition.stop();
      } else {
        setLanguage(); // Set the language before starting
        recognition.start();
      }
    }
  
    // Start speech recognition
    recognition.onstart = function() {
      listening = true;
      startBtn.textContent = "🛑 Stop Listening";
      statusDisplay.textContent = "Listening... Speak now!";
    };
  
    // End speech recognition
    recognition.onend = function() {
      listening = false;
      startBtn.textContent = "🎤 Start Listening";
      statusDisplay.textContent = "Press the button and start speaking.";
    };
  
    // Handle speech recognition results
    recognition.onresult = function(event) {
      let interimTranscript = "";
      let finalTranscript = resultDisplay.textContent.trim();
  
      // Loop through all results (in case of multiple fragments)
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
  
        if (event.results[i].isFinal) {
          // Append only final result if it's not already included
          if (!finalTranscript.endsWith(transcript.trim())) {
            finalTranscript += " " + transcript.trim();
          }
        } else {
          interimTranscript = transcript; // Display interim results
        }
      }
  
      // Update the result display only with the final transcript
      resultDisplay.textContent = finalTranscript.trim();
    };
  
    // Handle recognition errors
    recognition.onerror = function(event) {
      console.error("Error occurred: " + event.error);
      statusDisplay.textContent = "Error: " + event.error;
    };
  
    // Refresh the page and reset all content
    function refreshText() {
      resultDisplay.textContent = "Your speech will appear here..."; // Clear text output
      statusDisplay.textContent = "Press the button and start speaking."; // Reset status
      startBtn.textContent = "🎤 Start Listening"; // Reset button text
      listening = false; // Reset listening state
      recognition.stop(); // Stop recognition if it's running
    }
  
    // Add event listener for the refresh button
    refreshBtn.addEventListener("click", refreshText);
  
    // Handle language section toggle (Indian or Foreign)
    languageToggle.addEventListener("change", function() {
      if (languageToggle.value === "indian") {
        indianSection.style.display = "block";
        foreignSection.style.display = "none";
      } else {
        indianSection.style.display = "none";
        foreignSection.style.display = "block";
      }
    });
  
    // Initialize the default section view
    languageToggle.dispatchEvent(new Event('change'));
  }
  