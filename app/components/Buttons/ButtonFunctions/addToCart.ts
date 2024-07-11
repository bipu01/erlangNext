 export const handleAddToCart  = (e:React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget)
const justId= e.currentTarget.id.replace(/\baddToCart\D*/g,"")
sessionStorage.getItem("")

console.log(justId)
 }; 