

// for test purposes we added this software component to simulate the server 

export const storeProgram = (program) => {
    let programs = localStorage.getItem('programs');
    if (programs === null) {
        localStorage.setItem('programs', JSON.stringify({ programs: [] }))
        programs = localStorage.getItem('programs');
    }

    programs = JSON.parse(programs)
    programs.programs.push(program)
    localStorage.setItem('programs', JSON.stringify(programs))
}


export const getAllPrograms = () => {
    return JSON.parse(localStorage.getItem('programs'))
}


export const storeSteps = (session_id, step) => {
    let session = localStorage.getItem(session_id);
    if (session === null) {
        localStorage.setItem(session_id, JSON.stringify([]))
        session = localStorage.getItem('programs');
    }
}

// export const random_images = [
//     "https://randomwordgenerator.com/img/picture-generator/57e4d441435baa14f1dc8460962e33791c3ad6e04e507749742c78d5914cc4_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/55e7dc444c56aa14f1dc8460962e33791c3ad6e04e507441722872d6914bcd_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/50e1d3404a4faa0df7c5d57bc32f3e7b1d3ac3e45658724c722f7ed594_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/54e5d4404f53a514f1dc8460962e33791c3ad6e04e50744074267ad1974ec5_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/55e7dd414254b10ff3d8992cc12c30771037dbf85254794e722a7ddc964a_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/57e5d2464b54a914f1dc8460962e33791c3ad6e04e5074417c2d78d3904acc_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/57e4d0434a57a814f1dc8460962e33791c3ad6e04e507440772d7cdd9245c3_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/5ee6d6454d57b10ff3d8992cc12c30771037dbf852547848702a7ed4974c_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/54e7d7474954a414f1dc8460962e33791c3ad6e04e5074417d2e72d59e44c5_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/57e8d34b4253ab14f1dc8460962e33791c3ad6e04e5074417d2e72d2954ac5_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/53e1d047494faa0df7c5d57bc32f3e7b1d3ac3e45658714d702872d390_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/57e2d1464c5bae14f1dc8460962e33791c3ad6e04e507440742e7dd59f4bc5_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/55e4d5434a54a514f1dc8460962e33791c3ad6e04e5074417d2e72d1974ec1_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/54e5d0444f51a814f1dc8460962e33791c3ad6e04e50744172297cdd9f4dc2_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/57e5d0424d54a814f1dc8460962e33791c3ad6e04e507440752972d29e4ec4_640.jpg",
//     "https://randomwordgenerator.com/img/picture-generator/57e4dd404d51a914f1dc8460962e33791c3ad6e04e5074417c2e7dd29744c7_640.jpg",
// ]