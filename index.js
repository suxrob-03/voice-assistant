// Elementlarni tanlab olish
const button = document.getElementById("btn");
const content = document.getElementById("content");

// Ovoz chiqarish funksiyasi
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
}

// Vaqtga qarab salomlashish
function wishMe() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 12) {
    speak("Good morning!");
  } else if (hour >= 12 && hour < 17) {
    speak("Good afternoon!");
  } else {
    speak("Good evening!");
  }
}

// Web Speech API tanib olish qismi
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// So‘z tanib olinganda ishlovchi hodisa
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase(); // So‘zlar kichik harfda
  content.innerText = `You said: "${transcript}"`;
  takeCommand(transcript);
};

// Tugmani bosganda eshitishni boshlash
button.addEventListener("click", () => {
  recognition.start();

  console.log(recognition.start());
});

// Foydalanuvchi ovoziga javob
function takeCommand(message) {
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello! How can I assist you?");
  } else if (
    message.includes("who are you") ||
    message.includes("what's your name")
  ) {
    speak("I am your virtual assistant, built to help you.");
  } else if (
    message.includes("ok") ||
    message.includes("good job") ||
    message.includes("thank you")
  ) {
    speak("I am very happy. Do you need any other help?");
  } else if (message.includes("what is your name")) {
    speak("My name is Voice Assistant.");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com/", "_blank");
  } else if (message.includes("open calculator")) {
    speak("Opening calculator");
    window.open("calculator://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleDateString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(`now ${time}`);
  } else {
    speak(`This is what I found on the internet about ${message}`);
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(message)}`,
      "_blank"
    );
  }
}

// Sahifa yuklanganda salomlashish
window.addEventListener("load", () => {
  wishMe();
});
