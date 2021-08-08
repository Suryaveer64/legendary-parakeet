Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>'
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/n13bFejlx/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + predection_1;
    speak_data_2 = "And the second prediction is " + predection_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error)
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        predection_1 = results[0].label; predection_2 = results[1].label;
        speak();
        if (results[0].label == "Rock") { document.getElementById("update_emoji_1").innerHTML = "&#129304"; }
        if (results[0].label == "Thums-Up") {
            document.getElementById("update_emoji_1").innerHTML = "&#128077";
        } if (results[0].label == "Beautiful") {
            document.getElementById("update_emoji_1").innerHTML = "&#128076";
        } if (results[1].label == "Rock") {
            document.getElementById("update_emoji_2").innerHTML = "&#129304";
        } if (results[1].label == "Thums-Up") {
            document.getElementById("update_emoji_2").innerHTML = "&#128077";
        } if (results[1].label == "Beautiful") {
            document.getElementById("update_emoji_2").innerHTML = "&#128076";
        }


    }
}