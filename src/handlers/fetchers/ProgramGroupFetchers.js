


export const fetchAll = (...args) => fetch(...args).then(res => res.json()); 


// route = '/groups/create
export const createProgramGroup = async (route, { arg }) => {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${route}`, {
        headers: {
            'Content-Type': 'application/json'
        }, 
        method: 'POST', 
        body: JSON.stringify(arg)
    })
}




export const createSession = async (route, { arg }) => {
    return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${route}`, {
        headers: {
            'Content-Type': 'application/json'
        }, 
        method: 'POST', 
        body: JSON.stringify(arg)
    })
}