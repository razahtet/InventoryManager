var itemin = document.getElementById("itemin");
var categoryin = document.getElementById("categoryin");
var add = document.getElementById("add");
add.addEventListener("click", displayIC);
var category = "";
var item = "";
var body = document.getElementById("body");
var dictionary = {};
var addsame = document.getElementById("addsame");
addsame.addEventListener("click", sameFunc);
addsame.disabled = true;
categoryin.addEventListener("keydown", keyPressed);
itemin.addEventListener("keydown", keyPressed);

function keyPressed(event) {
    if (event.keyCode == 13) {
        displayIC();
    }
}

function sameFunc() {
    category = putin;
    item = putin2;
    increaseNumber();
}

function wait() {
    add.disabled = false;
}

function checkDic() {
    if (category in dictionary) {
        return true;
    }
    else {
        return false;
    }
}

function checkItem() {
    if (item in dictionary[category]) {
        return false;
    }
    else {
        return true;
    }
}

function increaseNumber() {
    dictionary[category][item]++;
    document.getElementById(item + "-" + category).innerHTML = dictionary[category][item];
}

function appendItem() {
    var newdiv = document.createElement("div");
    document.getElementById(category).appendChild(newdiv);
    newdiv.classList.add("newdiv");
    newdiv.addEventListener("click", deleteItem);
    var count = document.createElement("div");
    newdiv.appendChild(count);
    count.setAttribute("id", item + "-" + category);
    count.classList.add("count");
    dictionary[category][item] = 1;
    document.getElementById(item + "-" + category).innerHTML = dictionary[category][item];
    var word2 = document.createElement("div");
    newdiv.appendChild(word2);
    word2.classList.add("word2");
    word2.innerHTML = item;
}

function appendCat() {
    var newbox = document.createElement("div");
    newbox.setAttribute("id", category);
    body.appendChild(newbox);
    newbox.classList.add("newbox");
    newbox.addEventListener("click", deleteCat);
    var word = document.createElement("h2");
    newbox.appendChild(word);
    word.classList.add("word");
    word.innerHTML = category;
}
var putin = "";
var putin2 = "";

function displayIC() {
    if (!(categoryin.value == "") && !(itemin.value == "")) {
        add.disabled = true;
        setTimeout(wait, 350);
        category = categoryin.value;
        item = itemin.value;
        putin = categoryin.value;
        putin2 = itemin.value;
        addsame.disabled = false;
        categoryin.value = "";
        itemin.value = "";
        if (checkDic()) {
            if (checkItem()) {
                appendItem();
            }
            else {
                increaseNumber();
            }

        }
        else {
            appendCat();
            dictionary[category] = {};
            appendItem();
        }
    }
}

function deleteCat() {
    body.removeChild(this);
    delete dictionary[category];
}

function deleteItem(event) {
    event.stopPropagation();
    var catItemName = this.children[0].getAttribute("id");
    var catName = catItemName.split("-")[1];
    var itemName = catItemName.split("-")[0];
    if (dictionary[catName][itemName] == 1) {
        document.getElementById(catName).removeChild(this);
        delete dictionary[catName][itemName];
        if (Object.keys(dictionary[catName]).length == 0) {
            delete dictionary[catName];
            body.removeChild(document.getElementById(catName));
        }
    }
    else {
        dictionary[catName][itemName]--;
        document.getElementById(itemName + "-" + catName).innerHTML = dictionary[catName][itemName];
    }
}
