const submit_Button=document.getElementById("otp_submit_btn")
const form=document.getElementById("form")


submit_Button.addEventListener("click",async(event)=>{
    event.preventDefault()
    const forgotForm=new FormData(form)
    const formOtp=Object.fromEntries(forgotForm)

    try{
        const url=`/forgot`
        const response=axios.post(url,formOtp)
        const result =response.data

        if(result.success){
            window.location.href= "/login"
        }

    }catch (error){
        console.log(error+"forgot clientSide")
    }
})