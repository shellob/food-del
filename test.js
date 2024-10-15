const getData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data from server');
        }, 1000);
    });
};

const processData = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data === 'Data from server') {
                resolve('Data is processing'); // Исправлено: resolve вместо resoleve
            } else {
                reject(new Error('All in shit'));
            }
        }, 1000);
    });
};

getData().then((data) => processData(data)).then((result) => console.log(result)).catch((error) => console.error(error.message));