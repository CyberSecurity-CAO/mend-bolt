module.exports = (err, req, res, next) => {
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case 'NOT_FOUND':
      code = 401;
      message = 'Handphone is not found or has been deleted.';
      break;

    case 'NO_STOCK':
      code = 401;
      message = 'The stock of the Handphone is currently zero, please try again later.';
      break;
    
    case 'FALSE_LOGIN':
      code = 401;
      message = 'The email or password you provided is incorrect. Please double-check your login credentials and try again.';
      break;
    
    case "INVALID_TOKEN":
      code = 401;
      message = "The access token is invalid or has expired. Please check your access token and try again.";
      break;

    case "MISSING_TOKEN":
      code = 401;
      message = "Access to this resource requires authentication. Please log in to your account to access this resource.";
      break;
    
     case "FORBIDDEN":
      code = 401;
      message = "Forbidden access.";
      break;

    default:
      code = 500;
      message = 'Internal Server Error: Sorry, something went wrong on our end. Our team has been notified and we are working to fix the issue as soon as possible. Please try again later.';
  }

  if( err.code && err.code == 11000) {
    return  res.status(400).json({success: false, message: err.toString()});
  }
 
  if( err.name && err.name === 'ValidationError') {
    return  res.status(400).json({success: false, message: err.toString()});
  }

  res.status(code).json({success: false, message});
};
