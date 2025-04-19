

export const templateTelefone= (telefone: string)=>{
    if(!telefone) return ''
    
    const clear= telefone.replace(/\D/g, '')

    if(clear.startsWith('55')){
        const resultado= clear.replace(/\D/g, '')
        const format= resultado.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '+$1 ($2) $3-$4')
        return format
    }
    
    if(telefone.length >= 15) {
        const corta= telefone.slice(0, 15)  
        const resultado= corta.replace(/\D/g, '')
        const format= resultado.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')
        return format
    }

    const resultado= telefone.replace(/\D/g, '')
    const format= resultado.replace(/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3')
    return format
}