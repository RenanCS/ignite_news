export function FormatAmount(value: number){
    return new Intl.NumberFormat('en-US', {
        style:'currency',
        currency: 'USD'})
        .format(value);
}

export function FormatDatePost(value: string){
  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year:'numeric'
  })
}
