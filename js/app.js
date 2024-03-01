/*
 * 檢查瀏覽器
 */
if ('speechSynthesis' in window) {
  document.getElementById('msg').classList.remove("d-none");;
} else {
  document.getElementById('err-msg').classList.remove("d-none");;
}

var button = document.getElementById('speak');
var speechMsgInput = document.getElementById('speech-msg');
var voiceSelect = document.getElementById('voice');

/*
function loadVoices() {
	var voices = speechSynthesis.getVoices();
  
	voices.forEach(function(voice, i) {
		var option = document.createElement('option');

		option.value = voice.name;
		option.innerHTML = voice.name;

		voiceSelect.appendChild(option);
	});
}

loadVoices();

window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};
*/
document.getElementById('rate').addEventListener("change", function() {
  document.getElementById('rate-text').innerHTML = document.getElementById('rate').value;
});

document.getElementById('volume').addEventListener("change", function() {
  document.getElementById('volume-text').innerHTML = document.getElementById('volume').value;
});

document.getElementById('pitch').addEventListener("change", function() {
  document.getElementById('pitch-text').innerHTML = document.getElementById('pitch').value;
});

function speak(text) {
	var msg = new SpeechSynthesisUtterance();

	msg.text = text;
  
	msg.rate = document.getElementById('rate').value;
  msg.volume = document.getElementById('volume').value;
  msg.pitch = document.getElementById('pitch').value;
  
	if (voiceSelect.value) {
		msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	}
  
	window.speechSynthesis.speak(msg);

	// 語音生成完成後觸發下載 MP3 的功能
	msg.onend = function(event) {
	    // 使用 Recorder.js 將語音輸出轉換為 MP3 格式
	    // 請替換下面的程式碼以適應您的需求
	    var blob = new Blob(['語音內容轉換後的 MP3'], { type: 'audio/mp3' });
	    var url = URL.createObjectURL(blob);
	
	    // 創建一個連結，使用者可以點擊並下載 MP3 檔案
	    var a = document.createElement('a');
	    a.href = url;
	    a.download = '語音.mp3';
	    document.body.appendChild(a);
	    a.click();
	    window.URL.revokeObjectURL(url);
	};
}

button.addEventListener('click', function(e) {
	if (speechMsgInput.value.length > 0) {
		speak(speechMsgInput.value);
	}
});
