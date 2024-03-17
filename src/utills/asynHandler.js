const asyncHandelar = (requestHandler)=>{
    async (req,res,next) =>{
        try {
            await requestHandler(req, res,next); 
        } catch (error) {
            res.status(err.code || 500).json({
                succes:false,
                error: err.message||'error is hapen in the utility Server Error'
            })
            
        }
    }

}


export {asyncHandelar};
