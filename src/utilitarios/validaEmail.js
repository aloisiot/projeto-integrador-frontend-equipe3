export function validaEmail(email){
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}


export function validaSenhaLogin(senha){
    return senha.length >= 8
}

