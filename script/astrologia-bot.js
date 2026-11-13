var a = ["♈️ Aries", "♉️ Tauro", "♊️ Géminis", "♋️ Cáncer", "♌️ Leo", "♍️ Virgo", "♎️ Libra", "♏️ Escorpio", "♐️ Sagitario", "♑️ Capricornio", "♒️ Acuario", "♓️ Piscis"];
var b = ["♈️ Aries", "♉️ Tauro", "♊️ Géminis", "♋️ Cáncer", "♌️ Leo", "♍️ Virgo", "♎️ Libra", "♏️ Escorpio", "♐️ Sagitario", "♑️ Capricornio", "♒️ Acuario", "♓️ Piscis"];
function generateName() {
    document.getElementById("generated").style.color = "white";
    var aWnum = Math.floor(Math.random() * a.length);
    var bWnum = Math.floor(Math.random() * b.length);
    var named =
        a[aWnum] + " le rompió el corazón a " + b[bWnum];
    document.getElementById("generated").innerHTML = named;
}