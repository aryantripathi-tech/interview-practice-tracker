const jwt=require('jsonwebtoken');

function protect(req, res, next){
    // Get token from request headers
    let token= req.headers.authorization;

    // Check if token exists
    if(!token){
        return res.json({message: 'Access denied. Please login first.'});
    }

    // Remove 'Bearer ' prefix if present
    if(token.startsWith('Bearer ')){
        token=token.slice(7);
    }

    try{
        // Verify the token
        let decoded= jwt.verify(token, process.env.JWT_SECRET);

        // Attch user data to request
        req.user = decoded;

        // Move to next function
        next();
    }catch(error){
        res.json({message: 'Invalid token. Please login again.'});
    }
}

module.exports=protect;