// const fs = require("./node_modules/fs");
// import fs from "fs";

// const micContainer = document.querySelector(".mic-container");
const speak = document.querySelector(".speak");
const transcriptElement = document.querySelector(".transcript p");
const analysisElement = document.querySelector(".analysis p");

const transcript = document.querySelector(".transcript");
const analysis = document.querySelector(".analysis");

const Transcript = document.getElementById("Transcript");
const Analysis = document.getElementById("Analysis");

const micBottom = document.getElementById("micBottom");

const Switch = document.getElementsByClassName("switch");
const Toogle = document.getElementById("toogleSlider");

let isRecording = false;

const stream = navigator.mediaDevices.getUserMedia({
	audio: true,
});

let checked = 0;
Toogle.addEventListener("click", () => {
	if (checked == 0) {
		checked = 1;
		Toogle.innerHTML = "Analysis";

		transcript.style.display = "none";
		analysis.style.display = "block";
	} else {
		checked = 0;
		Toogle.innerHTML = "Transcript";

		analysis.style.display = "none";
		transcript.style.display = "block";
	}
});
speak.addEventListener("click", async () => {
	// micBottom.style.display = "none";
	micBottom.innerText = "Listening...";
	transcriptElement.textContent = ``;
	if (!isRecording) {
		// Request microphone permission (error handling included)
		try {
			// console.log(stream);
			isRecording = true;
			let status = main3().then(() => {
				micBottom.innerText = "Recognizing...";
			});
			const transcriptUpdates = await main();
			micBottom.innerText = "Analysing...";
			for (const update of transcriptUpdates.split(" ")) {
				transcriptElement.textContent += ` ${update}`;
				await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate delay
			}
			const analysisUpdates = await main2();
			console.log(analysisUpdates);
			document.querySelector(".analysis .tone p").textContent =
				analysisUpdates.Tone;
			document.querySelector(".analysis .explanation p").textContent =
				analysisUpdates.Explanation;
			document.querySelector(".analysis .statistical p").textContent =
				analysisUpdates.Statistical;
			// analysisElement.textContent =
			// 	"Tone: " +
			// 	analysisUpdates.Tone +
			// 	"\n Explanation: " +
			// 	analysisUpdates.Explanation +
			// 	"\n Statistical_Insights: " +
			// 	analysisUpdates.Statistical;
			micBottom.innerText = "Click on Mic to Start Again.";
			// transcriptElement.textContent = transcriptUpdates.split(" ");

			isRecording = false;
			// console.log("Recording stopped");
		} catch (err) {
			console.error("Error accessing microphone:", err);
			// Handle microphone access errors gracefully (e.g., display an error message)
		}
	}
});
const audioWave = document.querySelector(".audio-wave dotlottie-player");

Analysis.addEventListener("click", () => {
	transcript.style.display = "none";
	analysis.style.display = "block";

	Analysis.style.backgroundColor = "#ffffff";
	Analysis.style.zIndex = "9";

	Transcript.style.backgroundColor = "#e1e4ed";
	Transcript.style.zIndex = "1";
});

Transcript.addEventListener("click", () => {
	analysis.style.display = "none";
	transcript.style.display = "block";

	Transcript.style.backgroundColor = "#ffffff";
	Transcript.style.zIndex = "9";

	Analysis.style.backgroundColor = "#e1e4ed";
	Analysis.style.zIndex = "1";
});

async function main() {
	console.log("entered");

	let data = await fetch("http://127.0.0.1:5000/recognize-speech", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	}).then((i) => i.json());
	console.log(data);
	return data;
}

async function main2() {
	console.log("entered2");

	let data = await fetch("http://127.0.0.1:8888/analyze-speech", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	}).then((i) => i.json());
	// console.log(data);
	return data;
}

async function main3() {
	console.log("entered3");

	let data = await fetch("http://127.0.0.1:9898/status", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	}).then((i) => i.json());
	// console.log(data);
	return data;
}
