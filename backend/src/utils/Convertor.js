exports.convertDocumentToJson = (document) =>  {
    return {name:document.name, email:document.email, balance:document.balance, isVerified:document.isVerified, isAdmin:document.isAdmin };
}


