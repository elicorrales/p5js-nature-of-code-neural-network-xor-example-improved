const learningRateSliderElem = document.getElementById('learningRateSlider');
let allTrained = false;
let showedAllTrained = false;

showMessages('info', 'Training...');

if (localStorage) {
    let learningRate = localStorage.getItem('learningRate');
    if (learningRate) learningRateSliderElem.value = learningRate;
}


const isAllTrained = (allTrained) => {

    for (let i = 0; i < allTrained.length; i++) {
        if (!allTrained[i]) return false;
    }
    return true;
}

const doChangeLearningRate = () => {
    let learningRate = learningRateSliderElem.value;
    if (localStorage) {
        localStorage.setItem('learningRate',learningRate);
    }
    allTrained = false;
}

function doTrain() {

    try {

        if (allTrained) {
            if (!showedAllTrained) {
                showMessages('success', 'All Trained');
                showedAllTrained = true;
            }
        }

        // depending on how the network was initialized,
        // it may NOT train, so we just throw it away
        // and recreate the network.
        let currentTime = new Date().getTime();
        let deltaTrainingTime = currentTime - trainingStartTime;
        if (deltaTrainingTime > 3000 && !allTrained) {
            doCreateNetwork('danger','Time Ran Out -Retraining...');
            trainingStartTime = new Date().getTime();
        }

        if (network != undefined) {

            if (!allTrained) {
                let trained = [false, false, false, false];
                for (let i = 0; i < 100; i++) {
                    let data = random(training_data);
                    let y = network.predict(data.inputs);
                    if (data.lessThan && y < data.lessThan) { trained[data.index] = true; }
                    if (data.moreThan && y > data.moreThan) { trained[data.index] = true; }
                    allTrained = isAllTrained(trained);
                    network.train(data.inputs, data.outputs);
                }
            }
            network.setLearningRate(learningRateSliderElem.value);

            let resolution = 10;
            let cols = width / resolution;
            let rows = height / resolution;
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    let x1 = i / cols;
                    let x2 = j / rows;
                    let inputs = [x1, x2];
                    let y = network.predict(inputs);
                    noStroke();
                    fill(y * 255);
                    rect(i * resolution, j * resolution, resolution, resolution);
                }
            }

        }
    } catch (error) {
        showMessages('danger',error);
    }
}