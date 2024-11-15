if (!("webkitSpeechRecognition" in window)) {
    alert("Sorry, your browser does not support Speech Recognition. Please try Chrome.");
  } else {
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = false; 
  
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
  
    function setLanguage() {
      let selectedLang;
      if (languageToggle.value === "indian") {
        selectedLang = indianLanguageSelect.value;
      } else {
        selectedLang = foreignLanguageSelect.value;
      }
      recognition.lang = selectedLang;
    }
  
    function toggleRecognition() {
      if (listening) {
        recognition.stop();
      } else {
        setLanguage(); 
        recognition.start();
      }
    }
  
    recognition.onstart = function() {
      listening = true;
      startBtn.textContent = "🛑 Stop Listening";
      statusDisplay.textContent = "Listening... Speak now!";
    };

    recognition.onend = function() {
      listening = false;
      startBtn.textContent = "🎤 Start Listening";
      statusDisplay.textContent = "Press the button and start speaking.";
    };

    recognition.onresult = function(event) {
      let interimTranscript = "";
      let finalTranscript = resultDisplay.textContent.trim();
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
  
        if (event.results[i].isFinal) {
          if (!finalTranscript.endsWith(transcript.trim())) {
            finalTranscript += " " + transcript.trim();
          }
        } else {
          interimTranscript = transcript; 
        }
      }
      resultDisplay.textContent = finalTranscript.trim();
    };

    recognition.onerror = function(event) {
      console.error("Error occurred: " + event.error);
      statusDisplay.textContent = "Error: " + event.error;
    };
 
    function refreshText() {
      resultDisplay.textContent = "Your speech will appear here..."; 
      statusDisplay.textContent = "Press the button and start speaking."; 
      startBtn.textContent = "🎤 Start Listening"; 
      listening = false;
      recognition.stop(); 
    }

    refreshBtn.addEventListener("click", refreshText);
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
  
