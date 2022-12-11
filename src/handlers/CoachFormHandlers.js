import axios from "axios";

const readFileContents = async (file) => {
    return new Promise((resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result.split(',')[1]);
        };
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
    });
}

const readAllFiles = async (AllFiles) => {
    const results = await Promise.all(AllFiles.map(async (file) => {
        const fileContents = await readFileContents(file);

        return fileContents;
    }));

    return results;
}

export const handleCertificatesChange = (setCertificates, targets) => {

    let AllFiles = []

    for (let i = 0; i < targets.length; i++) {
        AllFiles.push(targets[i])
    }
    readAllFiles(AllFiles).then(result => {
        setCertificates(result)
    })
}

export const handleCVChange = (setCv, file) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        setCv(reader.result.split(',')[1])
    }
}

export const sendCoachPendingData = async (link, data) => {
    return await axios.post((link, {
        password: data.password,
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName,
        height: data.height,
        weight: data.weight,
        gender: data.gender,
        birthDate: data.dob,
        cv: data.cv[0],
        certificates: data.certificates
    }))
}


export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}