function SetPropertyBonus(propField) {
    var node = propField;

    var propertyBonusNode = node.parentNode.querySelector('.propertyBonus .js-content');
    var value = parseInt(node.innerHTML / 5);
    if (Number.isNaN(value)) {
        value = -1;
        node.innerHTML = 0;
    }

    propertyBonusNode.innerHTML = value;
}

function SetPropertyToolTip() {
    var thisScript = document.scripts[document.scripts.length - 1];
    parent = thisScript.parentNode;
    parent.innerHTML = "Proben Bonus";
}

function UpdatePropertyExpCost(propertyRow) {
    var levelNode = propertyRow;
    var levelValue = parseInt(levelNode.innerHTML);
    if (!Number.isInteger(levelValue)) {
        levelNode.innerHTML = 0;
        return;
    }
    var costNode = levelNode.parentNode.querySelector(".exp-change");
    costNode.innerHTML = -((levelValue * levelValue + levelValue) / 2 * 5);

    this.UpdateExpCost();
}

function UpdateExpCost() {
    var sum = 0;
    var cost = document.querySelectorAll(".exp-change");
    for (var i = 0; i < cost.length; i++) {

        var number = parseInt(cost[i].innerHTML);
        if (Number.isInteger(number))
            sum += parseInt(cost[i].innerHTML);
        else {
            if (cost[i].innerHTML === "-")
                continue;
            cost[i].innerHTML = "0";
        }
    }
    cost = document.querySelectorAll(".exp-change-inv");
    for (var i = 0; i < cost.length; i++) {
        var number = parseInt(cost[i].innerHTML);
        if (Number.isInteger(number))
            sum -= parseInt(cost[i].innerHTML);
        else {
            if (cost[i].innerHTML === "-")
                continue;
            cost[i].innerHTML = "0";
        }
    }
    var result = document.querySelector(".exp-result");
    result.innerHTML = sum;
}

function InitialUpdate() {
    // js-property-update
    var propertyUpdate = document.querySelectorAll(".js-property-update");
    for (var i = 0; i < propertyUpdate.length; i++) {
        this.SetPropertyBonus(propertyUpdate[i]);
    }

    UpdateExpCost();
}