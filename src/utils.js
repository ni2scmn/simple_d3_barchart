export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function generate_data() {
    let alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let data = [];

    let n_datapoints = getRandomInt(5, 44);
    // let n_datapoints = 15;

    for (let index = 0; index < n_datapoints; index++) {
        data.push({
            category: alpha[index],
            value: getRandomInt(3, 20)
        });
    }
    return data;
}