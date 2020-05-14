

const jwt = (req, res) => {
    console.log(req.header('X-BEARER-TOKEN'));
    
    const webToken = JSON.parse(req.header('X-BEARER-TOKEN'))
    console.log(webToken);
    

}

module.exports = { jwt }